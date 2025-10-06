import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function Navbar() {
  const { language } = useLanguage();

  const labels = useMemo(
    () =>
      language === "vi"
        ? {
            home: "Trang chủ",
            foods: "Món ăn",
            drinks: "Thức uống",
            snacks: "Ăn vặt",
            statistics: "Thống kê",
          }
        : {
            home: "Home",
            foods: "Foods",
            drinks: "Drinks",
            snacks: "Snacks",
            statistics: "Statistics",
          },
    [language]
  );

  const links = [
    { to: "/", label: labels.home, end: true },
    { to: "/foods", label: labels.foods },
    { to: "/drinks", label: labels.drinks },
    { to: "/snacks", label: labels.snacks },
    { to: "/statistics", label: labels.statistics },
  ];

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

        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
