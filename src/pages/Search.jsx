import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getSearchItems } from "../data/searchIndex.js";
import "../styles/search.css";

const COPY = {
  vi: {
    title: "Tìm kiếm món ngon",
    intro: "Nhập tên món ăn, thức uống hoặc món ăn vặt mà bạn muốn khám phá.",
    placeholder: "Ví dụ: phở, cà phê, chè...",
    submit: "Tìm kiếm",
    resultIntro: (term) => `Kết quả cho “${term}”`,
    noResults: (term) => `Không tìm thấy kết quả phù hợp với “${term}”.`,
    suggestion: "Gợi ý: thử các từ khoá như “phở”, “cà phê”, “chè”, “xôi”.",
    exploreCategory: (categoryLabel) => `Xem trang ${categoryLabel.toLowerCase()}`,
    accessibility: {
      searchLabel: "Tìm kiếm món ăn",
    },
  },
  en: {
    title: "Search for Delights",
    intro: "Type the name of a dish, drink, or snack you want to discover.",
    placeholder: "Example: pho, coffee, sweet soup...",
    submit: "Search",
    resultIntro: (term) => `Results for “${term}”`,
    noResults: (term) => `No matches found for “${term}”.`,
    suggestion: "Hint: try keywords like “pho”, “coffee”, “che”, “sticky rice”.",
    exploreCategory: (categoryLabel) => `Visit the ${categoryLabel.toLowerCase()} page`,
    accessibility: {
      searchLabel: "Search for a dish",
    },
  },
};

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const createExcerpt = (text, maxLength = 180) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
};

export default function Search() {
  const { language } = useLanguage();
  const labels = COPY[language] || COPY.vi;

  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  const items = useMemo(() => getSearchItems(language), [language]);

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return [];

    return items.filter((item) => {
      const haystack = [
        item.name,
        item.eyebrow,
        item.description,
        item.categoryLabel,
        item.raw?.keywords ? item.raw.keywords.join(" ") : "",
      ]
        .filter(Boolean)
        .join(" ");

      return normalizeText(haystack).includes(normalizedQuery);
    });
  }, [items, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    setQuery(trimmed);
  };

  return (
    <section className="search-page" data-page="search">
      <div className="search-page__intro">
        <h1>{labels.title}</h1>
        <p>{labels.intro}</p>
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="dish-search" className="sr-only">
            {labels.accessibility.searchLabel}
          </label>
          <div className="search-form__field">
            <input
              id="dish-search"
              type="search"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={labels.placeholder}
              autoComplete="off"
            />
            <button type="submit">{labels.submit}</button>
          </div>
        </form>
        {!query && <p className="search-page__hint">{labels.suggestion}</p>}
      </div>

      {query ? (
        <div className="search-results">
          <h2 className="search-results__title">{labels.resultIntro(query)}</h2>
          {results.length === 0 ? (
            <p className="search-results__empty">{labels.noResults(query)}</p>
          ) : (
            <ul className="search-results__grid">
              {results.map((item) => (
                <li key={item.id} className="search-result-card">
                  <div className="search-result-card__media">
                    {item.image ? (
                      <img src={item.image} alt={item.name} loading="lazy" />
                    ) : (
                      <div
                        className="search-result-card__placeholder"
                        aria-hidden="true"
                      >
                        <i className="fa-solid fa-bowl-food" />
                      </div>
                    )}
                  </div>
                  <div className="search-result-card__body">
                    <span className="search-result-card__category">
                      {item.categoryLabel}
                    </span>
                    <h3 className="search-result-card__title">{item.name}</h3>
                    {item.eyebrow ? (
                      <p className="search-result-card__eyebrow">{item.eyebrow}</p>
                    ) : null}
                    <p className="search-result-card__description">
                      {createExcerpt(item.description)}
                    </p>
                    <div className="search-result-card__actions">
                      <Link
                        to={item.url}
                        className="search-result-card__link"
                      >
                        {labels.exploreCategory(item.categoryLabel)}
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}

