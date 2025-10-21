import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function Navbar() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const labels = useMemo(
    () =>
      language === "vi"
        ? {
            home: "Trang chủ",
            foods: "Món ăn",
            drinks: "Thức uống",
            snacks: "Ăn vặt",
            search: "Tìm kiếm",
            statistics: "Thống kê",
            openMenu: "Mở menu",
            closeMenu: "Đóng menu",
          }
        : {
            home: "Home",
            foods: "Foods",
            drinks: "Drinks",
            snacks: "Snacks",
            search: "Search",
            statistics: "Statistics",
            openMenu: "Open menu",
            closeMenu: "Close menu",
          },
    [language]
  );

  const links = [
    { to: "/", label: labels.home, end: true },
    { to: "/foods", label: labels.foods },
    { to: "/drinks", label: labels.drinks },
    { to: "/snacks", label: labels.snacks },
    { to: "/search", label: labels.search },
    { to: "/statistics", label: labels.statistics },
  ];

  const toggleLabel = isMenuOpen ? labels.closeMenu : labels.openMenu;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <img
            src="/assets/logo.png"
            alt="Foodie Map logo"
            className="brand__mark"
          />
          <span className="brand__name">Foodie Map</span>
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          data-open={isMenuOpen}
        >
          <span className="sr-only">{toggleLabel}</span>
          <span className="site-header__toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={isMenuOpen ? "site-nav site-nav--open" : "site-nav"}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
