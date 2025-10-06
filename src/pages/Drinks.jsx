import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useAutoPlayVideos from "../hooks/useAutoPlayVideos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import "../styles/foods.css";
import { recordClickEvent } from "../utils/clickTracker.js";

const STORAGE_KEY = "foodie_map_drink_clicks";

export const DRINKS_COPY = {
  vi: {
    labels: {
      cta: "Thưởng thức ngay",
      mapButton: "Xem Google Maps",
      clicks: "Lượt xem",
      videoFallback:
        "Trình duyệt của bạn không hỗ trợ phát video. Vui lòng tải video trực tiếp.",
      detailsButton: "Review",
      whyTryTitle: "Tại sao bạn nên thử?",
    },
    dishes: [
      {
        id: "coffee",
        hero: {
          eyebrow: "Văn hoá cà phê",
          title: "CÀ PHÊ HÀ NỘI",
          description:
            "Ở Việt Nam, cà phê không chỉ là đồ uống mà còn là một nét sống. Người Hà Nội chậm rãi nhấp từng ngụm cà phê phin đậm đà, sáng tạo nên cà phê trứng, cà phê cốt dừa và biến quán cà phê thành nơi gặp gỡ, kể chuyện đời thường. Mùi cà phê rang xay lan khắp những con phố nhỏ, đánh thức một buổi sáng đầy cảm hứng. Chỉ cần ngồi xuống chiếc ghế nhựa bên hè, bạn sẽ cảm thấy nhịp sống chậm lại và những câu chuyện thân quen cứ thế tuôn trào.",
          image: "/assets/cafe/cafe.png",
          imageAlt: "Cà phê phin và cà phê trứng Hà Nội",
          cta: "Khám phá quán cà phê",
        },
        intro: {
          title: "VIDEO",
          body: "Hành trình cà phê Hà Nội – từ phin truyền thống tới cà phê trứng huyền thoại.",
        },
        video: {
          type: "local",
          src: "/assets/cafe/cafe.mp4",
          poster: "/assets/cafe/cafe.png",
        },
        ingredientGallery: [
          {
            id: "coffee-phin",
            src: "/assets/cafe/caphephin.png",
            caption: "Phin nhôm nhỏ giọt chậm rãi cho hương vị đậm đà",
            alt: "Cà phê phin Việt Nam",
          },
          {
            id: "coffee-egg",
            src: "/assets/cafe/caphetrung.png",
            caption: "Cà phê trứng – lớp kem trứng béo mịn phủ trên cà phê nóng",
            alt: "Ly cà phê trứng",
          },
          {
            id: "coffee-coconut",
            src: "/assets/cafe/caphecotdua.png",
            caption: "Cà phê cốt dừa cong cong – phối hợp giữa cà phê rang và dừa",
            alt: "Cà phê cốt dừa",
          },
        ],
        ingredientsTitle: "Hương vị đặc trưng",
        ingredientsList: [
          { iconClass: "fa-solid fa-mug-saucer", text: "Cà phê Robusta rang đậm – linh hồn của cà phê Việt." },
          { iconClass: "fa-solid fa-water", text: "Chiếc phin nhỏ giọt tạo nên nhịp điệu chậm rãi." },
          { iconClass: "fa-solid fa-egg", text: "Trứng gà, sữa đặc làm nên lớp kem mịn của cà phê trứng." },
          { iconClass: "fa-solid fa-seedling", text: "Dừa tươi, sữa dừa hoà quyện với cà phê cho hương vị nhiệt đới." },
          { iconClass: "fa-solid fa-people-group", text: "Không gian quán cà phê – nơi gặp gỡ, trò chuyện và sống chậm." },
        ],
        recipeTitle: "Thưởng thức cà phê như người Hà Nội",
        recipeSteps: [
          "Pha cà phê phin nóng, chờ từng giọt rơi để cảm nhận trọn mùi hương.",
          "Thử cà phê trứng béo mịn, hoặc cà phê cốt dừa mát lạnh cho ngày hè.",
          "Chọn một quán quen, nhâm nhi và trò chuyện để cảm nhận nhịp sống chậm rãi của phố cổ.",
        ],
        spotsTitle: "Quán cà phê nên ghé",
        spots: [
          {
            id: "pho-co-cafe",
            name: "PHỐ CỔ CAFE",
            address: "11 Hàng Gai, Hoàn Kiếm",
            description:
              "Nằm ẩn trong phố cổ với view Hồ Gươm, nổi tiếng cà phê trứng.",
            price: "Giá 30.000 – 55.000đ (≈ $1.2 – $2.2).",
            image: "/assets/cafe/hinh1.png",
            mapUrl: "https://maps.google.com/?q=11+H%C3%A0ng+Gai+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cong-cafe",
            name: "CỘNG CAFE",
            address: "27 Phố Nhà Thờ, Hoàn Kiếm",
            description:
              "Phong cách hoài niệm thập niên 80, nổi tiếng cà phê cốt dừa.",
            price: "Giá 49.000 – 69.000đ (≈ $2 – $3).",
            image: "/assets/cafe/hinh2.png",
            mapUrl: "https://maps.google.com/?q=27+Ph%E1%BB%91+Nh%C3%A0+Th%E1%BB%9D+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "giang-cafe",
            name: "GIẢNG CAFE",
            address: "39 Nguyễn Hữu Huân, Hoàn Kiếm",
            description:
              "Nơi khai sinh cà phê trứng từ năm 1946, nằm trong con ngõ nhỏ.",
            price: "Giá 25.000 – 45.000đ (≈ $1 – $2).",
            image: "/assets/cafe/hinh3.png",
            mapUrl: "https://maps.google.com/?q=39+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
    ],
  },
  en: {
    labels: {
      cta: "Enjoy now",
      mapButton: "Open Google Maps",
      clicks: "Clicks",
      videoFallback:
        "Your browser does not support the video tag. Please download the file to watch.",
      detailsButton: "Review",
      whyTryTitle: "Why you should try it?",
    },
    dishes: [
      {
        id: "coffee",
        hero: {
          eyebrow: "Coffee culture",
          title: "HANOI COFFEE",
          description:
            "Coffee in Vietnam is a way of life. Hanoi’s cafes serve slow-drip phin coffee, creative egg coffee, coconut coffee, and invite you to pause, connect, and savour every story in the cup. The aroma of freshly ground beans drifts through narrow alleys and wakes the city with a warm hug. Take a seat on a tiny sidewalk stool and time stretches as conversations and quiet reflections flow effortlessly.",
          image: "/assets/cafe/cafe.png",
          imageAlt: "Phin brew and Hanoi egg coffee",
          cta: "Find a café",
        },
        intro: {
          title: "VIDEO",
          body: "Discover Hanoi coffee culture—from traditional phin drip to legendary egg coffee.",
        },
        video: {
          type: "local",
          src: "/assets/cafe/cafe.mp4",
          poster: "/assets/cafe/cafe.png",
        },
        ingredientGallery: [
          {
            id: "coffee-phin",
            src: "/assets/cafe/caphephin.png",
            caption: "Slow-drip phin brewing for bold aroma",
            alt: "Vietnamese phin coffee",
          },
          {
            id: "coffee-egg",
            src: "/assets/cafe/caphetrung.png",
            caption: "Egg coffee crowned with silky, custard-like foam",
            alt: "Egg coffee glass",
          },
          {
            id: "coffee-coconut",
            src: "/assets/cafe/caphecotdua.png",
            caption: "Coconut coffee blending robust brew with creamy coconut",
            alt: "Coconut coffee cup",
          },
        ],
        ingredientsTitle: "Signature flavours",
        ingredientsList: [
          { iconClass: "fa-solid fa-mug-saucer", text: "Dark-roasted Robusta beans for a bold base." },
          { iconClass: "fa-solid fa-water", text: "Phin filter delivering a slow, mindful brew." },
          { iconClass: "fa-solid fa-egg", text: "Egg yolk and condensed milk for the iconic egg coffee." },
          { iconClass: "fa-solid fa-seedling", text: "Coconut milk and cream for tropical twists." },
          { iconClass: "fa-solid fa-people-group", text: "Cafés as social hubs for conversation and relaxation." },
        ],
        recipeTitle: "How locals enjoy it",
        recipeSteps: [
          "Brew a phin coffee and savour the aroma while it drips.",
          "Try egg coffee or coconut coffee for a creative twist.",
          "Linger in a cosy café, chat with locals, and soak in Hanoi’s pace of life.",
        ],
        spotsTitle: "Cafés to visit",
        spots: [
          {
            id: "pho-co-cafe",
            name: "PHO CO CAFE",
            address: "11 Hang Gai Street, Hoan Kiem",
            description:
              "Hidden Old Quarter café with lake view and signature egg coffee.",
            price: "Price: 30,000 – 55,000 VND (≈ $1.2 – $2.2).",
            image: "/assets/cafe/hinh1.png",
            mapUrl: "https://maps.google.com/?q=11+H%C3%A0ng+Gai+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cong-cafe",
            name: "CONG CAFE",
            address: "27 Nha Tho Street, Hoan Kiem",
            description:
              "Retro-themed chain famed for coconut coffee.",
            price: "Price: 49,000 – 69,000 VND (≈ $2 – $3).",
            image: "/assets/cafe/hinh2.png",
            mapUrl: "https://maps.google.com/?q=27+Ph%E1%BB%91+Nh%C3%A0+Th%E1%BB%9D+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "giang-cafe",
            name: "GIANG CAFE",
            address: "39 Nguyen Huu Huan, Hoan Kiem",
            description:
              "Birthplace of egg coffee since 1946; cosy alley hideaway.",
            price: "Price: 25,000 – 45,000 VND (≈ $1 – $2).",
            image: "/assets/cafe/hinh3.png",
            mapUrl: "https://maps.google.com/?q=39+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
    ],
  },
};

function renderVideo(language, dish) {
  if (!dish.video) return null;
  if (dish.video.type === "youtube") {
    return (
      <iframe
        src={dish.video.src}
        title={`${dish.hero.title} video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }
  return (
    <video
      className="foods-video__player"
      controls
      muted
      playsInline
      preload="metadata"
      poster={dish.video.poster}
      data-autoplay-on-view
    >
      <source src={dish.video.src} type="video/mp4" />
      {DRINKS_COPY[language].labels.videoFallback}
    </video>
  );
}

export default function Drinks() {
  const { language } = useLanguage();
  const { dishes, labels } = useMemo(() => DRINKS_COPY[language], [language]);
  const [clickStats, setClickStats] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  });

  useScrollReveal("[data-reveal]");
  useAutoPlayVideos();

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clickStats));
    } catch (error) {
      // ignore write errors
    }
  }, [clickStats]);

  const handleMapClick = (spot) => () => {
    setClickStats((prev) => ({
      ...prev,
      [spot.id]: (prev[spot.id] || 0) + 1,
    }));
    recordClickEvent({
      category: "drinks",
      id: spot.id,
      name: spot.name,
      mapUrl: spot.mapUrl,
    });
    window.open(spot.mapUrl, "_blank", "noopener,noreferrer");
  };

  const scrollToDetails = (id) => {
    const target = document.getElementById(`${id}-details`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="foods-page">
      {dishes.map((dish) => (
        <Fragment key={dish.id}>
          <section className="foods-hero" data-reveal data-reveal-direction="up">
            <div className="foods-hero__shell">
              <div className="foods-hero__content">
                <span className="foods-hero__eyebrow">{dish.hero.eyebrow}</span>
                <h1 className="foods-hero__title">{dish.hero.title}</h1>
                {dish.hero.cta && (
                  <button type="button" className="foods-cta" onClick={() => scrollToDetails(dish.id)}>
                    <i className="fa-solid fa-arrow-down" />&nbsp;{dish.hero.cta || labels.cta}
                  </button>
                )}
              </div>
              <div className="foods-hero__visual" data-reveal data-reveal-direction="right">
                {dish.hero.image ? (
                  <img src={dish.hero.image} alt={dish.hero.imageAlt || dish.hero.title} loading="lazy" />
                ) : (
                  <div className="foods-hero__visualPlaceholder" aria-hidden="true">
                    <i className="fa-solid fa-mug-hot" />
                  </div>
                )}
              </div>
            </div>
          </section>

          <section
            className="foods-section foods-overview"
            id={`${dish.id}-details`}
            data-reveal
            data-reveal-direction="left"
          >
            <div className="foods-overview__grid">
              {dish.video && (
                <article className="foods-card foods-video" data-reveal data-reveal-direction="right">
                  <h3>{dish.intro.title}</h3>
                  {dish.intro.body ? <p>{dish.intro.body}</p> : null}
                  {dish.video.description && (
                    <p className="foods-video__description">{dish.video.description}</p>
                  )}
                  {renderVideo(language, dish)}
                </article>
              )}
              {!dish.video && (dish.intro.title || dish.intro.body) ? (
                <article className="foods-card">
                  <h3>{dish.intro.title}</h3>
                  {dish.intro.body ? <p>{dish.intro.body}</p> : null}
                </article>
              ) : null}
              {dish.hero.description ? (
                <article className="foods-card foods-why">
                  <h3>{labels.whyTryTitle}</h3>
                  <p>{dish.hero.description}</p>
                </article>
              ) : null}
            </div>
          </section>

          <section className="foods-section" data-reveal data-reveal-direction="up">
            <h2 className="home-section-title">{dish.spotsTitle}</h2>
            <div className="ingredients-grid">
              {dish.spots.map((spot, index) => (
                <article
                  key={spot.id}
                  className="spot-card"
                  data-reveal
                  data-reveal-direction={index % 2 === 0 ? "left" : "right"}
                  style={{ "--reveal-delay": `${index * 120}ms` }}
                >
                  <div className="spot-card__media">
                    {spot.image ? (
                      <img src={spot.image} alt={spot.name} loading="lazy" />
                    ) : (
                      <div className="spot-card__placeholder" aria-hidden="true">
                        <i className="fa-solid fa-store" />
                      </div>
                    )}
                  </div>
                  <div className="spot-card__content">
                    <h3>{spot.name}</h3>
                    <div className="spot-card__meta">
                      <i className="fa-solid fa-location-dot" />
                      <span>{spot.address}</span>
                    </div>
                    <p>{spot.description}</p>
                    {spot.price ? <p className="spot-card__price">{spot.price}</p> : null}
                    <div className="spot-card__actions">
                      <Link
                        to={`/spot/drinks/${spot.id}`}
                        className="spot-card__link spot-card__link--secondary"
                      >
                        {labels.detailsButton}
                      </Link>
                      <div className="spot-card__actionsRow">
                        <button
                          type="button"
                          className="spot-card__link spot-card__link--map"
                          onClick={handleMapClick(spot)}
                        >
                          <i className="fa-solid fa-map-pin" />
                          {labels.mapButton}
                        </button>
                        <span className="spot-card__stats">
                          <i className="fa-solid fa-chart-line" /> {labels.clicks}: {clickStats[spot.id] || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Fragment>
      ))}
    </div>
  );
}
