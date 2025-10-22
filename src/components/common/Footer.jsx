import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

const copy = {
  vi: {
    aboutTitle: "Về Foodie Map",
    aboutDesc:
      "Foodie Map là cộng đồng những người yêu ẩm thực Hà Nội, giúp bạn khám phá quán ngon bản địa và câu chuyện phía sau mỗi món ăn.",
    quickLinks: "Khám phá nhanh",
    contactTitle: "Kết nối",
    contactDesc:
      "Theo dõi Instagram hoặc Threads để cập nhật địa điểm mới mỗi tuần.",
    copyright: "© ${year} Foodie Map. Giữ trọn hương vị Hà Nội.",
    links: [
      { to: "/foods", label: "Món ăn" },
      { to: "/drinks", label: "Thức uống" },
      { to: "/snacks", label: "Ăn vặt" },
      { to: "/statistics", label: "Thống kê" },
    ],
  },
  en: {
    aboutTitle: "About Foodie Map",
    aboutDesc:
      "Foodie Map is a Hanoi food lovers' community, guiding you to authentic spots and the stories behind every dish.",
    quickLinks: "Quick explore",
    contactTitle: "Stay in touch",
    contactDesc:
      "Connect via Instagram or Threads for weekly updates on hidden gems.",
    copyright: "© ${year} Foodie Map. Preserving the flavors of Hanoi.",
    links: [
      { to: "/foods", label: "Foods" },
      { to: "/drinks", label: "Drinks" },
      { to: "/snacks", label: "Snacks" },
      { to: "/statistics", label: "Statistics" },
    ],
  },
};

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/foo.diehanoi?igsh=dG9hbWFlbDQzajc5&utm_source=qr",
    iconClass: "fa-brands fa-instagram",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@foo.diehanoi?igshid=NTc4MTIwNjQ2YQ==",
    iconClass: "fa-brands fa-threads",
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const content = copy[language];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner" data-reveal data-reveal-direction="up">
        <div className="footer-column">
          <div className="brand footer-brand">
            <img src="/assets/logo.png" alt="Foodie Map logo" className="footer-brand__mark" />
            <span className="footer-brand__name">Foodie Map</span>
          </div>
          <h3>{content.aboutTitle}</h3>
          <p>{content.aboutDesc}</p>
        </div>

        <div className="footer-column">
          <h3>{content.quickLinks}</h3>
          <ul>
            {content.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>{content.contactTitle}</h3>
          <p>{content.contactDesc}</p>
          <div className="footer-socials">
            {socials.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">
                <i className={item.iconClass} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>{content.copyright.replace("${year}", year)}</p>
      </div>
    </footer>
  );
}
