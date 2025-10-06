import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useAutoPlayVideos from "../hooks/useAutoPlayVideos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import "../styles/foods.css";
import { recordClickEvent } from "../utils/clickTracker.js";

const STORAGE_KEY = "foodie_map_snack_clicks";

export const SNACKS_COPY = {
  vi: {
    labels: {
      cta: "Thưởng thức ngay",
      mapButton: "Mở Google Maps",
      clicks: "Lượt xem",
      videoFallback:
        "Trình duyệt của bạn không hỗ trợ phát video. Vui lòng tải video trực tiếp.",
      detailsButton: "Review",
      whyTryTitle: "Tại sao bạn nên thử?",
    },
    dishes: [
      {
        id: "blackbean",
        hero: {
          eyebrow: "Ngọt lành giải nhiệt",
          title: "CHÈ ĐỖ ĐEN",
          description:
            "Chè đỗ đen là món giải khát quen thuộc của người Hà Nội. Đỗ đen được ngâm mềm rồi hầm chín nhưng vẫn còn hạt, nước chè trong veo và vị ngọt dịu từ đường phèn — người xưa tin rằng món ăn này giúp thanh nhiệt, giải độc và mang lại may mắn. Khi múc lên, hương lá nếp thoang thoảng cùng chút gừng khiến bát chè ấm mà vẫn nhẹ nhàng. Ly chè mát lạnh hòa quyện cùng nước cốt dừa béo nhẹ sẽ đánh thức mọi giác quan trong những chiều hè oi ả.",
          image: "/assets/doden/chedoden.png",
          imageAlt: "Cốc chè đỗ đen với đá bào và nước cốt dừa",
          cta: "Thưởng thức chè mát",
        },
        intro: {
          title: "VIDEO",
          body: "Cận cảnh từng công đoạn ngâm, ninh và hoàn thiện một cốc chè đỗ đen ngọt mát.",
        },
        video: {
          type: "local",
          src: "/assets/doden/doden.mp4",
          poster: "/assets/doden/chedoden.png",
          description: "Thước phim cận cảnh nấu chè đỗ đen với nước đường phèn trong veo.",
        },
        ingredientGallery: [
          {
            id: "blackbean-soak",
            src: "/assets/doden/hatdo.png",
            caption: "Đỗ đen được chọn kỹ, ngâm mềm trước khi ninh",
            alt: "Đỗ đen đã ngâm nước",
          },
          {
            id: "blackbean-broth",
            src: "/assets/doden/duongphen.png",
            caption: "Nước chè trong vắt, ngọt thanh nhờ đường phèn",
            alt: "Nồi nước chè đỗ đen",
          },
          {
            id: "blackbean-serve",
            src: "/assets/doden/cotdua.png",
            caption: "Chè đỗ đen ăn kèm đá bào, nước cốt dừa béo nhẹ",
            alt: "Ly chè đỗ đen hoàn chỉnh",
          },
        ],
        ingredientsTitle: "Nguyên liệu tạo nên vị mát",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Đỗ đen tuyển hạt đều, dẻo bùi." },
          { iconClass: "fa-solid fa-droplet", text: "Đường phèn cho vị ngọt thanh, dịu mát." },
          { iconClass: "fa-solid fa-leaf", text: "Lá nếp và gừng giúp thơm dịu và ấm bụng." },
          { iconClass: "fa-solid fa-ice-cream", text: "Đá bào mát lạnh, nước cốt dừa béo nhẹ." },
          {
            iconClass: "fa-solid fa-bowl-food",
            text: "Có thể thêm đậu xanh nghiền, trân châu hoặc dừa khô tùy thích.",
          },
        ],
        recipeTitle: "Cách nấu chè đỗ đen ngon",
        recipeSteps: [
          "Ngâm đỗ 6-8 giờ, rang sơ rồi ninh đến khi hạt mềm mà không vỡ.",
          "Nấu nước đường phèn với lá nếp, cho đỗ vào đun liu riu để thấm ngọt.",
          "Múc chè ra ly, thêm đá bào, nước cốt dừa và topping yêu thích rồi thưởng thức.",
        ],
        spotsTitle: "Địa chỉ chè đỗ đen nổi tiếng",
        spots: [
          {
            id: "blackbean-bathin",
            name: "CHÈ BÀ THÌN",
            address: "1B Hàng Bạc, Hoàn Kiếm",
            description:
              "Quán lâu đời với nước chè trong, vị ngọt dịu. Mở cửa 7:30 – 23:00.",
            price: "Giá 20.000 – 30.000đ/cốc.",
            image: "/assets/doden/hinh1.png",
            mapUrl: "https://maps.google.com/?q=1B+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "blackbean-doican",
            name: "CHÈ ĐỖ ĐEN ĐỘI CẤN",
            address: "325 Đội Cấn, Ba Đình",
            description:
              "Điểm bán chè nóng quen thuộc, được yêu thích vào những tối se lạnh.",
            price: "Giá 20.000 – 30.000đ/cốc.",
            image: "/assets/doden/hinh2.png",
            mapUrl: "https://maps.google.com/?q=325+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "blackbean-lanhuong",
            name: "CHÈ LAN HƯỜNG",
            address: "113A Đội Cấn, Ba Đình",
            description:
              "Quán gia đình với menu phong phú, chè đỗ đen vừa ngọt vừa bùi.",
            price: "Giá 15.000 – 30.000đ/cốc.",
            image: "/assets/doden/hinh3.png",
            mapUrl: "https://maps.google.com/?q=113A+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "longan-lotus",
        hero: {
          eyebrow: "Tinh hoa cung đình",
          title: "CHÈ SEN LONG NHÃN",
          description:
            "Hạt sen già được hầm mềm dẻo, khéo léo lồng vào từng quả nhãn tươi căng mọng, chan với nước đường phèn thơm dịu – món tráng miệng từng gắn với ẩm thực cung đình Hà Nội. Khi nhắm mắt lại, bạn sẽ cảm nhận sự thanh tao của sen, vị ngọt thơm của nhãn hòa quyện trên đầu lưỡi. Mỗi chén chè như lời mời gọi thư thái giữa mùa hè, để lòng dịu lại giữa nhịp sống hối hả.",
          image: "/assets/longnhan/longnhan.png",
          imageAlt: "Chè sen long nhãn trong bát sứ",
          cta: "Thưởng thức chè sen",
        },
        intro: {
          title: "VIDEO",
          body: "Quy trình tỉ mỉ từ lột nhãn, sấy hạt sen cho tới chan nước đường phèn trong vắt.",
        },
        video: {
          type: "local",
          src: "/assets/longnhan/longnhan.mp4",
          poster: "/assets/longnhan/longnhan.png",
          description: "Từng công đoạn nhồi hạt sen vào nhãn, chan nước đường phèn thanh mát.",
        },
        ingredientGallery: [
          {
            id: "longanlotus-lotus",
            src: "/assets/longnhan/hatsen.png",
            caption: "Hạt sen già, mềm dẻo sau khi ninh",
            alt: "Hạt sen đã hầm",
          },
          {
            id: "longanlotus-longan",
            src: "/assets/longnhan/nhan.png",
            caption: "Nhãn tươi được tách bỏ hạt, căng mọng",
            alt: "Nhãn đã bóc vỏ",
          },
          {
            id: "longanlotus-serve",
            src: "/assets/longnhan/batche.png",
            caption: "Chén chè sen long nhãn thanh tao",
            alt: "Bát chè sen long nhãn",
          },
        ],
        ingredientsTitle: "Nguyên liệu tinh tế",
        ingredientsList: [
          { iconClass: "fa-solid fa-seedling", text: "Hạt sen Bác Hồ già, dẻo thơm." },
          { iconClass: "fa-solid fa-apple-alt", text: "Nhãn lồng tươi căng mọng, ngọt thanh." },
          { iconClass: "fa-solid fa-droplet", text: "Đường phèn cho vị ngọt dịu và nước chè trong." },
          { iconClass: "fa-solid fa-leaf", text: "Thêm hoa nhài hoặc lá dứa để tạo hương nhẹ nhàng." },
          { iconClass: "fa-solid fa-bowl-food", text: "Đá bào hoặc thạch sen cho phiên bản mùa hè." },
        ],
        recipeTitle: "Cách nấu chè sen long nhãn",
        recipeSteps: [
          "Ninh hạt sen đến khi mềm mà vẫn nguyên hạt, để ráo.",
          "Tách nhãn bỏ hạt, nhồi hạt sen vào giữa từng quả.",
          "Nấu nước đường phèn, thả sen nhãn vào đun nhỏ lửa, dùng nóng hoặc lạnh đều ngon.",
        ],
        spotsTitle: "Địa chỉ chè sen long nhãn",
        spots: [
          {
            id: "longanlotus-4mua",
            name: "CHÈ 4 MÙA",
            address: "4 Hàng Cân, Hoàn Kiếm",
            description:
              "Mở cửa 10:00 – 24:00, chuyên chè cổ truyền với chè sen long nhãn nổi tiếng.",
            price: "Giá 20.000 – 30.000đ/cốc.",
            image: "/assets/longnhan/hinh1.png",
            mapUrl: "https://maps.google.com/?q=4+H%C3%A0ng+C%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "longanlotus-batdan",
            name: "CHÈ SEN LONG NHÃN",
            address: "1A Bát Đàn, Hoàn Kiếm",
            description:
              "Quán nhỏ nổi tiếng với chè sen nhãn lồng truyền thống.",
            price: "Giá 10.000 – 22.000đ/phần.",
            image: "/assets/longnhan/hinh2.png",
            mapUrl: "https://maps.google.com/?q=1A+B%C3%A1t+%C4%90%C3%A0n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "longanlotus-hangbac",
            name: "CHÈ HÀNG BẠC",
            address: "93 Hàng Bạc, Hoàn Kiếm",
            description:
              "Chè sen nhãn lồng chuẩn vị, nước trong và thơm hoa nhài.",
            price: "Khoảng 22.000đ/cốc.",
            image: "/assets/longnhan/hinh3.png",
            mapUrl: "https://maps.google.com/?q=93+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "com",
        hero: {
          eyebrow: "Hương cốm mùa thu",
          title: "CỐM HÀ NỘI",
          description:
            "Cốm xanh mềm dẻo, thơm hương lúa non là thức quà gắn với mùa thu Hà Nội. Từ cốm, người Hà Nội tạo nên bánh cốm, chè cốm, chả cốm hay xôi cốm – mỗi món đều lưu giữ ký ức và văn hóa kinh kỳ. Hương lá sen ôm trọn từng gói cốm khiến người ăn nhớ mãi nắng vàng và gió heo may. Chỉ một nắm cốm nhỏ cũng đủ gợi lại nhịp sống chậm rãi, tinh tế của đất Thăng Long.",
          image: "/assets/com/com.png",
          imageAlt: "Set cốm làng Vòng và các món chế biến từ cốm",
          cta: "Thưởng thức hương cốm",
        },
        intro: {
          title: "VIDEO",
          body: "Theo dõi hành trình từ lúa non tới những món cốm nổi tiếng của Hà Nội.",
        },
        video: {
          type: "local",
          src: "/assets/com/com.mp4",
          poster: "/assets/com/com.png",
          description: "Hành trình chế biến cốm thành nhiều món quà mùa thu Hà Nội.",
        },
        ingredientGallery: [
          {
            id: "com-fresh",
            src: "/assets/com/hatcom.png",
            caption: "Cốm làng Vòng dẻo thơm vừa rang",
            alt: "Hạt cốm xanh",
          },
          {
            id: "com-cake",
            src: "/assets/com/banhcom.png",
            caption: "Bánh cốm nhân đậu xanh béo ngậy",
            alt: "Bánh cốm Hà Nội",
          },
          {
            id: "com-cha",
            src: "/assets/com/chacom.png",
            caption: "Chả cốm vàng ruộm ăn kèm bún đậu",
            alt: "Chả cốm",
          },
        ],
        ingredientsTitle: "Những món ngon từ cốm",
        ingredientsList: [
          { iconClass: "fa-solid fa-leaf", text: "Cốm làng Vòng dẻo thơm – linh hồn mùa thu Hà Nội." },
          {
            iconClass: "fa-solid fa-cake-candles",
            text: "Bánh cốm nhân đậu xanh ngọt bùi, món quà cưới hỏi truyền thống.",
          },
          { iconClass: "fa-solid fa-bowl-food", text: "Chè cốm thanh mát, xôi cốm dẻo thơm." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Chả cốm chiên vàng giòn ăn kèm bún đậu mắm tôm." },
          { iconClass: "fa-solid fa-ice-cream", text: "Sữa chua cốm, kem cốm – biến tấu hiện đại hấp dẫn." },
        ],
        recipeTitle: "Cách thưởng thức cốm",
        recipeSteps: [
          "Chọn cốm tươi từ làng Vòng, gói trong lá sen để giữ hương.",
          "Biến tấu cốm thành bánh, chè, chả hoặc xôi tùy khẩu vị.",
          "Thưởng thức cùng trà sen hoặc trong những chiều thu se lạnh.",
        ],
        spotsTitle: "Địa chỉ mua cốm ngon",
        spots: [
          {
            id: "com-langvong",
            name: "CỐM LÀNG VÒNG",
            address: "Làng Vòng, Dịch Vọng, Cầu Giấy",
            description:
              "Cốm tươi mềm thơm lúa non, đóng gói trong lá sen.",
            price: "Giá 260.000 – 320.000đ/kg tùy mùa và số lượng.",
            image: "/assets/com/hinh1.png",
            mapUrl: "https://maps.google.com/?q=L%C3%A0ng+V%C3%B2ng+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "com-nguyenninh",
            name: "BÁNH CỐM NGUYÊN NINH",
            address: "11 Hàng Than, Ba Đình",
            description:
              "Bánh cốm trứ danh với nhân đậu xanh béo ngậy, thích hợp làm quà tặng.",
            price: "Giá 6.000 – 8.000đ/chiếc.",
            image: "/assets/com/hinh2.png",
            mapUrl: "https://maps.google.com/?q=11+H%C3%A0ng+Than+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "com-chenong",
            name: "CHÈ NGON 35 PHAN ĐÌNH PHÙNG",
            address: "35 Phan Đình Phùng, Ba Đình",
            description:
              "Chè cốm thanh mát, rất được ưa chuộng mùa thu.",
            price: "Giá 25.000 – 35.000đ/bát.",
            image: "/assets/com/hinh3.png",
            mapUrl: "https://maps.google.com/?q=35+Phan+%C4%90%C3%ACnh+Ph%C3%B9ng+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "cassava",
        hero: {
          eyebrow: "Ấm nồng mùa đông",
          title: "CHÈ SẮN NÓNG",
          description:
            "Khi gió mùa tràn về, người Hà Nội thường tìm đến bát chè sắn nóng vừa dẻo vừa thơm mùi gừng. Sắn được gọt vỏ, cắt miếng, ninh trong nước đường vàng cùng gừng tươi tạo nên vị ngọt ấm và mùi hương khó quên. Hơi khói bốc lên làm ấm đôi bàn tay, mùi gừng lan tỏa khiến lòng nhẹ nhõm. Một miếng sắn mềm tan kèm nước cốt dừa béo nhẹ đủ xua đi cái lạnh đầu đông.",
          image: "/assets/chesan/chesan.png",
          imageAlt: "Bát chè sắn nóng với gừng",
          cta: "Thưởng thức chè nóng",
        },
        intro: {
          title: "GỢI Ý THƯỞNG THỨC",
          body: "Thưởng thức chè sắn nóng cùng gừng thơm, đường vàng và bột sắn dây cho ngày se lạnh.",
        },
        ingredientGallery: [
          {
            id: "cassava-root",
            src: "/assets/chesan/cusan.png",
            caption: "Củ sắn gọt sạch, cắt miếng vừa ăn",
            alt: "Củ sắn tươi",
          },
          {
            id: "cassava-pot",
            src: "/assets/chesan/nuocduonggung.png",
            caption: "Sắn ninh với nước đường và gừng",
            alt: "Nồi chè sắn đang sôi",
          },
          {
            id: "cassava-serve",
            src: "/assets/chesan/hinh3.png",
            caption: "Bát chè sắn nóng hổi, thơm vị gừng",
            alt: "Chè sắn nóng",
          },
        ],
        ingredientsTitle: "Nguyên liệu ấm nóng",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Sắn tươi gọt sạch, cắt miếng vừa ăn." },
          { iconClass: "fa-solid fa-droplet", text: "Đường vàng hoặc đường nâu tạo màu đẹp, vị đậm đà." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Gừng tươi thái sợi cho mùi thơm và vị ấm." },
          { iconClass: "fa-solid fa-bowl-food", text: "Bột sắn dây pha loãng giúp nước chè hơi sánh." },
          { iconClass: "fa-solid fa-ice-cream", text: "Dừa khô, lạc rang hoặc vừng rang để rắc lên mặt." },
        ],
        recipeTitle: "Cách nấu chè sắn nóng",
        recipeSteps: [
          "Ngâm sắn đã gọt vỏ trong nước muối loãng rồi cắt miếng vừa ăn.",
          "Nấu sắn với nước, đường vàng và gừng đến khi mềm dẻo.",
          "Pha bột sắn dây với nước lạnh, đổ vào nồi tạo độ sánh; ăn nóng và rắc thêm dừa khô nếu thích.",
        ],
        spotsTitle: "Địa chỉ chè sắn nên thử",
        spots: [
          {
            id: "cassava-bachmai",
            name: "BÁNH TRÔI TÀU & CHÈ SẮN",
            address: "54 Bạch Mai, Hai Bà Trưng",
            description:
              "Quán quen thuộc buổi chiều tối, mở cửa 14:00 – 22:00. Chè sắn nóng, thơm gừng.",
            price: "Giá 20.000 – 30.000đ/bát.",
            image: "/assets/chesan/hinh1.png",
            mapUrl: "https://maps.google.com/?q=54+B%E1%BA%A1ch+Mai+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cassava-lyquocsu",
            name: "CHÈ SẮN 39 LÝ QUỐC SƯ",
            address: "39 Lý Quốc Sư, Hoàn Kiếm",
            description:
              "Quán chuyên chè nóng, món chè sắn dẻo thơm, nước chè sánh và đậm mùi gừng.",
            price: "Giá 15.000 – 25.000đ/bát.",
            image: "/assets/chesan/hinh2.png",
            mapUrl: "https://maps.google.com/?q=39+L%C3%BD+Qu%E1%BB%91c+S%C6%B0+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cassava-tranxuansoan",
            name: "ẨM THỰC BA MIỀN",
            address: "75 Trần Xuân Soạn, Hai Bà Trưng",
            description:
              "Địa điểm được yêu thích trong danh sách street food mùa đông với chè sắn nóng.",
            price: "Giá 15.000 – 25.000đ/bát.",
            image: "/assets/chesan/hinh3.png",
            mapUrl: "https://maps.google.com/?q=75+Tr%E1%BA%A7n+Xu%C3%A2n+So%E1%BA%A1n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "pomelo",
        hero: {
          eyebrow: "Thơm bùi cốt dừa",
          title: "CHÈ BƯỞI",
          description:
            "Chè bưởi nổi tiếng nhờ phần cùi bưởi được sơ chế kỹ để loại bỏ vị đắng, áo bột rồi nấu cùng đậu xanh, đường và nước cốt dừa. Mỗi miếng cùi bưởi giòn dai, thấm nước chè béo thơm. Khi thêm một chút vừng rang hay lạc giã, món chè trở nên tròn vị hơn bao giờ hết. Từ quầy chè vỉa hè đến quán lâu năm, hương bưởi thoang thoảng luôn níu chân người thưởng thức.",
          image: "/assets/chebuoi/chebuoi.png",
          imageAlt: "Chè bưởi với đậu xanh và cốt dừa",
          cta: "Ăn chè bưởi",
        },
        intro: {
          title: "VIDEO",
          body: "Quá trình sơ chế cùi bưởi, áo bột và nấu chè bưởi dẻo giòn.",
        },
        video: {
          type: "local",
          src: "/assets/chebuoi/chebuoi.mp4",
          poster: "/assets/chebuoi/chebuoi.png",
          description: "Từng bước sơ chế cùi bưởi, nấu đậu xanh và chan nước cốt dừa béo thơm.",
        },
        ingredientGallery: [
          {
            id: "pomelo-peel",
            src: "/assets/chebuoi/cuibuoi.png",
            caption: "Cùi bưởi được ngâm muối để hết đắng",
            alt: "Cùi bưởi",
          },
          {
            id: "pomelo-pot",
            src: "/assets/chebuoi/dauxanh.png",
            caption: "Đậu xanh và cùi bưởi áo bột nấu chung",
            alt: "Nồi chè bưởi",
          },
          {
            id: "pomelo-serve",
            src: "/assets/chebuoi/hinh3.png",
            caption: "Chè bưởi chan nước cốt dừa",
            alt: "Bát chè bưởi",
          },
        ],
        ingredientsTitle: "Nguyên liệu chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-lemon", text: "Cùi bưởi được sơ chế kỹ để hết đắng." },
          { iconClass: "fa-solid fa-seedling", text: "Đậu xanh cà vỏ nấu mềm bùi." },
          { iconClass: "fa-solid fa-droplet", text: "Đường và nước cốt dừa tạo vị ngọt béo." },
          { iconClass: "fa-solid fa-bowl-food", text: "Bột năng giúp chè sánh nhẹ." },
          { iconClass: "fa-solid fa-ice-cream", text: "Dừa khô, lạc rang rắc lên mặt cho giòn bùi." },
        ],
        recipeTitle: "Cách nấu chè bưởi",
        recipeSteps: [
          "Cùi bưởi cắt hạt lựu, bóp muối nhiều lần rồi rửa sạch, áo bột năng.",
          "Nấu đậu xanh đến khi chín mềm, cho cùi bưởi và đường vào đun nhẹ đến khi trong sánh.",
          "Chan nước cốt dừa, ăn nóng hoặc lạnh tùy thích; rắc thêm dừa khô/lạc rang.",
        ],
        spotsTitle: "Địa chỉ chè bưởi",
        spots: [
          {
            id: "pomelo-bathin",
            name: "CHÈ BÀ THÌN",
            address: "1B Hàng Bạc, Hoàn Kiếm",
            description:
              "Nổi tiếng với các món chè truyền thống, chè bưởi béo thơm.",
            price: "Giá 20.000 – 30.000đ/cốc.",
            image: "/assets/chebuoi/hinh1.png",
            mapUrl: "https://maps.google.com/?q=1B+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "pomelo-thegiao",
            name: "CHÈ SẦU THỂ GIAO",
            address: "12A Thể Giao, Hai Bà Trưng",
            description:
              "Menu đa dạng, nổi bật với chè bưởi thơm cốt dừa.",
            price: "Giá khoảng 25.000 – 40.000đ/phần.",
            image: "/assets/chebuoi/hinh2.png",
            mapUrl: "https://maps.google.com/?q=12A+Th%E1%BB%83+Giao+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "pomelo-tudinh",
            name: "CHÈ BƯỞI TƯ ĐỈNH",
            address: "114 Nguyễn Tuân, Thanh Xuân",
            description:
              "Địa chỉ quen thuộc của tín đồ chè bưởi.",
            price: "Giá 15.000 – 25.000đ/phần.",
            image: "/assets/chebuoi/hinh3.png",
            mapUrl: "https://maps.google.com/?q=114+Nguy%E1%BB%85n+Tu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },

      {
        id: "banh-gio",
        hero: {
          eyebrow: "Quà chiều truyền thống",
          title: "BÁNH GIÒ HÀ NỘI",
          description:
            "Nhắc tới các món quà Hà Nội, bánh giò bình dị mà khó cưỡng. Bánh được gói kín trong lá chuối, mở ra tỏa mùi thơm dịu. Lớp bột mềm mỏng ôm lấy nhân thịt băm, mộc nhĩ và gia vị truyền thống, hình chóp đặc trưng gợi nhớ ký ức của nhiều thế hệ người Hà Nội. Không chỉ là món quà vặt, bánh giò còn là hương vị ký ức, đậm chất ẩm thực Thủ đô.",
          image: "/assets/banhgio/banhgio.jpg",
          imageAlt: "Bánh giò Hà Nội nóng hổi",
          cta: "Thưởng thức bánh giò",
        },
        intro: {
          title: "HƯƠNG VỊ ẨM THỰC",
          body: "Bánh giò nóng hổi, mềm mịn với nhân thịt mộc nhĩ và gia vị truyền thống, thích hợp cho bữa sáng hoặc quà chiều.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/rzN5IBXcf7Q?autoplay=1&mute=1&rel=0",
          description: "Ngắm từng lớp bột mềm, phần nhân thịt mộc nhĩ và cách gói bánh giò hình chóp.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Thành phần làm nên chiếc bánh",
        ingredientsList: [
          { iconClass: "fa-solid fa-leaf", text: "Lá chuối tươi gói kín, giữ hơi nóng và hương thơm." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Bột gạo và bột năng trộn đều cho lớp vỏ mềm mịn." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Nhân thịt heo băm, mộc nhĩ, hành khô và gia vị vừa miệng." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Tiêu, nước mắm, nước dùng xương tạo vị đậm đà." },
          { iconClass: "fa-solid fa-bread-slice", text: "Ăn kèm dưa góp, chả quế hoặc xúc xích để tăng độ tròn vị." },
        ],
        recipeTitle: "Thưởng thức tròn vị",
        recipeSteps: [
          "Làm nhân thịt băm xào mộc nhĩ, nêm vừa vị và để nguội.",
          "Khuấy bột với nước xương, nấu tới khi sánh mịn rồi múc vào lá chuối, thêm nhân và gói hình chóp.",
          "Hấp bánh 15-20 phút, dùng nóng cùng dưa góp, chả quế hoặc xúc xích theo sở thích.",
        ],
        spotsTitle: "Địa chỉ bánh giò nên thử",
        spots: [
          {
            id: "banhgio-hangthan",
            name: "BÁNH GIÒ DỐC HÀNG THAN",
            address: "Dốc Hàng Than, Nguyễn Trung Trực, Ba Đình, Hà Nội",
            description:
              "Gần Lăng Bác, quán nhỏ lâu năm nổi tiếng vị chuẩn; chỉ mở vài giờ mỗi ngày và luôn đông khách.",
            price: "Giá: 15.000 – 35.000đ/chiếc.",
            image: "/assets/banhgio/1.jpg",
            mapUrl: "https://maps.google.com/?q=D%E1%BB%91c+H%C3%A0ng+Than+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhgio-kimlien",
            name: "BÁNH GIÒ KIM LIÊN",
            address: "Ki-ốt 21 Lương Định Của, quận Đống Đa, Hà Nội",
            description:
              "Hơn 10 năm phục vụ, bánh giò mềm mại ăn kèm dưa góp, chả bò, xúc xích và cốm dẹp tùy chọn.",
            price: "Giá: 10.000 – 40.000đ/suất.",
            image: "/assets/banhgio/2.png",
            mapUrl: "https://maps.google.com/?q=21+L%C6%B0%C6%A1ng+%C4%90%E1%BB%8Bnh+C%E1%BB%A7a+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhgio-thuykhue",
            name: "BÁNH GIÒ CÔ BÉO",
            address: "3 Thụy Khuê, quận Tây Hồ, Hà Nội",
            description:
              "Bánh giò chuẩn vị, topping đầy đặn với chả, xúc xích và dưa góp; hương vị khó quên của người địa phương.",
            price: "Giá: 12.000 – 30.000đ/suất.",
            image: "/assets/banhgio/3.png",
            mapUrl: "https://maps.google.com/?q=3+Th%E1%BB%A5y+Khu%C3%AA+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },

      {
        id: "banh-ran",
        hero: {
          eyebrow: "Góc quà chiều",
          title: "BÁNH RÁN HÀ NỘI",
          description:
            "Bánh rán Hà Nội là món quà vặt gắn với ký ức cư dân phố cổ. Vỏ bánh làm từ bột nếp chiên vàng ruộm, bên trong có thể là nhân mặn với thịt băm, mộc nhĩ, miến hoặc nhân ngọt đậu xanh bùi béo. Khi ăn kèm nước chấm pha từ nước mắm, tỏi, ớt, giấm, vị giòn – dẻo – đậm đà hòa quyện hoàn hảo. Những chiều thu se lạnh, ghé xe bánh rán đang chiên nóng, nghe tiếng dầu xèo xèo và chia sẻ chiếc bánh nóng hổi cùng bạn bè là trải nghiệm thân thuộc của người Hà Nội.",
          image: "/assets/banhran/banhran.webp",
          imageAlt: "Đĩa bánh rán nóng hổi với nước chấm",
          cta: "Thưởng thức bánh rán",
        },
        intro: {
          title: "VIDEO",
          body: "Ngắm nhìn từng lớp bột nếp chiên phồng và nhân bánh rán mặn ngọt phong phú.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/525ekCPnKgM?autoplay=1&mute=1&rel=0",
          poster: "/assets/banhran/banhran.webp",
          description: "Quy trình nặn bánh, chiên giòn và pha nước chấm đặc trưng Hà Nội.",
        },
        ingredientGallery: [
          {
            id: "banhran-dough",
            src: "/assets/banhran/vo-banh.png",
            caption: "Bột nếp vo viên, phủ mè sẵn sàng chiên",
            alt: "Viên bột bánh rán",
          },
          {
            id: "banhran-filling",
            src: "/assets/banhran/nhan-banh.png",
            caption: "Nhân mặn gồm thịt băm, mộc nhĩ, miến và hạt tiêu",
            alt: "Nhân bánh rán mặn",
          },
          {
            id: "banhran-fry",
            src: "/assets/banhran/chien-banh.png",
            caption: "Bánh rán chiên vàng ruộm trong chảo dầu",
            alt: "Chiên bánh rán",
          },
        ],
        ingredientsTitle: "Hương vị làm nên sức hút",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bột nếp, bột gạo nặn vỏ dày vừa, chiên giòn bên ngoài, mềm bên trong." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Nhân mặn gồm thịt heo băm, mộc nhĩ, miến, hành khô." },
          { iconClass: "fa-solid fa-seedling", text: "Phiên bản ngọt với đậu xanh nghiền, dừa nạo, mè rang." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước chấm pha tỏi, ớt, giấm, đường tạo vị mặn ngọt hài hoà." },
          { iconClass: "fa-solid fa-people-group", text: "Thưởng thức nóng cùng bạn bè trong những buổi chiều quây quần." },
        ],
        recipeTitle: "Cách thưởng thức tròn vị",
        recipeSteps: [
          "Nhào bột nếp với nước ấm, vo viên và bọc nhân mặn hoặc ngọt theo sở thích.",
          "Chiên bánh trong dầu nóng vừa tới khi vàng giòn, đảo liên tục để bánh nở đều.",
          "Pha nước chấm chua ngọt, ăn bánh khi còn nóng để cảm nhận độ giòn dẻo.",
        ],
        spotsTitle: "Điểm bán bánh rán nổi tiếng",
        spots: [
          {
            id: "banhran-gia-trinh",
            name: "BÁNH RÁN GIA TRỊNH",
            address: "Ngõ 16A Lý Nam Đế, Hoàn Kiếm",
            description:
              "Điểm hẹn của học sinh, sinh viên với cả bánh rán ngọt và mặn; nổi tiếng bánh rán lúc lắc phủ mè.",
            price: "Giá: ~3.000đ/chiếc. Mở cửa: 7:00 – 21:00.",
            image: "/assets/banhran/1.png",
            mapUrl: "https://maps.google.com/?q=16A+L%C3%BD+Nam+%C4%90%E1%BA%BF+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhran-dinh-liet",
            name: "BÁNH RÁN ĐINH LIỆT",
            address: "16 Đinh Liệt, Hoàn Kiếm",
            description:
              "Nổi tiếng với bánh rán nhân mặn vỏ dày, dẻo dai, ăn kèm nước chấm cân bằng vị mặn – chua – ngọt.",
            price: "Giá: 4.000 – 10.000đ/chiếc. Mở cửa: 14:00 – 21:00.",
            image: "/assets/banhran/2.png",
            mapUrl: "https://maps.google.com/?q=16+%C4%90inh+Li%E1%BB%87t+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhran-hai-xe",
            name: "BÁNH RÁN HẢI XỆ",
            address: "5 Lương Ngọc Quyến, Hoàn Kiếm",
            description:
              "Quầy bánh rán gia truyền tại phố cổ; bánh được phục vụ nóng hổi với nhân mặn thơm tiêu, nhân ngọt đậu xanh mè rang.",
            price: "Giá: 2.000 – 5.000đ/chiếc. Mở cửa: 15:00 – 19:00.",
            image: "/assets/banhran/3.png",
            mapUrl: "https://maps.google.com/?q=5+L%C6%B0%C6%A1ng+Ng%E1%BB%8Dc+Quy%E1%BA%BFn+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "roti-thai",
        hero: {
          eyebrow: "Hương vị Thái Lan",
          title: "BÁNH KẾP THÁI",
          description:
            "Bánh kếp Thái (Roti Thái) là món ăn đường phố nổi tiếng với lớp vỏ bột mì mỏng chiên vàng giòn, bên trong là chuối, trứng, sô-cô-la hoặc sữa đặc. Khi ăn cảm nhận rõ độ giòn bên ngoài, mềm thơm bên trong, vị ngọt béo quyện cùng hương bơ hấp dẫn.",
          image: null,
          imageAlt: "Bánh kếp Thái cuộn nhân chuối trứng",
          cta: "Thưởng thức bánh kếp",
        },
        intro: {
          title: "VIDEO",
          body: "Chiêm ngưỡng cách tráng bột, thêm nhân và gấp bánh kếp Thái hấp dẫn.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/1ypov8-t_Kk?autoplay=1&mute=1&rel=0",
          description: "Quy trình làm roti Thái với nhân chuối trứng và topping ngọt béo.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Thành phần hấp dẫn",
        ingredientsList: [
          { iconClass: "fa-solid fa-bread-slice", text: "Bột mì cán mỏng chiên vàng giòn." },
          { iconClass: "fa-solid fa-egg", text: "Trứng gà tạo độ mềm ẩm cho phần nhân." },
          { iconClass: "fa-solid fa-banana", text: "Chuối chín vàng cho vị ngọt thơm tự nhiên." },
          { iconClass: "fa-solid fa-ice-cream", text: "Sữa đặc, sô-cô-la, mật ong tùy chọn." },
          { iconClass: "fa-solid fa-fire", text: "Chiên trên chảo bơ nóng cho hương thơm quyến rũ." },
        ],
        recipeTitle: "Cách cuốn bánh ngon",
        recipeSteps: [
          "Nhào bột với bơ và trứng, nghỉ bột rồi cán mỏng trên chảo nóng.",
          "Thêm chuối thái lát, trứng hoặc topping yêu thích vào giữa, gập bốn cạnh tạo hình vuông.",
          "Chiên vàng giòn hai mặt, cắt miếng và rưới sữa đặc hoặc sô-cô-la khi còn nóng.",
        ],
        spotsTitle: "Địa chỉ bánh kếp Thái ở Hà Nội",
        spots: [
          {
            id: "roti-ta-hien",
            name: "ROTI THÁI LAN",
            address: "24 Tạ Hiện, Hoàn Kiếm",
            description:
              "Xe bánh kếp nổi tiếng phố cổ với phiên bản chuối trứng truyền thống, luôn nóng và giòn.",
            price: "Giá: 25.000 – 40.000đ/chiếc.",
            image: null,
            mapUrl: "https://maps.google.com/?q=24+T%E1%BA%A1+Hi%E1%BB%87n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "roti-house",
            name: "ROTI HOUSE",
            address: "22 Nguyễn Hữu Huân, Hoàn Kiếm",
            description:
              "Cửa hàng nhỏ phục vụ nhiều loại nhân phong phú, thêm topping trái cây và sô-cô-la hấp dẫn.",
            price: "Giá: 25.000 – 40.000đ/chiếc.",
            image: null,
            mapUrl: "https://maps.google.com/?q=22+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "banh-xeo",
        hero: {
          eyebrow: "Giòn rụm mùi nghệ",
          title: "BÁNH XÈO HÀ NỘI",
          description:
            "Bánh xèo Hà Nội vàng giòn, thơm mùi nghệ, nhân tôm thịt nóng hổi cuốn cùng rau sống tươi mát. Giữa tiết trời se lạnh, vị giòn rụm, béo nhẹ và nước mắm chua ngọt đậm đà khiến ai thưởng thức cũng khó quên.",
          image: null,
          imageAlt: "Đĩa bánh xèo vàng giòn với rau sống",
          cta: "Thưởng thức bánh xèo",
        },
        intro: {
          title: "VIDEO",
          body: "Xem cách đổ bánh xèo vàng giòn và cuốn cùng rau sống, nước chấm đậm đà.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/Bs-VttCSeC4?autoplay=1&mute=1&rel=0",
          description: "Đổ bánh xèo giòn rụm, nhân tôm thịt đầy đặn và cách pha nước chấm chuẩn vị Hà Nội.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bột gạo pha cùng bột nghệ cho lớp vỏ vàng giòn." },
          { iconClass: "fa-solid fa-shrimp", text: "Tôm tươi, thịt heo thái mỏng làm nhân ngọt." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, xà lách, rau thơm ăn kèm." },
          { iconClass: "fa-solid fa-carrot", text: "Đồ chua cà rốt, đu đủ thái sợi tạo vị cân bằng." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước mắm chua ngọt pha tỏi ớt, giấm bỗng." },
        ],
        recipeTitle: "Thưởng thức đúng điệu",
        recipeSteps: [
          "Pha bột với nước cốt dừa hoặc nước lọc, thêm bột nghệ, hành lá.",
          "Đổ bột lên chảo nóng, thêm nhân tôm thịt, giá đỗ rồi gập đôi khi vỏ giòn.",
          "Cuốn bánh với rau sống và chấm nước mắm chua ngọt ngay khi còn nóng giòn.",
        ],
        spotsTitle: "Quán bánh xèo nổi bật",
        spots: [
          {
            id: "banhxeo-zon",
            name: "BÁNH XÈO ZÒN PANCAKE",
            address: "25 Tô Ngọc Vân, Tây Hồ",
            description:
              "Không gian sạch sẽ, phục vụ phong cách miền Trung với vỏ bánh giòn, nhân đầy đặn, được nhiều du khách yêu thích.",
            price: "Giá: 30.000 – 90.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=25+T%C3%B4+Ng%E1%BB%8Dc+V%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhxeo-loanbeo",
            name: "BÁNH XÈO LOAN BÉO",
            address: "142B Đội Cấn, Ba Đình",
            description:
              "Bánh xèo miền Trung đậm đà, giòn rụm, nhân tôm thịt tươi ngon, nước chấm vừa miệng.",
            price: "Giá: 40.000 – 60.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=142B+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhxeo-mrbay",
            name: "BÁNH XÈO MR. BẢY MIỀN TÂY",
            address: "74 Cầu Đất, Hoàn Kiếm",
            description:
              "Quán được Michelin Guide 2024 vinh danh với bánh xèo kiểu miền Tây, vỏ giòn, nhân đầy và nước chấm pha khéo.",
            price: "Giá: 65.000 – 85.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=74+C%E1%BA%A7u+%C4%90%E1%BA%A5t+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
    ],
  },
  en: {
    labels: {
      cta: "Taste now",
      mapButton: "Open Google Maps",
      clicks: "Clicks",
      videoFallback:
        "Your browser does not support the video tag. Please download the file to watch.",
      detailsButton: "Review",
      whyTryTitle: "Why you should try it?",
    },
    dishes: [
      {
        id: "blackbean",
        hero: {
          eyebrow: "Cooling refreshment",
          title: "BLACK BEAN DESSERT",
          description:
            "Tender black beans in a crystal-clear rock-sugar broth—Hanoi’s beloved sweet soup once enjoyed for its cooling properties. A gentle hint of pandan and ginger warms the senses before the ice brings instant refreshment. Spoonful after spoonful, the creamy beans and light syrup soothe summer afternoons and nostalgic hearts alike.",
          image: "/assets/doden/chedoden.png",
          imageAlt: "Vietnamese black bean dessert with shaved ice",
          cta: "Discover the dessert",
        },
        intro: {
          title: "VIDEO",
          body: "Watch the soaking, simmering, and finishing touches of this chilled classic.",
        },
        video: {
          type: "local",
          src: "/assets/doden/doden.mp4",
          poster: "/assets/doden/chedoden.png",
          description: "Witness every simmering step of this chilled Hanoi classic.",
        },
        ingredientGallery: [
          {
            id: "blackbean-soak",
            src: "/assets/doden/hatdo.png",
            caption: "Black beans soaked thoroughly before slow cooking",
            alt: "Black beans soaking in a bowl",
          },
          {
            id: "blackbean-broth",
            src: "/assets/doden/duongphen.png",
            caption: "Crystal-clear syrup lightly sweetened with rock sugar",
            alt: "Pot of black bean dessert syrup",
          },
          {
            id: "blackbean-serve",
            src: "/assets/doden/cotdua.png",
            caption: "Served with shaved ice and a touch of coconut cream",
            alt: "Finished black bean dessert cup",
          },
        ],
        ingredientsTitle: "Essential ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Premium black beans that stay creamy yet intact." },
          { iconClass: "fa-solid fa-droplet", text: "Rock sugar keeps the sweetness light and refreshing." },
          { iconClass: "fa-solid fa-leaf", text: "Pandan leaves and ginger perfume the syrup." },
          { iconClass: "fa-solid fa-ice-cream", text: "Shaved ice and coconut cream for contrast." },
          {
            iconClass: "fa-solid fa-bowl-food",
            text: "Optional toppings like mung bean paste, tapioca pearls, or toasted coconut.",
          },
        ],
        recipeTitle: "How to prepare it",
        recipeSteps: [
          "Soak beans 6–8 hours, toast briefly, then simmer until tender yet whole.",
          "Cook a rock sugar syrup with pandan; let the beans absorb the sweetness.",
          "Serve with shaved ice, coconut cream, and your favourite toppings.",
        ],
        spotsTitle: "Where to find the best black bean dessert",
        spots: [
          {
            id: "blackbean-bathin",
            name: "CHE BA THIN",
            address: "1B Hang Bac, Hoan Kiem, Hanoi",
            description:
              "Long-standing shop with crystal-clear syrup. Open 7:30 am – 11:00 pm.",
            price: "Price: 20,000 – 30,000 VND.",
            image: "/assets/doden/hinh1.png",
            mapUrl: "https://maps.google.com/?q=1B+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "blackbean-doican",
            name: "CHE DOI CAN",
            address: "325 Doi Can, Ba Dinh, Hanoi",
            description:
              "Cozy stall serving hot black bean dessert on chilly evenings.",
            price: "Price: 20,000 – 30,000 VND.",
            image: "/assets/doden/hinh2.png",
            mapUrl: "https://maps.google.com/?q=325+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "blackbean-lanhuong",
            name: "CHE LAN HUONG",
            address: "113A Doi Can, Ba Dinh, Hanoi",
            description:
              "Family-run shop offering balanced, comforting black bean dessert.",
            price: "Price: 15,000 – 30,000 VND.",
            image: "/assets/doden/hinh3.png",
            mapUrl: "https://maps.google.com/?q=113A+%C4%90%E1%BB%99i+C%E1%BA%A5n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "longan-lotus",
        hero: {
          eyebrow: "Regal refinement",
          title: "LONGAN LOTUS SEED SOUP",
          description:
            "Lotus seeds simmered tender and tucked inside juicy longan fruit, finished with fragrant rock-sugar syrup—a royal dessert turned Hanoi favourite. The floral aroma drifts upward before the first sip, hinting at the gentle sweetness to come. Each bite glides across the palate, calming the senses and inviting a slow, mindful moment.",
          image: "/assets/longnhan/longnhan.png",
          imageAlt: "Longan and lotus seed dessert in porcelain bowl",
          cta: "Savor the delicacy",
        },
        intro: {
          title: "VIDEO",
          body: "See how lotus seeds and longan come together to create this refined Hanoi treat.",
        },
        video: {
          type: "local",
          src: "/assets/longnhan/longnhan.mp4",
          poster: "/assets/longnhan/longnhan.png",
          description: "Hand-stuffing lotus seeds into longan before bathing them in fragrant syrup.",
        },
        ingredientGallery: [
          {
            id: "longanlotus-lotus",
            src: "/assets/longnhan/hatsen.png",
            caption: "Lotus seeds simmered until tender",
            alt: "Cooked lotus seeds",
          },
          {
            id: "longanlotus-longan",
            src: "/assets/longnhan/nhan.png",
            caption: "Seedless longan fruit ready for stuffing",
            alt: "Longan fruit without seeds",
          },
          {
            id: "longanlotus-serve",
            src: "/assets/longnhan/batche.png",
            caption: "Elegant bowl of longan-lotus sweet soup",
            alt: "Longan-lotus dessert",
          },
        ],
        ingredientsTitle: "Essential ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-seedling", text: "Creamy lotus seeds that hold their shape." },
          { iconClass: "fa-solid fa-apple-alt", text: "Juicy longan fruit for natural sweetness." },
          { iconClass: "fa-solid fa-droplet", text: "Rock sugar syrup keeps the dessert light and fragrant." },
          { iconClass: "fa-solid fa-leaf", text: "Optional jasmine or pandan leaves for aroma." },
          { iconClass: "fa-solid fa-bowl-food", text: "Shaved ice or lotus jelly for summertime versions." },
        ],
        recipeTitle: "How to craft it",
        recipeSteps: [
          "Simmer lotus seeds until tender but intact; drain well.",
          "Peel longan, tuck a lotus seed into each shell.",
          "Cook in rock sugar syrup and serve warm or chilled.",
        ],
        spotsTitle: "Where to try it",
        spots: [
          {
            id: "longanlotus-4mua",
            name: "CHE 4 MUA",
            address: "4 Hang Can, Hoan Kiem, Hanoi",
            description:
              "Traditional sweet-soup stall open 10 am – midnight.",
            price: "Price: 20,000 – 30,000 VND.",
            image: "/assets/longnhan/hinh1.png",
            mapUrl: "https://maps.google.com/?q=4+H%C3%A0ng+C%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "longanlotus-batdan",
            name: "CHE SEN LONG NHAN",
            address: "1A Bat Dan, Hoan Kiem, Hanoi",
            description:
              "Beloved for stuffed longan with creamy lotus seeds.",
            price: "Price: 10,000 – 22,000 VND.",
            image: "/assets/longnhan/hinh2.png",
            mapUrl: "https://maps.google.com/?q=1A+B%C3%A1t+%C4%90%C3%A0n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "longanlotus-hangbac",
            name: "CHE HANG BAC",
            address: "93 Hang Bac, Hoan Kiem, Hanoi",
            description:
              "Classic longan-lotus dessert with floral fragrance.",
            price: "About 22,000 VND per cup.",
            image: "/assets/longnhan/hinh3.png",
            mapUrl: "https://maps.google.com/?q=93+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "com",
        hero: {
          eyebrow: "Autumn signature",
          title: "HANOI GREEN RICE",
          description:
            "Young rice flakes from Vong Village inspire treats such as banh com, che com, cha com, and xoi com—each capturing the nostalgia of Hanoi autumn. Lotus leaves cradle the grains, locking in the scent of dew-kissed paddies. A single handful evokes breezy afternoons, golden sunlight, and the elegant rhythm of the capital.",
          image: "/assets/com/com.png",
          imageAlt: "Green rice treats from Hanoi",
          cta: "Celebrate green rice",
        },
        intro: {
          title: "VIDEO",
          body: "See how green rice is transformed into iconic Hanoi delicacies.",
        },
        video: {
          type: "local",
          src: "/assets/com/com.mp4",
          poster: "/assets/com/com.png",
          description: "From fragrant young rice to cakes, sweet soups, and patties.",
        },
        ingredientGallery: [
          {
            id: "com-fresh",
            src: "/assets/com/hatcom.png",
            caption: "Freshly toasted Vong Village green rice flakes",
            alt: "Fresh green rice flakes",
          },
          {
            id: "com-cake",
            src: "/assets/com/banhcom.png",
            caption: "Sticky rice cakes filled with mung bean paste",
            alt: "Hanoi banh com",
          },
          {
            id: "com-cha",
            src: "/assets/com/chacom.png",
            caption: "Golden pork patties studded with young rice",
            alt: "Cha com patties",
          },
        ],
        ingredientsTitle: "Flavours born from green rice",
        ingredientsList: [
          { iconClass: "fa-solid fa-leaf", text: "Fresh Vong Village green rice—the essence of Hanoi autumn." },
          { iconClass: "fa-solid fa-cake-candles", text: "Banh com with mung bean filling, a classic wedding gift." },
          { iconClass: "fa-solid fa-bowl-food", text: "Che com and xoi com for gentle breakfasts and desserts." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Cha com patties served with bun dau mam tom." },
          { iconClass: "fa-solid fa-ice-cream", text: "Modern twists like green rice yogurt and ice cream." },
        ],
        recipeTitle: "How locals enjoy it",
        recipeSteps: [
          "Wrap fresh green rice in lotus leaves to preserve its aroma.",
          "Transform it into cakes, sweet soups, patties, or sticky rice.",
          "Pair with lotus tea or savour on a breezy autumn afternoon.",
        ],
        spotsTitle: "Where to buy authentic green rice",
        spots: [
          {
            id: "com-langvong",
            name: "VONG VILLAGE GREEN RICE",
            address: "Vong Village, Dich Vong, Cau Giay, Hanoi",
            description:
              "Fresh green rice packed in lotus leaves straight from Vong Village farmers.",
            price: "Price: 260,000 – 320,000 VND/kg depending on quantity.",
            image: "/assets/com/hinh1.png",
            mapUrl: "https://maps.google.com/?q=L%C3%A0ng+V%C3%B2ng+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "com-nguyenninh",
            name: "BANH COM NGUYEN NINH",
            address: "11 Hang Than, Ba Dinh, Hanoi",
            description:
              "Heritage shop selling banh com with creamy mung bean filling.",
            price: "Price: 6,000 – 8,000 VND per piece.",
            image: "/assets/com/hinh2.png",
            mapUrl: "https://maps.google.com/?q=11+H%C3%A0ng+Than+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "com-chenong",
            name: "CHE NGON 35 PHAN DINH PHUNG",
            address: "35 Phan Dinh Phung, Ba Dinh, Hanoi",
            description:
              "Popular for refreshing che com during the Mid-Autumn Festival.",
            price: "Price: 25,000 – 35,000 VND/bowl.",
            image: "/assets/com/hinh3.png",
            mapUrl: "https://maps.google.com/?q=35+Phan+%C4%90%C3%ACnh+Ph%C3%B9ng+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "cassava",
        hero: {
          eyebrow: "Winter comfort",
          title: "HOT CASSAVA SWEET SOUP",
          description:
            "Cassava chunks simmered in golden ginger syrup yield chewy pieces soaked in gentle sweetness—the perfect Hanoi winter warmer. Wisps of steam warm cold hands while ginger aromas comfort the soul. Each bite of buttery cassava with creamy coconut milk melts away the evening chill.",
          image: "/assets/chesan/chesan.png",
          imageAlt: "Bowl of hot cassava dessert",
          cta: "Warm up now",
        },
        intro: {
          title: "SERVING TIPS",
          body: "Enjoy this cassava dessert piping hot with ginger syrup and golden sugar for chilly evenings.",
        },
        ingredientGallery: [
          {
            id: "cassava-root",
            src: "/assets/chesan/cusan.png",
            caption: "Peeled cassava cut into bite-sized pieces",
            alt: "Fresh cassava",
          },
          {
            id: "cassava-pot",
            src: "/assets/chesan/nuocduonggung.png",
            caption: "Cassava simmered with ginger syrup",
            alt: "Pot of hot cassava dessert",
          },
          {
            id: "cassava-serve",
            src: "/assets/chesan/hinh3.png",
            caption: "Steaming bowl of cassava dessert",
            alt: "Hot cassava dessert",
          },
        ],
        ingredientsTitle: "Essential ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Fresh cassava cut into hearty chunks." },
          { iconClass: "fa-solid fa-droplet", text: "Brown sugar syrup for depth and colour." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Fresh ginger strips keep the dessert aromatic." },
          { iconClass: "fa-solid fa-bowl-food", text: "Tapioca starch thickens the broth slightly." },
          { iconClass: "fa-solid fa-ice-cream", text: "Toasted coconut or peanuts for garnish." },
        ],
        recipeTitle: "How to cook it",
        recipeSteps: [
          "Peel and soak cassava, then cut into bite-sized pieces.",
          "Simmer cassava with water, brown sugar, and ginger until tender.",
          "Stir in diluted tapioca starch for light thickness; serve hot with toppings.",
        ],
        spotsTitle: "Where to enjoy hot cassava",
        spots: [
          {
            id: "cassava-bachmai",
            name: "BANH TROI TAU & CHE SAN",
            address: "54 Bach Mai, Hai Ba Trung, Hanoi",
            description:
              "Popular afternoon-evening stall (2 pm – 10 pm) serving warming cassava dessert.",
            price: "Price: 20,000 – 30,000 VND.",
            image: "/assets/chesan/hinh1.png",
            mapUrl: "https://maps.google.com/?q=54+B%E1%BA%A1ch+Mai+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cassava-lyquocsu",
            name: "CHE SAN 39 LY QUOC SU",
            address: "39 Ly Quoc Su, Hoan Kiem, Hanoi",
            description:
              "Known for chewy cassava and ginger-forward syrup.",
            price: "Price: 15,000 – 25,000 VND.",
            image: "/assets/chesan/hinh2.png",
            mapUrl: "https://maps.google.com/?q=39+L%C3%BD+Qu%E1%BB%91c+S%C6%B0+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "cassava-tranxuansoan",
            name: "AM THUC BA MIEN",
            address: "75 Tran Xuan Soan, Hai Ba Trung, Hanoi",
            description:
              "Featured in winter street-food lists for comforting cassava dessert.",
            price: "Price: 15,000 – 25,000 VND.",
            image: "/assets/chesan/hinh3.png",
            mapUrl: "https://maps.google.com/?q=75+Tr%E1%BA%A7n+Xu%C3%A2n+So%E1%BA%A1n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "pomelo",
        hero: {
          eyebrow: "Coconut-fragrant delight",
          title: "POMELO PUDDING",
          description:
            "Pomelo rind is carefully prepared to remove bitterness, then cooked with mung beans, sugar, and coconut milk to create a chewy, coconut-scented pudding. A sprinkle of toasted sesame or peanuts amplifies the nutty finish. From sidewalk carts to time-honoured dessert shops, its citrus perfume keeps guests coming back for more.",
          image: "/assets/chebuoi/chebuoi.png",
          imageAlt: "Pomelo pudding with coconut milk",
          cta: "Try pomelo pudding",
        },
        intro: {
          title: "VIDEO",
          body: "See how pomelo rind is transformed into a chewy, coconut-rich dessert.",
        },
        video: {
          type: "local",
          src: "/assets/chebuoi/chebuoi.mp4",
          poster: "/assets/chebuoi/chebuoi.png",
          description: "See how pomelo rind and mung beans become a coconut-scented dessert.",
        },
        ingredientGallery: [
          {
            id: "pomelo-peel",
            src: "/assets/chebuoi/cuibuoi.png",
            caption: "Pomelo rind massaged with salt to remove bitterness",
            alt: "Pomelo rind",
          },
          {
            id: "pomelo-pot",
            src: "/assets/chebuoi/dauxanh.png",
            caption: "Pomelo rind cooking with mung beans",
            alt: "Pot of pomelo dessert",
          },
          {
            id: "pomelo-serve",
            src: "/assets/chebuoi/hinh3.png",
            caption: "Pomelo dessert topped with coconut milk",
            alt: "Pomelo pudding",
          },
        ],
        ingredientsTitle: "Essential ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-lemon", text: "Pomelo rind carefully prepared to stay chewy." },
          { iconClass: "fa-solid fa-seedling", text: "Mung beans add creaminess." },
          { iconClass: "fa-solid fa-droplet", text: "Sugar and coconut milk deliver sweetness and aroma." },
          { iconClass: "fa-solid fa-bowl-food", text: "Tapioca starch thickens the pudding." },
          { iconClass: "fa-solid fa-ice-cream", text: "Toasted coconut or peanuts for garnish." },
        ],
        recipeTitle: "How to cook it",
        recipeSteps: [
          "Dice pomelo rind, massage with salt repeatedly, rinse, and coat with tapioca starch.",
          "Cook mung beans until soft, add pomelo and sugar, simmer until glossy.",
          "Finish with coconut milk; serve warm or chilled with toasted coconut or peanuts.",
        ],
        spotsTitle: "Where to try pomelo pudding",
        spots: [
          {
            id: "pomelo-bathin",
            name: "CHE BA THIN",
            address: "1B Hang Bac, Hoan Kiem, Hanoi",
            description:
              "Iconic sweet-soup shop serving rich coconut pomelo pudding.",
            price: "Price: 20,000 – 30,000 VND.",
            image: "/assets/chebuoi/hinh1.png",
            mapUrl: "https://maps.google.com/?q=1B+H%C3%A0ng+B%E1%BA%A1c+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "pomelo-thegiao",
            name: "CHE SAU THE GIAO",
            address: "12A The Giao, Hai Ba Trung, Hanoi",
            description:
              "Known for coconut-rich pomelo pudding.",
            price: "Price: about 25,000 – 40,000 VND.",
            image: "/assets/chebuoi/hinh2.png",
            mapUrl: "https://maps.google.com/?q=12A+Th%E1%BB%83+Giao+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "pomelo-tudinh",
            name: "CHE BUOI TU DINH",
            address: "114 Nguyen Tuan, Thanh Xuan, Hanoi",
            description:
              "Favourite spot for chewy pomelo pudding.",
            price: "Price: 15,000 – 25,000 VND.",
            image: "/assets/chebuoi/hinh3.png",
            mapUrl: "https://maps.google.com/?q=114+Nguy%E1%BB%85n+Tu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },

      {
        id: "banh-gio",
        hero: {
          eyebrow: "Hanoi heritage",
          title: "BANH GIO",
          description:
            "When it comes to Hanoi’s specialties, banh gio—a pyramid-shaped rice dumpling—stands out as a humble yet irresistible treat. Wrapped neatly in banana leaves, it releases a gentle aroma once unwrapped. Silky rice batter cradles a savoury filling of minced pork, wood ear mushrooms, and warming spices. Its distinctive pyramid shape evokes generations of nostalgia, making every bite a taste of tradition and a symbol of Hanoi’s culinary heritage.",
          image: "/assets/banhgio/banhgio.jpg",
          imageAlt: "Steaming Hanoi banh gio",
          cta: "Enjoy banh gio",
        },
        intro: {
          title: "FLAVOUR NOTES",
          body: "Fresh from the steamer, banh gio delivers soft rice batter and a comforting savoury core—perfect for breakfast or an afternoon snack.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/rzN5IBXcf7Q?autoplay=1&mute=1&rel=0",
          description: "See the silky batter, savoury filling, and pyramid wrapping that define Hanoi banh gio.",
        },
        ingredientGallery: [],
        ingredientsTitle: "What goes inside",
        ingredientsList: [
          { iconClass: "fa-solid fa-leaf", text: "Banana leaves keep the dumpling fragrant and warm." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Rice and tapioca flours create a silky wrapper." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Minced pork, wood-ear mushrooms, and shallots for the savoury filling." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Fish sauce, pepper, and bone broth for depth." },
          { iconClass: "fa-solid fa-bread-slice", text: "Serve with pickles, Vietnamese ham, or sausage for extra texture." },
        ],
        recipeTitle: "How locals enjoy it",
        recipeSteps: [
          "Stir-fry minced pork with mushrooms and aromatics; set aside to cool.",
          "Cook rice batter with savoury broth until velvety, spoon into banana leaves, add filling, and fold into pyramids.",
          "Steam for 15–20 minutes and serve hot with pickled vegetables, ham, or sausage.",
        ],
        spotsTitle: "Where to buy banh gio",
        spots: [
          {
            id: "banhgio-hangthan",
            name: "BANH GIO HANG THAN SLOPE",
            address: "Hang Than slope, Nguyen Trung Truc Ward, Ba Dinh District, Hanoi",
            description:
              "A tiny decades-old stall near the Ho Chi Minh Mausoleum—opens for only a few hours and draws loyal regulars.",
            price: "Price: 15,000 – 35,000 VND each.",
            image: "/assets/banhgio/1.jpg",
            mapUrl: "https://maps.google.com/?q=D%E1%BB%91c+H%C3%A0ng+Than+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhgio-kimlien",
            name: "BANH GIO KIM LIEN",
            address: "Kiosk 21 Luong Dinh Cua, Dong Da District, Hanoi",
            description:
              "Over a decade in business, offering customisable plates with pickles, beef sausage, pork sausage, and green rice patties.",
            price: "Price: 10,000 – 40,000 VND per serving.",
            image: "/assets/banhgio/2.png",
            mapUrl: "https://maps.google.com/?q=21+L%C6%B0%C6%A1ng+%C4%90%E1%BB%8Bnh+C%E1%BB%A7a+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "banhgio-thuykhue",
            name: "BANH GIO CO BEO",
            address: "3 Thuy Khue Street, Tay Ho District, Hanoi",
            description:
              "Local favourite pairing flavourful dumplings with sausage, pickles, and other toppings for a hearty bite.",
            price: "Price: 12,000 – 30,000 VND per portion.",
            image: "/assets/banhgio/3.png",
            mapUrl: "https://maps.google.com/?q=3+Th%E1%BB%A5y+Khu%C3%AA+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },

      {
        id: "banh-ran",
        hero: {
          eyebrow: "Afternoon treat",
          title: "HANOI FRIED RICE CAKES",
          description:
            "Hanoi’s banh ran—sesame-studded fried rice cakes—capture the nostalgia of Old Quarter afternoons. Glutinous rice dough fries to a golden shell that stays crisp outside and chewy within. Fillings span savoury minced pork with wood-ear mushrooms and glass noodles to sweet mung bean paste scented with coconut. Dip each hot cake into a tangy-sweet sauce of fish sauce, garlic, chili, and vinegar for perfect balance. Sharing them fresh from the fryer is a beloved Hanoi ritual.",
          image: "/assets/banhran/banhran.webp",
          imageAlt: "Plate of Hanoi fried rice cakes with dipping sauce",
          cta: "Enjoy banh ran",
        },
        intro: {
          title: "VIDEO",
          body: "See how glutinous dough puffs into crisp, chewy rice cakes.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/525ekCPnKgM?autoplay=1&mute=1&rel=0",
          poster: "/assets/banhran/banhran.webp",
          description: "Shaping, frying, and plating Hanoi’s favourite fried rice cakes.",
        },
        ingredientGallery: [
          {
            id: "banhran-dough",
            src: "/assets/banhran/vo-banh.png",
            caption: "Glutinous dough balls coated in sesame",
            alt: "Uncooked banh ran dough",
          },
          {
            id: "banhran-filling",
            src: "/assets/banhran/nhan-banh.png",
            caption: "Savory filling of minced pork, wood-ear mushrooms, and glass noodles",
            alt: "Savory banh ran filling",
          },
          {
            id: "banhran-fry",
            src: "/assets/banhran/chien-banh.png",
            caption: "Rice cakes frying until crisp and golden",
            alt: "Frying banh ran",
          },
        ],
        ingredientsTitle: "What makes it irresistible",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Glutinous dough that fries crisp outside and stays chewy inside." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Savory minced pork, mushroom, and noodle filling." },
          { iconClass: "fa-solid fa-seedling", text: "Sweet mung bean, coconut, and sesame variation." },
          { iconClass: "fa-solid fa-mug-hot", text: "Fish sauce dip brightened with garlic, chili, sugar, and vinegar." },
          { iconClass: "fa-solid fa-people-group", text: "Best shared hot with friends in the late afternoon." },
        ],
        recipeTitle: "How to enjoy it",
        recipeSteps: [
          "Wrap glutinous dough around sweet or savoury fillings and shape into balls.",
          "Fry in medium-hot oil until puffed and evenly golden, turning constantly.",
          "Serve immediately with a tangy-sweet dipping sauce while still piping hot.",
        ],
        spotsTitle: "Where to buy banh ran",
        spots: [
          {
            id: "banhran-gia-trinh",
            name: "BANH RAN GIA TRINH",
            address: "Alley 16A Ly Nam De, Hoan Kiem",
            description:
              "Student favourite offering both sweet and savoury cakes plus bite-sized ‘shaking’ sesame balls.",
            price: "Price: about 3,000 VND each. Hours: 7:00 – 21:00.",
            image: "/assets/banhran/1.png",
            mapUrl: "https://maps.google.com/?q=16A+L%C3%BD+Nam+%C4%90%E1%BA%BF+Hanoi",
          },
          {
            id: "banhran-dinh-liet",
            name: "BANH RAN DINH LIET",
            address: "16 Dinh Liet, Hoan Kiem",
            description:
              "Celebrated for savoury cakes with thicker, chewier shells and a balanced dipping sauce.",
            price: "Price: 4,000 – 10,000 VND each. Hours: 14:00 – 21:00.",
            image: "/assets/banhran/2.png",
            mapUrl: "https://maps.google.com/?q=16+%C4%90inh+Li%E1%BB%87t+Hanoi",
          },
          {
            id: "banhran-hai-xe",
            name: "BANH RAN HAI XE",
            address: "5 Luong Ngoc Quyen, Hoan Kiem",
            description:
              "Long-running Old Quarter stall serving piping-hot cakes with peppery savoury filling and sesame-coated sweet versions.",
            price: "Price: 2,000 – 5,000 VND each. Hours: 15:00 – 19:00.",
            image: "/assets/banhran/3.png",
            mapUrl: "https://maps.google.com/?q=5+L%C6%B0%C6%A1ng+Ng%E1%BB%8Dc+Quy%E1%BA%BFn+Hanoi",
          },
        ],
      },
      {
        id: "roti-thai",
        hero: {
          eyebrow: "Thai street flavors",
          title: "THAI PANCAKE (ROTI)",
          description:
            "Thai roti is a beloved street food made from paper-thin dough fried until crisp, folded around fillings like banana, egg, chocolate, or condensed milk. Each bite combines buttery aroma, crisp edges, and a soft, sweet center.",
          image: null,
          imageAlt: "Thai roti folded with banana and egg filling",
          cta: "Grab a roti",
        },
        intro: {
          title: "VIDEO",
          body: "Watch street vendors stretch, flip, and tuck sizzling Thai pancakes.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/1ypov8-t_Kk?autoplay=1&mute=1&rel=0",
          description: "Making banana-egg Thai roti with buttery crisp layers and sweet toppings.",
        },
        ingredientGallery: [],
        ingredientsTitle: "What goes inside",
        ingredientsList: [
          { iconClass: "fa-solid fa-bread-slice", text: "Elastic wheat dough fried until golden." },
          { iconClass: "fa-solid fa-egg", text: "Eggs keep the center soft and custardy." },
          { iconClass: "fa-solid fa-banana", text: "Ripe bananas for natural sweetness." },
          { iconClass: "fa-solid fa-ice-cream", text: "Condensed milk, chocolate, or honey drizzles." },
          { iconClass: "fa-solid fa-fire", text: "Hot griddle and butter for irresistible aroma." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Rest the dough, then stretch it thin over a buttered griddle.",
          "Add banana slices, egg, or chosen fillings to the center and fold the corners.",
          "Fry until both sides are crisp, slice, and drizzle with condensed milk while hot.",
        ],
        spotsTitle: "Where to try it in Hanoi",
        spots: [
          {
            id: "roti-ta-hien",
            name: "THAI ROTI CART",
            address: "24 Ta Hien, Hoan Kiem",
            description:
              "Old Quarter cart famous for classic banana-egg roti made to order and served piping hot.",
            price: "Price: 25,000 – 40,000 VND per piece.",
            image: null,
            mapUrl: "https://maps.google.com/?q=24+T%E1%BA%A1+Hi%E1%BB%87n+Hanoi",
          },
          {
            id: "roti-house",
            name: "ROTI HOUSE",
            address: "22 Nguyen Huu Huan, Hoan Kiem",
            description:
              "Cosy shop offering creative fillings and toppings for Thai pancakes to suit every sweet tooth.",
            price: "Price: 25,000 – 40,000 VND per piece.",
            image: null,
            mapUrl: "https://maps.google.com/?q=22+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+Hanoi",
          },
        ],
      },
      {
        id: "banh-xeo",
        hero: {
          eyebrow: "Crisp and aromatic",
          title: "HANOI BANH XEO",
          description:
            "Hanoi’s take on banh xeo features turmeric-tinted crepes fried until shatteringly crisp, stuffed with sizzling shrimp and pork, and wrapped with fresh herbs. Dip in tangy fish sauce for a comforting contrast of textures and flavors.",
          image: null,
          imageAlt: "Vietnamese banh xeo with herbs and dipping sauce",
          cta: "Crunch into banh xeo",
        },
        intro: {
          title: "VIDEO",
          body: "See how sizzling batter becomes crackly crepes ready to wrap with herbs.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/Bs-VttCSeC4?autoplay=1&mute=1&rel=0",
          description: "Pouring turmeric batter, frying shrimp-and-pork fillings, and assembling Hanoi-style banh xeo.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Signature components",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Rice flour batter tinted with turmeric for a golden crunch." },
          { iconClass: "fa-solid fa-shrimp", text: "Plump shrimp and sliced pork for savoury sweetness." },
          { iconClass: "fa-solid fa-leaf", text: "Fresh lettuce and herbs to wrap each bite." },
          { iconClass: "fa-solid fa-carrot", text: "Pickled carrot and green papaya to balance richness." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nuoc cham dipping sauce spiked with garlic, chili, and lime." },
        ],
        recipeTitle: "How locals eat it",
        recipeSteps: [
          "Whisk batter with coconut milk or water, turmeric, and scallions.",
          "Ladle onto a hot skillet, add shrimp, pork, and bean sprouts, then fold once crisp.",
          "Wrap pieces in herbs and lettuce, dip generously in nuoc cham, and enjoy immediately.",
        ],
        spotsTitle: "Popular banh xeo stops",
        spots: [
          {
            id: "banhxeo-zon",
            name: "BANH XEO ZON PANCAKE",
            address: "25 To Ngoc Van, Tay Ho",
            description:
              "Bright, traveller-friendly eatery serving Central-style banh xeo with generous fillings and artful plating.",
            price: "Price: 30,000 – 90,000 VND per serving.",
            image: null,
            mapUrl: "https://maps.google.com/?q=25+T%C3%B4+Ng%E1%BB%8Dc+V%C3%A2n+Hanoi",
          },
          {
            id: "banhxeo-loanbeo",
            name: "BANH XEO LOAN BEO",
            address: "142B Doi Can, Ba Dinh",
            description:
              "Classic Central Vietnamese-style crepes with crisp shells, juicy fillings, and balanced dipping sauce.",
            price: "Price: 40,000 – 60,000 VND per serving.",
            image: null,
            mapUrl: "https://maps.google.com/?q=142B+%C4%90%E1%BB%99i+C%E1%BA%A5n+Hanoi",
          },
          {
            id: "banhxeo-mrbay",
            name: "BANH XEO MR. BAY MIEN TAY",
            address: "74 Cau Dat, Hoan Kiem",
            description:
              "Bib Gourmand-listed spot famed for Mekong-style banh xeo with airy shells and flavour-packed nuoc cham.",
            price: "Price: 65,000 – 85,000 VND per serving.",
            image: null,
            mapUrl: "https://maps.google.com/?q=74+C%E1%BA%A7u+%C4%90%E1%BA%A5t+Hanoi",
          },
        ],
      },
    ],
  },
};

export default function Snacks() {
  const { language } = useLanguage();
  const content = useMemo(() => SNACKS_COPY[language], [language]);
  const { dishes, labels } = content;
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

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clickStats));
    } catch (error) {
      // bỏ qua lỗi lưu trữ
    }
  }, [clickStats]);

  useAutoPlayVideos();

  const handleMapClick = (spot) => () => {
    setClickStats((prev) => ({
      ...prev,
      [spot.id]: (prev[spot.id] || 0) + 1,
    }));
    recordClickEvent({
      category: "snacks",
      id: spot.id,
      name: spot.name,
      mapUrl: spot.mapUrl,
    });
    window.open(spot.mapUrl, "_blank", "noopener,noreferrer");
  };

  const renderVideo = (dish) => {
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
        {labels.videoFallback}
      </video>
    );
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
                    className="foods-cta"
                    onClick={() => {
                      const target = document.getElementById(`${dish.id}-details`);
                      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <i className="fa-solid fa-arrow-down" />&nbsp;
                    {dish.hero.cta || labels.cta}
                  </button>
                )}
              </div>
              <div className="foods-hero__visual" data-reveal data-reveal-direction="right">
                {dish.hero.image ? (
                  <img src={dish.hero.image} alt={dish.hero.imageAlt || dish.hero.title} loading="lazy" />
                ) : (
                  <div className="foods-hero__visualPlaceholder" aria-hidden="true">
                    <i className="fa-solid fa-bowl-food" />
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
                  {renderVideo(dish)}
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
                        to={`/spot/snacks/${spot.id}`}
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
