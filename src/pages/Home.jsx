import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import "../styles/home.css";

const copy = {
  vi: {
    heroTag: "Hành trình ẩm thực hà nội",
    title: "✨ Foodie Map - Hành trình Ẩm thực Hà Nội ✨",
    description:
      "Chào mừng đến với Foodie Map, nơi mỗi bước chân ở Hà Nội trở thành một cuộc phiêu lưu hương vị khó quên. Từ bát phở nóng hổi, bún chả thơm lừng đến những món ăn đường phố hút hồn, chúng tôi đồng hành cùng bạn khám phá hương vị chân thật và linh hồn của ẩm thực nơi đây.",
    cta: "Khám phá ẩm thực Việt",
    story: {
      kicker: "Câu chuyện của Foodie Map",
      title: "Gìn giữ hương vị bản địa và tinh thần Hà Nội",
      paragraphs: [
        "Foodie Map được tạo nên bởi những người trẻ lớn lên giữa các khu chợ, những gánh hàng rong và quán nhỏ nằm sâu trong phố cổ. Chúng tôi tin rằng mỗi món ăn là một ký ức, vì vậy Foodie Map kết nối bạn với những đầu bếp gia đình, nghệ nhân ẩm thực và quán quen lâu đời mà du khách thường bỏ lỡ.",
        "Chúng tôi không chỉ ghi lại địa chỉ; từng gợi ý đều được đội ngũ trải nghiệm, trò chuyện với chủ quán và tổng hợp bí quyết thưởng thức. Foodie Map vì thế giống một người bạn địa phương, dẫn đường bạn qua những góc phố thơm mùi than hoa và cà phê trứng.",
      ],
      cards: [
        {
          title: "Phở sáng phố cổ",
          description: "Hương nước dùng ấm và tiếng trò chuyện thân quen mở đầu ngày mới.",
          image: "/assets/story/pho-sang.png",
          objectPosition: "center",
        },
        {
          title: "Ăn vặt hồ Tây",
          description: "Chiếc xe đẩy với bánh giò nóng, chè lam, và nụ cười của cô bán hàng.",
          image: "/assets/story/an-vat.png",
          objectPosition: "center",
        },
        {
          title: "Đêm trà đá",
          description: "Góc phố lung linh đèn vàng, nơi những câu chuyện tiếp diễn tới khuya.",
          image: "/assets/story/dem-tra.png",
          objectPosition: "center",
        },
      ],
    },
    values: {
      title: "Điều khiến Foodie Map khác biệt",
      description:
        "Chúng tôi xây dựng Foodie Map như một nhịp cầu giữa người yêu ẩm thực và cộng đồng quán nhỏ tại Hà Nội. Mỗi chức năng đều hướng tới trải nghiệm chân thật và bền vững.",
      items: [
        {
          iconClass: "fa-solid fa-bowl-food",
          title: "Sứ mệnh",
          description:
            "Góp phần gìn giữ di sản ẩm thực bằng cách kể lại câu chuyện của từng quán ăn và người đứng bếp.",
        },
        {
          iconClass: "fa-solid fa-map-location-dot",
          title: "Tầm nhìn",
          description:
            "Trở thành bản đồ ẩm thực được tin cậy nhất khi khám phá Hà Nội, từ bữa sáng bình dân đến trải nghiệm fine dining.",
        },
        {
          iconClass: "fa-solid fa-hand-holding-heart",
          title: "Giá trị cốt lõi",
          description:
            "Chân thực, tôn trọng địa phương và đồng hành cùng chủ quán để tạo ra hành trình đáng nhớ cho bạn.",
        },
      ],
    },
  },
  en: {
    heroTag: "Your culinary guide in Hanoi",
    title: "✨ Foodie Map – Your Culinary Journey in Hanoi ✨",
    description:
      "Welcome to Foodie Map, where every step in Hanoi becomes an unforgettable taste adventure. From steaming bowls of pho and smoky bun cha to irresistible street food, we guide you to the authentic flavors and soul of the city’s cuisine. Let Foodie Map be your companion, turning your trip into a journey filled with flavors and lasting memories.",
    cta: "Explore Vietnamese Cuisine",
    story: {
      kicker: "The Story of Foodie Map",
      title: "Keeping local flavors and Hanoi’s spirit alive",
      paragraphs: [
        "Foodie Map was born from locals who grew up between wet markets, street carts, and family-run eateries tucked inside the Old Quarter. We believe every dish is a memory, so Foodie Map connects you with home cooks, culinary artisans, and beloved stalls travelers rarely discover.",
        "We don’t list addresses blindly; each recommendation is field-tested. We sit with owners, learn their stories, and capture the little rituals that make each stop special—turning Foodie Map into a local friend guiding you through charcoal-grilled aromas and creamy egg coffee nights.",
      ],
      cards: [
        {
          title: "Old Quarter Pho",
          description: "A fragrant broth and warm chatter to start your morning adventure.",
          image: "/assets/story/pho-sang.png",
          objectPosition: "center",
        },
        {
          title: "West Lake bites",
          description: "A humble cart with sticky rice, rice cakes, and the vendor’s gentle smile.",
          image: "/assets/story/an-vat.png",
          objectPosition: "center",
        },
        {
          title: "Nighttime tea",
          description: "A lantern-lit corner where conversations carry on until midnight.",
          image: "/assets/story/dem-tra.png",
          objectPosition: "center",
        },
      ],
    },
    values: {
      title: "What makes Foodie Map different",
      description:
        "Foodie Map bridges food lovers with Hanoi’s independent eateries. Every feature is crafted to celebrate authenticity and sustain local communities.",
      items: [
        {
          iconClass: "fa-solid fa-bowl-food",
          title: "Mission",
          description:
            "Preserve culinary heritage by sharing the stories of every chef and family-owned spot we feature.",
        },
        {
          iconClass: "fa-solid fa-map-location-dot",
          title: "Vision",
          description:
            "Become the most trusted guide to Hanoi dining, from humble breakfasts to elevated experiences.",
        },
        {
          iconClass: "fa-solid fa-hand-holding-heart",
          title: "Core values",
          description:
            "Authenticity, respect for locals, and companionship that turns your meals into lasting memories.",
        },
      ],
    },
  },
};

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const content = useMemo(() => copy[language], [language]);
  const { story, values } = content;

  useScrollReveal();

  return (
    <>
      <section className="home-hero" data-reveal data-reveal-direction="up">
        <div className="container home-hero__inner">
          <div
            className="home-hero__content"
            data-reveal
            data-reveal-direction="left"
          >
            <div className="home-hero__language">
              <button
                type="button"
                role="switch"
                className={`lang-switch lang-switch--${language}`}
                aria-checked={language === "en"}
                aria-label={language === "vi" ? "Đổi sang tiếng Anh" : "Switch to Vietnamese"}
                onClick={toggleLanguage}
              >
                <span className="lang-switch__option" aria-hidden="true">
                  <span className="flag flag--vi" />
                </span>
                <span className="lang-switch__option" aria-hidden="true">
                  <span className="flag flag--en" />
                </span>
                <span className="lang-switch__thumb" aria-hidden="true" />
              </button>
            </div>

            <p className="home-hero__eyebrow">{content.heroTag}</p>
            <h1 className="home-hero__title">{content.title}</h1>
            <p className="home-hero__description">{content.description}</p>

            <div className="home-hero__actions">
              <button
                type="button"
                className="cta-button"
                onClick={() => navigate("/foods")}
              >
                {content.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-story">
        <div className="container home-story__inner">
          <div
            className="home-story__text"
            data-reveal
            data-reveal-direction="left"
          >
            <span className="home-section-kicker">{story.kicker}</span>
            <h2 className="home-section-title">{story.title}</h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="home-story__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="home-story__media">
            {story.cards.map((card, index) => (
              <article
                key={card.title}
                className="story-card"
                data-reveal
                data-reveal-direction="right"
                style={{ "--reveal-delay": `${index * 140}ms` }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="story-card__image"
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-values">
        <div className="container home-values__inner">
          <header
            className="home-values__header"
            data-reveal
            data-reveal-direction="up"
          >
            <span className="home-section-kicker">Foodie Map</span>
            <h2 className="home-section-title">{values.title}</h2>
            <p className="home-values__intro">{values.description}</p>
          </header>

          <div className="home-values__grid">
            {values.items.map((item, index) => (
              <article
                key={item.title}
                className="value-card"
                data-reveal
                data-reveal-direction="up"
                style={{ "--reveal-delay": `${index * 160 + 120}ms` }}
              >
                <span className="value-card__icon" aria-hidden="true">
                  <i className={item.iconClass} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
