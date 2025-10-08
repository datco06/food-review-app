import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useAutoPlayVideos from "../hooks/useAutoPlayVideos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import "../styles/foods.css";
import { aggregateEventCounts, recordClickEvent } from "../utils/clickTracker.js";
import { fetchClickEvents } from "../utils/supabaseApi.js";

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
      {
        id: "sugarcane",
        hero: {
          eyebrow: "Giải khát hè phố",
          title: "NƯỚC MÍA",
          description:
            "Nước mía được ép trực tiếp từ mía tươi, mang vị ngọt tự nhiên và thanh mát. Một chút tắc, chanh hoặc dứa sẽ khiến ly nước mía càng thơm và sảng khoái, xua tan cái nóng oi ả của Hà Nội.",
          image: "/assets/nuocmia/nuocmia.jpeg",
          imageAlt: "Ly nước mía tươi với lát chanh",
          cta: "Tìm quán nước mía",
        },
        intro: {
          title: "HƯƠNG VỊ ĐƯỜNG PHỐ",
          body: "Ly nước mía ép tại chỗ, thêm tắc hoặc dứa để tăng độ thơm mát.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Điểm nhấn hương vị",
        ingredientsList: [
          { iconClass: "fa-solid fa-seedling", text: "Mía tươi chọn kỹ, ép ngay sau khi gọt bỏ vỏ." },
          { iconClass: "fa-solid fa-lemon", text: "Tắc hoặc chanh giúp vị ngọt thêm cân bằng." },
          { iconClass: "fa-solid fa-apple-whole", text: "Dứa ép cùng cho mùi thơm dịu và vị ngọt nhẹ." },
          { iconClass: "fa-solid fa-ice-cream", text: "Đá viên làm lạnh tức thì, giữ trọn sự mát lành." },
          { iconClass: "fa-solid fa-bottle-water", text: "Có thể pha thêm muối hoặc sữa đặc cho đa dạng khẩu vị." },
        ],
        recipeTitle: "Thưởng thức ngon hơn",
        recipeSteps: [
          "Ép mía tươi với máy sạch, bỏ phần bã ngay sau khi ép.",
          "Thêm tắc hoặc chanh, dứa và đá viên tuỳ khẩu vị.",
          "Uống ngay khi còn mát lạnh để cảm nhận vị ngọt thanh tự nhiên.",
        ],
        spotsTitle: "Quán nước mía nên thử",
        spots: [
          {
            id: "nuocmia-tohieu",
            name: "NƯỚC MÍA SIÊU SẠCH",
            address: "15 Tô Hiệu, Cầu Giấy",
            description:
              "Quầy ép tại chỗ với mía tươi và vị tắc chua nhẹ, phục vụ cả ngày.",
            price: "Giá: 10.000 – 20.000đ/ly.",
            image: "/assets/nuocmia/1.png",
            mapUrl: "https://maps.google.com/?q=15+T%C3%B4+Hi%E1%BB%87u+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nuocmia-doican",
            name: "NƯỚC MÍA MIX DỨA",
            address: "108 Đội Cấn, Ba Đình",
            description:
              "Ly nước mía thơm vị dứa, ngọt dịu, được nhiều bạn trẻ yêu thích.",
            price: "Giá: 10.000 – 20.000đ/ly.",
            image: "/assets/nuocmia/2.png",
            mapUrl: "https://maps.google.com/?q=108+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nuocmia-loduc",
            name: "NƯỚC MÍA VIỄN ĐÔNG",
            address: "93A Lò Đúc, Hai Bà Trưng",
            description:
              "Quán lâu năm nổi tiếng với nước mía thêm sầu riêng và topping đa dạng.",
            price: "Giá: 12.000 – 25.000đ/ly.",
            image: "/assets/nuocmia/3.png",
            mapUrl: "https://maps.google.com/?q=93A+L%C3%B2+%C4%90%C3%BAc+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "lotus-tea",
        hero: {
          eyebrow: "Tinh hoa Tây Hồ",
          title: "TRÀ SEN TÂY HỒ",
          description:
            "Trà sen Tây Hồ được ủ từ sen trăm cánh nở giữa hồ, mang hương thơm thanh khiết và vị trà xanh dịu nhẹ. Mỗi ngụm trà là sự kết hợp tinh tế của hương sen và vị trà, gợi lên nét tao nhã của người Tràng An.",
          image: "/assets/trasen/trasen.jpeg",
          imageAlt: "Ấm trà sen Tây Hồ",
          cta: "Thưởng trà sen",
        },
        intro: {
          title: "VIDEO",
          body: "Hành trình ướp trà sen Tây Hồ – từ đêm hái sen tới hương trà quyến luyến.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/-vQLiChyFg8?autoplay=1&mute=1&rel=0",
          description: "Quy trình ướp trà bằng sen trăm cánh để tạo nên hương vị đặc trưng của Hà Nội.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Hương vị đặc trưng",
        ingredientsList: [
          { iconClass: "fa-solid fa-spa", text: "Sen trăm cánh Tây Hồ tỏa hương ngát." },
          { iconClass: "fa-solid fa-mug-hot", text: "Trà xanh Thái Nguyên chọn lọc làm nền." },
          { iconClass: "fa-solid fa-wind", text: "Quy trình ướp nhiều đêm để trà thấm hương sen." },
          { iconClass: "fa-solid fa-seedling", text: "Lá trà nhỏ, màu xanh non, vị ngọt hậu." },
          { iconClass: "fa-solid fa-heart", text: "Sự tinh tế và tỉ mỉ của nghệ nhân trà Hà Nội." },
        ],
        recipeTitle: "Thưởng trà đúng điệu",
        recipeSteps: [
          "Đun nước sôi, để nguội khoảng 80–85°C trước khi rót vào ấm trà.",
          "Tráng sơ trà cho tỉnh hương, sau đó hãm 3–4 phút.",
          "Nhâm nhi từng ngụm nhỏ, cảm nhận hương sen lan toả nhẹ nhàng.",
        ],
        spotsTitle: "Địa chỉ trà sen Tây Hồ",
        spots: [
          {
            id: "trasen-hoangtra",
            name: "TRÀ SEN TÂY HỒ HOÀNG TRÀ",
            address: "98 Tô Ngọc Vân, Tây Hồ",
            description:
              "Cơ sở ướp trà truyền thống, mở cửa 24/7, cung cấp trà sen cao cấp đóng hộp.",
            price: "Giá: khoảng 900.000đ/hộp trà.",
            image: "/assets/trasen/1.png",
            mapUrl: "https://maps.google.com/?q=98+T%C3%B4+Ng%E1%BB%8Dc+V%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "trasen-minhcuong",
            name: "TRÀ SEN TÂY HỒ MINH CƯỜNG",
            address: "101 Hoàng Văn Thái, Thanh Xuân",
            description:
              "Nơi cung cấp trà sen ướp thủ công với mức giá linh hoạt 600.000 – 1.000.000đ/100g.",
            price: "Giá: 600.000 – 1.000.000đ/100g.",
            image: "/assets/trasen/2.png",
            mapUrl: "https://maps.google.com/?q=101+Ho%C3%A0ng+V%C4%83n+Th%C3%A1i+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "trasen-thanhtrung",
            name: "TRÀ SEN TÂY HỒ THANH TRUNG",
            address: "35 Nguyễn Đình Thi, Tây Hồ",
            description:
              "Cửa hàng bên hồ Tây với trải nghiệm thưởng trà tại chỗ, bán lẻ trà sen ướp thủ công.",
            price: "Giá: 700.000 – 1.200.000đ/100g.",
            image: "/assets/trasen/3.png",
            mapUrl: "https://maps.google.com/?q=35+Nguy%E1%BB%85n+%C4%90%C3%ACnh+Thi+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "nuoc-sau",
        hero: {
          eyebrow: "Hương vị mùa hè",
          title: "NƯỚC SẤU",
          description:
            "Nước sấu được pha từ sấu ngâm đường, mang vị ngọt, chua và hơi cay nhẹ đặc trưng của Hà Nội. Mỗi ly nước sấu như gói ghém ký ức về những hàng cây già và tiếng rao quen thuộc mùa hạ.",
          image: "/assets/nuocsau/nuocsau.jpg",
          imageAlt: "Ly nước sấu đá mát lạnh",
          cta: "Thưởng thức nước sấu",
        },
        intro: {
          title: "ĐẶC SẢN PHỐ CỔ",
          body: "Nước sấu pha từ sấu ngâm, thêm đá và chút gừng vừa mát vừa thơm.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Điểm nhấn hương vị",
        ingredientsList: [
          { iconClass: "fa-solid fa-apple-whole", text: "Quả sấu chín vừa, ngâm đường nhiều ngày." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước sấu cô đặc hòa với nước lọc." },
          { iconClass: "fa-solid fa-ice-cream", text: "Đá viên giúp ly nước thêm sảng khoái." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Gừng giã nhỏ tạo hậu vị ấm nhẹ." },
          { iconClass: "fa-solid fa-lemon", text: "Có thể thêm vài lát chanh hoặc tắc để tăng độ thơm." },
        ],
        recipeTitle: "Cách pha đơn giản",
        recipeSteps: [
          "Ngâm sấu với đường, gừng trong vài ngày cho ra nước cốt.",
          "Pha nước cốt với nước lọc, điều chỉnh độ ngọt chua." ,
          "Thêm đá, vài lát gừng và thưởng thức ngay." ,
        ],
        spotsTitle: "Quán nước sấu nổi tiếng",
        spots: [
          {
            id: "nuocsau-batam",
            name: "NƯỚC SẤU BÀ TÂM",
            address: "2 Hàng Đường, Hoàn Kiếm",
            description:
              "Quán nhỏ ngay phố cổ với hũ sấu ngâm truyền thống, phục vụ suốt ngày." ,
            price: "Giá: 15.000 – 25.000đ/ly.",
            image: "/assets/nuocsau/1.webp",
            mapUrl: "https://maps.google.com/?q=2+H%C3%A0ng+%C4%90%C6%B0%E1%BB%9Dng+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nuocsau-sauxanh",
            name: "CAFÉ SẤU XANH",
            address: "25 Nhà Thờ, Hoàn Kiếm",
            description:
              "Quán cà phê hiện đại biến tấu nước sấu với hương vị sáng tạo." ,
            price: "Giá: 35.000 – 45.000đ/ly.",
            image: "/assets/nuocsau/2.jpg",
            mapUrl: "https://maps.google.com/?q=25+Nh%C3%A0+Th%E1%BB%9D+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nuocsau-dongxuan",
            name: "HÀNG NƯỚC CHỢ ĐỒNG XUÂN",
            address: "Cổng chợ Đồng Xuân, Hoàn Kiếm",
            description:
              "Trải nghiệm đậm chất địa phương với ly nước sấu mát lạnh ở chợ lớn." ,
            price: "Giá: 10.000 – 20.000đ/ly.",
            image: "/assets/nuocsau/3.webp",
            mapUrl: "https://maps.google.com/?q=%C4%90%E1%BB%93ng+Xu%C3%A2n+Market+Hanoi",
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
      {
        id: "sugarcane",
        hero: {
          eyebrow: "Street-side refresher",
          title: "SUGARCANE JUICE",
          description:
            "Freshly pressed cane juice is a summertime staple in Hanoi. The natural sweetness of cane, brightened with calamansi or pineapple, makes for an instantly cooling pick-me-up on any humid day.",
          image: "/assets/nuocmia/nuocmia.jpeg",
          imageAlt: "Glass of sugarcane juice with lime",
          cta: "Sip sugarcane juice",
        },
        intro: {
          title: "QUICK REFRESHMENT",
          body: "Ice-cold cane juice pressed to order, often lifted with calamansi or pineapple.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "What makes it shine",
        ingredientsList: [
          { iconClass: "fa-solid fa-seedling", text: "Sweet, freshly harvested sugarcane." },
          { iconClass: "fa-solid fa-lemon", text: "Calamansi or lime to balance the sweetness." },
          { iconClass: "fa-solid fa-apple-whole", text: "Pineapple pressed together for fragrant notes." },
          { iconClass: "fa-solid fa-ice-cream", text: "Plenty of ice to keep it icy-cold." },
          { iconClass: "fa-solid fa-bottle-water", text: "Optional pinch of salt or condensed milk for variety." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Press cleaned cane with a sanitary juicer, removing pulp immediately.",
          "Stir in calamansi, lime, or pineapple juice along with ice cubes.",
          "Drink straight away to savour the freshest, most refreshing flavour.",
        ],
        spotsTitle: "Where to sip in Hanoi",
        spots: [
          {
            id: "nuocmia-tohieu",
            name: "SUGAR CANE JUICE SIÊU SẠCH",
            address: "15 To Hieu, Cau Giay",
            description:
              "Pressed-to-order cane juice with calamansi; a reliable stop from morning to night.",
            price: "Price: 10,000 – 20,000 VND per glass.",
            image: "/assets/nuocmia/1.png",
            mapUrl: "https://maps.google.com/?q=15+T%C3%B4+Hi%E1%BB%87u+Hanoi",
          },
          {
            id: "nuocmia-doican",
            name: "SUGAR CANE & PINEAPPLE MIX",
            address: "108 Doi Can, Ba Dinh",
            description:
              "Beloved for its fragrant pineapple twist and naturally light sweetness.",
            price: "Price: 10,000 – 20,000 VND per glass.",
            image: "/assets/nuocmia/2.png",
            mapUrl: "https://maps.google.com/?q=108+%C4%90%E1%BB%99i+C%E1%BA%A5n+Hanoi",
          },
          {
            id: "nuocmia-loduc",
            name: "VIEN DONG SUGAR CANE",
            address: "93A Lo Duc, Hai Ba Trung",
            description:
              "Longstanding shop offering inventive toppings like durian for adventurous palates.",
            price: "Price: 12,000 – 25,000 VND per glass.",
            image: "/assets/nuocmia/3.png",
            mapUrl: "https://maps.google.com/?q=93A+L%C3%B2+%C4%90%C3%BAc+Hanoi",
          },
        ],
      },
      {
        id: "lotus-tea",
        hero: {
          eyebrow: "Elegance of West Lake",
          title: "WEST LAKE LOTUS TEA",
          description:
            "Fragrant lotus blossoms from Hanoi’s West Lake are used to perfume green tea leaves, creating a refined brew treasured by tea connoisseurs. Each cup is delicate, floral, and unmistakably Hanoi.",
          image: "/assets/trasen/trasen.jpeg",
          imageAlt: "Teapot of West Lake lotus tea",
          cta: "Savour lotus tea",
        },
        intro: {
          title: "VIDEO",
          body: "From late-night harvests to the meticulous process of perfuming lotus tea.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/-vQLiChyFg8?autoplay=1&mute=1&rel=0",
          description: "Crafting West Lake lotus tea with fragrant hundred-petal blossoms.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Signature notes",
        ingredientsList: [
          { iconClass: "fa-solid fa-spa", text: "Hundred-petal lotus flowers harvested at dawn." },
          { iconClass: "fa-solid fa-mug-hot", text: "Premium green tea leaves as the base." },
          { iconClass: "fa-solid fa-wind", text: "Overnight infusion so tea absorbs lotus aroma." },
          { iconClass: "fa-solid fa-leaf", text: "Delicate, jade-green leaves with sweet finish." },
          { iconClass: "fa-solid fa-heart", text: "Artisan craftsmanship honed over generations." },
        ],
        recipeTitle: "How to brew",
        recipeSteps: [
          "Heat water to around 80–85°C before pouring over the tea.",
          "Rinse the leaves briefly, then steep for 3–4 minutes.",
          "Sip slowly to appreciate the lingering lotus fragrance.",
        ],
        spotsTitle: "Lotus tea boutiques",
        spots: [
          {
            id: "trasen-hoangtra",
            name: "HOANG TRA LOTUS TEA",
            address: "98 To Ngoc Van, Tay Ho",
            description:
              "Traditional family workshop open 24/7, specialising in premium boxed lotus tea.",
            price: "Price: about 900,000 VND per box.",
            image: "/assets/trasen/1.png",
            mapUrl: "https://maps.google.com/?q=98+T%C3%B4+Ng%E1%BB%8Dc+V%C3%A2n+Hanoi",
          },
          {
            id: "trasen-minhcuong",
            name: "MINH CUONG LOTUS TEA",
            address: "101 Hoang Van Thai, Thanh Xuan",
            description:
              "Hand-perfumed lotus tea with flexible pricing from 600,000 to 1,000,000 VND per 100 g.",
            price: "Price: 600,000 – 1,000,000 VND / 100 g.",
            image: "/assets/trasen/2.png",
            mapUrl: "https://maps.google.com/?q=101+Ho%C3%A0ng+V%C4%83n+Th%C3%A1i+Hanoi",
          },
          {
            id: "trasen-thanhtrung",
            name: "THANH TRUNG LOTUS TEA",
            address: "35 Nguyen Dinh Thi, Tay Ho",
            description:
              "Lakeside boutique offering on-site tastings and retail of handcrafted lotus tea.",
            price: "Price: 700,000 – 1,200,000 VND / 100 g.",
            image: "/assets/trasen/3.png",
            mapUrl: "https://maps.google.com/?q=35+Nguy%E1%BB%85n+%C4%90%C3%ACnh+Thi+Hanoi",
          },
        ],
      },
      {
        id: "nuoc-sau",
        hero: {
          eyebrow: "Summer nostalgia",
          title: "DRACONTOMELON JUICE",
          description:
            "Nuoc sau is Hanoi’s quintessential summer refresher made from pickled dracontomelon fruit. Sweet, sour, and lightly spicy with ginger, it evokes shady tree-lined streets and the calls of street vendors.",
          image: "/assets/nuocsau/nuocsau.jpg",
          imageAlt: "Glass of dracontomelon juice",
          cta: "Cool off with nuoc sau",
        },
        intro: {
          title: "OLD QUARTER CLASSIC",
          body: "Chilled dracontomelon juice infused with ginger and a hint of lime.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Signature notes",
        ingredientsList: [
          { iconClass: "fa-solid fa-apple-whole", text: "Pickled dracontomelon fruit steeped in syrup." },
          { iconClass: "fa-solid fa-mug-hot", text: "Diluted syrup forming a refreshing base." },
          { iconClass: "fa-solid fa-ice-cream", text: "Plenty of ice to keep it frosty." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Fresh ginger slices for gentle heat." },
          { iconClass: "fa-solid fa-lemon", text: "Optional squeeze of lime or calamansi." },
        ],
        recipeTitle: "How to mix",
        recipeSteps: [
          "Pickle dracontomelon fruit with sugar and ginger until a syrup forms.",
          "Dilute syrup with cold water and adjust the sweet-sour balance." ,
          "Add ice and garnish with ginger or lime slices before serving." ,
        ],
        spotsTitle: "Where to sip",
        spots: [
          {
            id: "nuocsau-batam",
            name: "BA TAM NƯỚC SẤU",
            address: "2 Hang Duong, Hoan Kiem",
            description:
              "Tiny Old Quarter stand pouring nostalgic glasses all day." ,
            price: "Price: 15,000 – 25,000 VND per glass.",
            image: "/assets/nuocsau/1.webp",
            mapUrl: "https://maps.google.com/?q=2+H%C3%A0ng+%C4%90%C6%B0%E1%BB%9Dng+Hanoi",
          },
          {
            id: "nuocsau-sauxanh",
            name: "CAFE SAU XANH",
            address: "25 Nha Tho Street, Hoan Kiem",
            description:
              "Modern café reimagining nuoc sau with creative twists." ,
            price: "Price: 35,000 – 45,000 VND per glass.",
            image: "/assets/nuocsau/2.jpg",
            mapUrl: "https://maps.google.com/?q=25+Nh%C3%A0+Th%E1%BB%9D+Hanoi",
          },
          {
            id: "nuocsau-dongxuan",
            name: "DONG XUAN MARKET STALLS",
            address: "Dong Xuan Market, Hoan Kiem",
            description:
              "Street vendors near the market serve grab-and-go cups throughout the day." ,
            price: "Price: 10,000 – 20,000 VND per cup.",
            image: "/assets/nuocsau/3.webp",
            mapUrl: "https://maps.google.com/?q=%C4%90%E1%BB%93ng+Xu%C3%A2n+Market",
          },
        ],
      },
    ],
  },
};

const ensureLoopingYoutubeSrc = (src) => {
  if (!src) return src;
  if (/[?&]loop=1/.test(src)) return src;

  const [base, hash] = src.split("#");
  const match = base.match(/\/embed\/([^?]+)/);
  const videoId = match ? match[1] : "";
  const separator = base.includes("?") ? "&" : "?";
  let updated = `${base}${separator}loop=1`;

  if (videoId && !/[?&]playlist=/.test(base)) {
    updated += `&playlist=${videoId}`;
  }

  return `${updated}${hash ? `#${hash}` : ""}`;
};

function renderVideo(language, dish) {
  if (!dish.video) return null;
  if (dish.video.type === "youtube") {
    return (
      <iframe
        src={ensureLoopingYoutubeSrc(dish.video.src)}
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
      loop
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
    let isActive = true;

    const syncRemoteCounts = async () => {
      try {
        const { data, error } = await fetchClickEvents({ category: "drinks", limit: 1000 });
        if (error) {
          throw error;
        }
        const remoteCounts = aggregateEventCounts(data);
        if (!isActive || !remoteCounts || Object.keys(remoteCounts).length === 0) {
          return;
        }
        setClickStats((prev) => {
          const merged = { ...prev };
          Object.entries(remoteCounts).forEach(([id, count]) => {
            merged[id] = Math.max(merged[id] || 0, count);
          });
          return merged;
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("Unable to fetch remote click counts for drinks:", error.message);
        }
      }
    };

    syncRemoteCounts();

    return () => {
      isActive = false;
    };
  }, []);

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
                  <button
                    type="button"
                    className="foods-cta foods-cta--compact"
                    onClick={() => scrollToDetails(dish.id)}
                  >
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
                    <h3>
                      {language === "vi" && typeof spot.name === "string"
                        ? spot.name.toLocaleUpperCase("vi-VN")
                        : spot.name}
                    </h3>
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
