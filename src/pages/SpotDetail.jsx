import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getSpotDetail } from "../data/spotCatalog.js";
import { recordClickEvent } from "../utils/clickTracker.js";
import { addReview, fetchReviews as fetchSupabaseReviews } from "../utils/supabaseApi.js";
import "../styles/spotDetail.css";

const REVIEW_STORAGE_KEY = "foodie_map_spot_reviews_v1";
const PREVIEW_REVIEW_COUNT = 3;

const CATEGORY_LABELS = {
  foods: { vi: "Món ăn", en: "Foods" },
  drinks: { vi: "Thức uống", en: "Drinks" },
  snacks: { vi: "Ăn vặt", en: "Snacks" },
};

const copy = {
  vi: {
    backPrefix: "← Trở về",
    sectionTitles: {
      gallery: "Hình ảnh khách hàng",
      reviews: "Đánh giá & check-in",
    },
    info: {
      address: "Địa chỉ",
      price: "Mức giá",
      dishContext: "Món nổi bật",
      mapButton: "Mở Google Maps",
    },
    reviews: {
      empty: "Chưa có đánh giá. Hãy là người đầu tiên!",
      formTitle: "Chia sẻ trải nghiệm của bạn",
      nameLabel: "Tên của bạn",
      ratingLabel: "Số sao",
      ratingSuffix: "sao",
      reviewLabel: "Cảm nhận",
      photoLabel: "Ảnh tại quán (tùy chọn)",
      submit: "Gửi đánh giá",
      showMore: "Xem thêm đánh giá",
      showLess: "Thu gọn đánh giá",
      success: "Cảm ơn bạn đã chia sẻ!",
      errorRequired: "Vui lòng điền đầy đủ họ tên, số sao và cảm nhận.",
    },
  },
  en: {
    backPrefix: "← Back to",
    sectionTitles: {
      gallery: "Customer snapshots",
      reviews: "Reviews & check-in",
    },
    info: {
      address: "Address",
      price: "Price range",
      dishContext: "Signature dish",
      mapButton: "Open Google Maps",
    },
    reviews: {
      empty: "No reviews yet. Be the first to share!",
      formTitle: "Share your experience",
      nameLabel: "Your name",
      ratingLabel: "Star rating",
      ratingSuffix: "stars",
      reviewLabel: "Your thoughts",
      photoLabel: "Upload a photo (optional)",
      submit: "Submit review",
      showMore: "Show more reviews",
      showLess: "Show fewer reviews",
      success: "Thanks for sharing!",
      errorRequired: "Please fill in your name, rating, and feedback.",
    },
  },
};

function readStoredReviews() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistReviews(category, spotId, reviews) {
  if (typeof window === "undefined") return;
  try {
    const existing = readStoredReviews();
    const cleaned = existing.filter(
      (entry) => entry.category !== category || entry.spotId !== spotId,
    );
    const payload = cleaned.concat(
      reviews.map((review) => ({
        ...review,
        category,
        spotId,
      })),
    );
    window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    // ignore storage issues
  }
}

function loadReviewsForSpot(category, spotId) {
  return readStoredReviews()
    .filter((entry) => entry.category === category && entry.spotId === spotId)
    .map(({ category: _category, spotId: _spotId, ...review }) => review)
    .sort((a, b) => b.timestamp - a.timestamp);
}

function createReviewId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `review-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatReviewDate(language, timestamp) {
  if (!timestamp) return "";
  try {
    return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch (error) {
    return new Date(timestamp).toLocaleString();
  }
}

function Stars({ value }) {
  return (
    <span className="spot-detail-review__stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={star <= value ? "fa-solid fa-star" : "fa-regular fa-star"}
        />
      ))}
    </span>
  );
}

export default function SpotDetail() {
  const { category, spotId } = useParams();
  const { language } = useLanguage();
  const labels = copy[language];
  const categoryLabel = CATEGORY_LABELS[category]?.[language];

  const detail = useMemo(() => getSpotDetail(category, spotId, language), [category, spotId, language]);

  const [localReviews, setLocalReviews] = useState(() => loadReviewsForSpot(category, spotId));
  const [remoteReviews, setRemoteReviews] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: "5", content: "", photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);

  useScrollReveal("[data-reveal]");

  useEffect(() => {
    setLocalReviews(loadReviewsForSpot(category, spotId));
    setRemoteReviews([]);
    setSyncError(null);
    setShowAll(false);
    setFormData({ name: "", rating: "5", content: "", photo: null });
    setPhotoPreview(null);
  }, [category, spotId]);

  useEffect(() => {
    setMessage(null);
  }, [language]);

  const mergeReviews = useCallback((serverReviews, storedReviews) => {
    const combined = [];
    const seen = new Set();

    const pushReview = (review, source) => {
      if (!review) return;
      const timestampValue = typeof review.timestamp === "number" ? review.timestamp : Date.parse(review.timestamp);
      const timestamp = Number.isNaN(timestampValue) ? Date.now() : timestampValue;
      const fallbackKey = `${review.name || ""}|${review.content || ""}|${timestamp}`;
      const key = review.id ? `id:${review.id}` : fallbackKey;
      if (seen.has(key) || seen.has(fallbackKey)) return;
      seen.add(key);
      seen.add(fallbackKey);
      combined.push({ ...review, timestamp, source });
    };

    (serverReviews || []).forEach((review) => pushReview(review, "remote"));
    (storedReviews || []).forEach((review) => pushReview(review, "local"));

    return combined.sort((a, b) => b.timestamp - a.timestamp);
  }, []);

  const reviews = useMemo(
    () => mergeReviews(remoteReviews, localReviews),
    [mergeReviews, remoteReviews, localReviews],
  );

  const fetchRemoteReviews = useCallback(async () => {
    try {
      setIsSyncing(true);
      setSyncError(null);
      const { data, error } = await fetchSupabaseReviews({ foodId: spotId });
      if (error) {
        throw error;
      }
      const incoming = Array.isArray(data) ? data : [];
      setRemoteReviews(
        incoming.map((review) => ({
          id: review.id,
          name: review.user_name || "Ẩn danh",
          content: review.comment || "",
          rating: review.rating || 0,
          timestamp: review.created_at ? Date.parse(review.created_at) : Date.now(),
        })),
      );
    } catch (error) {
      setSyncError(error.message);
      setRemoteReviews([]);
    } finally {
      setIsSyncing(false);
    }
  }, [spotId]);

  useEffect(() => {
    fetchRemoteReviews();
  }, [fetchRemoteReviews]);

  if (!detail) {
    return (
      <section className="spot-detail-empty container" data-reveal data-reveal-direction="up">
        <h1>404</h1>
        <p>{language === "vi" ? "Không tìm thấy địa điểm bạn yêu cầu." : "We couldn't find that spot."}</p>
        <Link className="spot-detail__back" to="/">
          {language === "vi" ? "← Trở về trang chủ" : "← Back to home"}
        </Link>
      </section>
    );
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, PREVIEW_REVIEW_COUNT);
  const hasMoreReviews = reviews.length > PREVIEW_REVIEW_COUNT;
  const dishContext = detail.dish || {};
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) / totalReviews
    : 0;

  const summaryCopy = language === "vi"
    ? {
        ratingTitle: "Điểm trung bình",
        reviewCount: totalReviews === 1 ? "1 lượt review" : `${totalReviews} lượt review`,
        emptyPrompt: "Hãy là người đầu tiên chia sẻ cảm nhận tại quán nhé!",
        cta: "Viết review ngay",
      }
    : {
        ratingTitle: "Average rating",
        reviewCount: totalReviews === 1 ? "1 review" : `${totalReviews} reviews`,
        emptyPrompt: "Be the first to leave a note for this stop!",
        cta: "Share a review",
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedContent = formData.content.trim();
    const ratingValue = Number(formData.rating);

    if (!trimmedName || !trimmedContent || Number.isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      setMessage({ type: "error", text: labels.reviews.errorRequired });
      return;
    }

    const newReview = {
      id: createReviewId(),
      name: trimmedName,
      content: trimmedContent,
      rating: ratingValue,
      timestamp: Date.now(),
      photo: photoPreview || null,
    };

    const nextReviews = [newReview, ...localReviews];
    setLocalReviews(nextReviews);
    persistReviews(category, spotId, nextReviews);
    try {
      const { error } = await addReview({
        foodId: spotId,
        name: trimmedName,
        rating: ratingValue,
        comment: trimmedContent,
      });

      if (error) {
        throw error;
      }

      await fetchRemoteReviews();
      setFormData({ name: "", rating: "5", content: "", photo: null });
      setPhotoPreview(null);
      setShowAll(false);
      setMessage({ type: "success", text: labels.reviews.success });
    } catch (submissionError) {
      setMessage({ type: "error", text: submissionError.message });
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, photo: null }));
      setPhotoPreview(null);
      return;
    }

    setFormData((prev) => ({ ...prev, photo: file }));

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const openMap = () => {
    if (!detail.mapUrl) return;
    recordClickEvent({ category, id: detail.id, name: detail.name, mapUrl: detail.mapUrl });
    if (typeof window !== "undefined") {
      window.open(detail.mapUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="spot-detail-page">
      <section className="spot-detail-hero" data-reveal data-reveal-direction="up">
        <div className="spot-detail-hero__media">
          {detail.image ? (
            <img src={detail.image} alt={detail.name} loading="lazy" />
          ) : (
            <div className="spot-detail-hero__placeholder" aria-hidden="true">
              <i className="fa-solid fa-store" />
            </div>
          )}
        </div>
        <div className="spot-detail-hero__content">
          <Link className="spot-detail__back" to={`/${category}`}>
            {labels.backPrefix} {categoryLabel || category}
          </Link>
          <span className="spot-detail__eyebrow">{dishContext.eyebrow}</span>
          <h1>{detail.name}</h1>
          <p>{detail.description || dishContext.description}</p>
          <ul className="spot-detail__meta">
            {detail.address ? (
              <li>
                <i className="fa-solid fa-location-dot" />
                <span>
                  <strong>{labels.info.address}:</strong> {detail.address}
                </span>
              </li>
            ) : null}
            {detail.price ? (
              <li>
                <i className="fa-solid fa-tag" />
                <span>
                  <strong>{labels.info.price}:</strong> {detail.price}
                </span>
              </li>
            ) : null}
            {dishContext.title ? (
              <li>
                <i className="fa-solid fa-bowl-rice" />
                <span>
                  <strong>{labels.info.dishContext}:</strong> {dishContext.title}
                </span>
              </li>
            ) : null}
          </ul>
          {detail.mapUrl ? (
            <button type="button" className="spot-detail__map" onClick={openMap}>
              <i className="fa-solid fa-map-pin" /> {labels.info.mapButton}
            </button>
          ) : null}
        </div>
      </section>

      

      <section className="spot-detail-reviews" data-reveal data-reveal-direction="up">
        <div className="spot-detail-reviews__header">
          <h2>{labels.sectionTitles.reviews}</h2>
          <p>
            {language === "vi"
              ? "Cùng chia sẻ trải nghiệm của bạn tại quán để cộng đồng cập nhật địa điểm ngon."
              : "Share your visit so the community keeps track of amazing stops."}
          </p>
          {isSyncing ? (
            <p className="spot-detail-reviews__status" aria-live="polite">
              {language === "vi" ? "Đang đồng bộ review..." : "Syncing reviews..."}
            </p>
          ) : null}
          {syncError ? (
            <p className="spot-detail-reviews__status spot-detail-reviews__status--error" role="status">
              {language === "vi"
                ? "Không thể đồng bộ từ Netlify Forms. Vui lòng thử lại sau."
                : "Unable to sync from Netlify Forms right now. Please try again later."}
            </p>
          ) : null}
        </div>

        <div className="spot-detail-reviews__shell">
          <aside className="spot-detail-reviews__summary">
            <div className="spot-detail-summary__card">
              <div className="spot-detail-summary__score">
                <span className="spot-detail-summary__value">{totalReviews ? averageRating.toFixed(1) : "--"}</span>
                <Stars value={totalReviews ? Math.round(averageRating) : 0} />
              </div>
              <p className="spot-detail-summary__label">{summaryCopy.ratingTitle}</p>
              <p className="spot-detail-summary__meta">
                {totalReviews ? summaryCopy.reviewCount : summaryCopy.emptyPrompt}
              </p>
              <button
                type="button"
                className="spot-detail-summary__cta"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    const input = formRef.current.querySelector("input[name='name']");
                    if (input) {
                      setTimeout(() => input.focus(), 260);
                    }
                  }
                }}
              >
                {summaryCopy.cta}
              </button>
            </div>
          </aside>

          <div className="spot-detail-reviews__list">
            {displayedReviews.length ? (
              displayedReviews.map((review) => (
                <article key={review.id} className="spot-detail-review">
                  <div className="spot-detail-review__header">
                    <h3>{review.name}</h3>
                    <Stars value={review.rating} />
                  </div>
                  {review.photo ? (
                    <div className="spot-detail-review__photo">
                      <img src={review.photo} alt={`${review.name} review`} loading="lazy" />
                    </div>
                  ) : null}
                  <p className="spot-detail-review__content">{review.content}</p>
                  <time className="spot-detail-review__timestamp">
                    {formatReviewDate(language, review.timestamp)}
                  </time>
                </article>
              ))
            ) : (
              <p className="spot-detail-reviews__empty">{labels.reviews.empty}</p>
            )}

            {hasMoreReviews ? (
              <button
                type="button"
                className="spot-detail-reviews__toggle"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? labels.reviews.showLess : labels.reviews.showMore}
              </button>
            ) : null}
          </div>

          <div className="spot-detail-review-form" ref={formRef}>
            <h3>{labels.reviews.formTitle}</h3>
            <form
              onSubmit={handleSubmit}
            >
              <label>
                <span>{labels.reviews.nameLabel}</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span>{labels.reviews.ratingLabel}</span>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={(event) => setFormData((prev) => ({ ...prev, rating: event.target.value }))}
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} {labels.reviews.ratingSuffix}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{labels.reviews.reviewLabel}</span>
                <textarea
                  name="content"
                  rows="4"
                  value={formData.content}
                  onChange={(event) => setFormData((prev) => ({ ...prev, content: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span>{labels.reviews.photoLabel}</span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {photoPreview ? (
                  <div className="spot-detail-review-form__preview">
                    <img src={photoPreview} alt="Preview" />
                  </div>
                ) : null}
              </label>
              {message ? (
                <p
                  className={
                    message.type === "error"
                      ? "spot-detail-review-form__message spot-detail-review-form__message--error"
                      : "spot-detail-review-form__message spot-detail-review-form__message--success"
                  }
                >
                  {message.text}
                </p>
              ) : null}
              <button type="submit" className="spot-detail-review-form__submit">
                <i className="fa-solid fa-paper-plane" /> {labels.reviews.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
