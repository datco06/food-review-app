import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useAutoPlayVideos from "../hooks/useAutoPlayVideos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import "../styles/foods.css";
import { recordClickEvent } from "../utils/clickTracker.js";

export const FOODS_COPY = {
  vi: {
    labels: {
      cta: "Khám phá ngay",
      mapButton: "Mở Google Maps",
      clicks: "Lượt xem",
      videoFallback: "Trình duyệt của bạn không hỗ trợ phát video. Vui lòng tải video trực tiếp.",
      detailsButton: "Review",
      whyTryTitle: "Tại sao bạn nên thử?",
    },
    dishes: [
      {
        id: "pho",
        hero: {
          eyebrow: "Tinh hoa quốc hồn",
          title: "PHỞ HÀ NỘI",
          description:
            "Phở Hà Nội là món ăn nổi tiếng nhất của Việt Nam. Bánh phở mềm, thịt bò hoặc gà và nước dùng trong, đậm đà được hầm hàng giờ với xương, hành, gừng cùng các loại gia vị. Điều làm phở Hà Nội đặc biệt là vị thanh mà vẫn sâu, ăn kèm rau thơm, chanh và ớt. Với người dân Hà Nội, phở là một phần của đời sống; bát phở nóng ở quán nhỏ vỉa hè chính là trải nghiệm chân thật nhất. Mỗi muỗng nước dùng là sự kết tinh của quế, hồi, thảo quả được canh lửa tỉ mỉ suốt đêm. Hơi nóng nghi ngút quyện cùng mùi thơm đặc trưng khiến bạn chỉ muốn thưởng thức thêm một bát nữa.",
          image: "/assets/pho/pho-feature.png",
          imageAlt: "Bát phở Hà Nội nóng hổi",
          cta: "Khám phá phở Hà Nội",
        },
        intro: {
          title: "VIDEO",
          body: "Video giới thiệu phở – món ăn mang đậm bản sắc Việt Nam",
        },
        video: {
          type: "local",
          src: "/assets/pho/pho-video.mp4",
          poster: "/assets/pho/pho-feature.png",
        },
        ingredientGallery: [
          {
            id: "pho-broth",
            src: "/assets/pho/nuocdung.png",
            caption: {
              vi: "Nồi nước dùng trong vắt hầm từ xương bò và gia vị thơm",
              en: "Crystal-clear broth simmered from beef bones and aromatics",
            },
            alt: {
              vi: "Nồi nước dùng phở đang nghi ngút khói",
              en: "Simmering pho broth pot",
            },
          },
          {
            id: "pho-noodles",
            src: "/assets/pho/banhpho.png",
            caption: {
              vi: "Bánh phở tươi trắng mềm được tráng thủ công từng lớp",
              en: "Fresh rice noodles hand-crafted to stay silky and springy",
            },
            alt: {
              vi: "Bánh phở mềm mịn chuẩn bị cho bát phở",
              en: "Soft pho noodles ready for serving",
            },
          },
          {
            id: "pho-beef",
            src: "/assets/pho/thibo.png",
            caption: {
              vi: "Thịt bò thăn thái lát mỏng để giữ độ mềm ngọt",
              en: "Thinly sliced tenderloin that keeps every bite juicy",
            },
            alt: {
              vi: "Thịt bò thái lát dùng cho phở tái",
              en: "Thin beef slices prepared for rare pho",
            },
          },
        ],
        ingredientsTitle: "NGUYÊN LIỆU CHỌN LỌC",
        ingredientsList: [
          {
            iconClass: "fa-solid fa-bone",
            text: "Xương bò, xương heo hầm nhiều giờ tạo nên nước dùng ngọt thanh.",
          },
          {
            iconClass: "fa-solid fa-bowl-food",
            text: "Thịt bò thăn, gầu, nạm hay gân được thái mỏng chuẩn vị.",
          },
          {
            iconClass: "fa-solid fa-seedling",
            text: "Gia vị nướng thơm gồm gừng, hành, hoa hồi, quế và thảo quả.",
          },
          {
            iconClass: "fa-solid fa-utensils",
            text: "Bánh phở tươi mềm nhưng vẫn giữ độ dai vừa phải.",
          },
          {
            iconClass: "fa-solid fa-bread-slice",
            text: "Rau thơm, chanh, ớt và quẩy vàng giòn giúp bát phở tròn vị.",
          },
        ],
        recipeTitle: "Bí quyết khẩu vị chuẩn Hà Nội",
        recipeSteps: [
          "Hầm xương tối thiểu 8 giờ để nước dùng trong và đậm đà.",
          "Chuẩn bị thịt, thái lát mỏng hoặc làm chín vừa tới để giữ độ mềm.",
          "Tráng bánh phở, xếp thịt, chan nước dùng nghi ngút và dọn kèm rau thơm, chanh, ớt và quẩy giòn.",
        ],
        spotsTitle: "Địa điểm thưởng thức phở Hà Nội",
        spots: [
          {
            id: "pho-batdan",
            name: "PHỞ BÁT ĐÀN",
            address: "49 Bát Đàn, quận Hoàn Kiếm, Hà Nội",
            description:
              "Phở Bát Đàn gắn liền với phố cổ nhờ nước dùng trong veo, thịt bò mềm và truyền thống xếp hàng, tự phục vụ để giữ đúng hương vị xưa.",
            image: "/assets/pho/pho-batdan.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+B%C3%A1t+%C4%90%C3%A0n",
          },
          {
            id: "pho-thin",
            name: "PHỞ THÌN LÒ ĐÚC",
            address: "13 Lò Đúc, quận Hai Bà Trưng, Hà Nội",
            description:
              "Quán nổi tiếng với bí quyết xào nhanh thịt bò trên lửa lớn trước khi chan nước dùng, tạo nên vị béo ngậy khác biệt.",
            image: "/assets/pho/pho-thin.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+Th%C3%ACn+L%C3%B2+%C4%90%C3%BAc",
          },
          {
            id: "pho-lyquocsu",
            name: "PHỞ 10 LÝ QUỐC SƯ",
            address: "10 Lý Quốc Sư, phường Hàng Trống, quận Hoàn Kiếm, Hà Nội",
            description:
              "Nằm gần Nhà thờ Lớn, quán phục vụ cả phở bò lẫn phở gà với hương vị ổn định, thu hút đông đảo du khách.",
            image: "/assets/pho/pho-lyquocsu.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+10+L%C3%BD+Qu%E1%BB%91c+S%C6%B2",
      },
        ],
      },



      {
        id: "nemnuong",
        hero: {
          eyebrow: "Central delight",
          title: "NHA TRANG GRILLED PORK SAUSAGE",
          description:
            "Nem nuong from Nha Trang features finely pounded pork grilled over charcoal until smoky and lightly crisp. Wrap the hot skewers with rice paper, herbs, pickles, and creamy peanut sauce for a sweet-savory harmony beloved across Vietnam.",
          image: null,
          imageAlt: "Nha Trang nem nuong with rice paper and herbs",
          cta: "Roll your own nem nuong",
        },
        intro: {
          title: "VIDEO",
          body: "See how nem nuong is shaped, grilled, and wrapped with fresh greens.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/NVzRMbREV_c?autoplay=1&mute=1&rel=0",
          description: "Skewering, grilling, and serving the iconic Nha Trang specialty with peanut dipping sauce.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Signature components",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Minced pork blended with fat, garlic, and aromatics." },
          { iconClass: "fa-solid fa-fire", text: "Charcoal heat caramelises the surface while keeping the center juicy." },
          { iconClass: "fa-solid fa-leaf", text: "Fresh herbs, lettuce, and green mango for crunch and brightness." },
          { iconClass: "fa-solid fa-bread-slice", text: "Soft rice paper to bundle every ingredient." },
          { iconClass: "fa-solid fa-bowl-food", text: "Peanut-based dipping sauce with sweet-savoury depth." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Grill pork skewers over charcoal, turning until evenly golden and aromatic.",
          "Layer rice paper with herbs, pickles, and steaming nem nuong straight from the grill.",
          "Roll tightly, dip in peanut sauce, and enjoy the harmony of textures.",
        ],
        spotsTitle: "Where to try it in Hanoi",
        spots: [
          {
            id: "nemnuong-vukhanh",
            name: "NEM NUONG NHA TRANG VU KHANH",
            address: "90 Tran Hung Dao, Hoan Kiem",
            description:
              "Spacious venue serving fragrant skewers with generous herb platters and rich dipping sauce.",
            price: "Price: 50,000 – 80,000 VND per set.",
            image: null,
            mapUrl: "https://maps.google.com/?q=90+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Hanoi",
          },
          {
            id: "nemnuong-hangbong",
            name: "NEM NUONG NHA TRANG",
            address: "39 Hang Bong, Hoan Kiem",
            description:
              "Old Quarter favourite where rolls are assembled tableside and served piping hot.",
            price: "Price: 50,000 – 80,000 VND per set.",
            image: null,
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+B%C3%B4ng+Hanoi",
          },
          {
            id: "nemnuong-hanh",
            name: "NEM NUONG NHA TRANG HANH",
            address: "23 Nguyen Thai Hoc, Ba Dinh",
            description:
              "Beloved by locals for juicy skewers, creamy sauce, and quick, friendly service.",
            price: "Price: 50,000 – 80,000 VND per set.",
            image: null,
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+Hanoi",
          },
        ],
      },
      {
        id: "lau-cua-dong",
        hero: {
          eyebrow: "Countryside warmth",
          title: "NORTHERN CRAB HOTPOT",
          description:
            "Lau cua dong captures the soul of northern countryside cooking with a sweet field-crab broth, buttery crab roe, and a gentle tang from fermented rice vinegar. On chilly Hanoi evenings, gathering around a steaming pot with friends is the epitome of comfort.",
          image: null,
          imageAlt: "Steaming pot of Vietnamese field crab hotpot",
          cta: "Gather for crab hotpot",
        },
        intro: {
          title: "VIDEO",
          body: "A bubbling crab broth with vibrant toppings ready to be dipped and shared.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Key ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-crab", text: "Fresh field crab pounded and strained for naturally sweet broth." },
          { iconClass: "fa-solid fa-bowl-food", text: "Golden crab roe enriching both colour and flavour." },
          { iconClass: "fa-solid fa-mug-hot", text: "Fermented rice vinegar, tomatoes, and shrimp paste for subtle tang." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Beef, pork, tofu, and Vietnamese ham for hearty dipping." },
          { iconClass: "fa-solid fa-leaf", text: "Seasonal greens—water spinach, morning glory, banana blossom—for freshness." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Simmer crab broth with tomatoes and fermented rice vinegar until the roe floats on top.",
          "Arrange meats, tofu, and fresh greens on platters for communal dipping.",
          "Add toppings to the bubbling pot, ladle into bowls with rice vermicelli, and enjoy while hot.",
        ],
        spotsTitle: "Crab hotpot spots in Hanoi",
        spots: [
          {
            id: "laucua-685",
            name: "LAU CUA DONG 685",
            address: "685 Lac Long Quan, Tay Ho",
            description:
              "Cosy restaurant with northern decor, sweet crab broth, rich roe, and generous accompaniments.",
            price: "Price: 250,000 – 400,000 VND per pot.",
            image: null,
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-songha",
            name: "SONG HA CRAB HOTPOT",
            address: "685 Lac Long Quan, Tay Ho",
            description:
              "Authentic northern-style crab hotpot with a light, savoury broth and abundant meats and greens.",
            price: "Price: 150,000 – 300,000 VND per person.",
            image: null,
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-chinhbeo",
            name: "CHINH BEO CRAB HOTPOT",
            address: "Block 20A, Van Phu Urban Area, Ha Dong",
            description:
              "Popular casual spot known for fresh ingredients, bold broth, and compact pots perfect for sharing.",
            price: "Price: 220,000 – 350,000 VND per pot.",
            image: null,
            mapUrl: "https://maps.google.com/?q=Khu+%C4%91%E1%BB%8Bnh+c%C6%B0+V%C4%83n+Ph%C3%BA+Hanoi",
          },
        ],
      },
      {
        id: "buncha",
        hero: {
          eyebrow: "Hương vị vỉa hè",
          title: "BÚN CHẢ HÀ NỘI",
          description:
            "Bún chả là biểu tượng thân thuộc của ẩm thực Hà Nội. Bún trắng mềm, thịt ba chỉ và chả viên nướng trên than hoa rồi chấm trong bát nước mắm đủ vị chua - ngọt - mặn - cay. Khói than quyện mùi mỡ cháy xém đánh thức mọi giác quan, khiến thực khách chỉ muốn nhúng thêm miếng nữa.",
          image: "/assets/buncha/buncha.png",
          imageAlt: "Mẹt bún chả Hà Nội với thịt nướng và rau sống",
          cta: "Khám phá bún chả",
        },
        intro: {
          title: "VIDEO",
          body: "Theo dõi từng công đoạn nướng thịt trên than hoa, pha nước chấm và bày mẹt bún chả chuẩn vị phố cổ.",
        },
        video: {
          type: "local",
          src: "/assets/buncha/buncha.mp4",
          poster: "/assets/buncha/buncha.png",
          description: "Mẹt bún chả Hà Nội từ bếp than đến bàn ăn qua những góc quay đầy cảm hứng.",
        },
        ingredientGallery: [
          {
            id: "buncha-nuoccham",
            src: "/assets/buncha/nuoccham.png",
            caption: {
              vi: "Nước chấm pha từ nước mắm, đường, giấm, tỏi và ớt",
              en: "Balanced fish sauce with vinegar, sugar, garlic, and chili",
            },
            alt: {
              vi: "Bát nước chấm bún chả với đu đủ và cà rốt ngâm",
              en: "Bun cha dipping sauce with pickled papaya",
            },
          },
          {
            id: "buncha-quay",
            src: "/assets/buncha/soibun.png.jpg",
            caption: {
              vi: "Mẹt bún trắng và rau sống xanh mát",
              en: "Thin vermicelli and fresh herbs ready to serve",
            },
            alt: {
              vi: "Đĩa bún và rau sống ăn kèm bún chả",
              en: "Platter of vermicelli noodles and greens",
            },
          },
          {
            id: "buncha-meat",
            src: "/assets/buncha/thitnuong.png.jpg",
            caption: {
              vi: "Thịt heo ướp đậm đà nướng trên than hoa",
              en: "Marinated pork grilled over charcoal",
            },
            alt: {
              vi: "Thịt lát và chả viên bún chả chuẩn bị lên bếp",
              en: "Sliced pork and patties ready for grilling",
            },
          },
        ],
        ingredientsTitle: "Tinh túy nguyên liệu",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bún sợi nhỏ mềm mịn tạo nên từng gắp thanh nhẹ." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Ba chỉ thái lát và chả viên ướp ngũ vị nướng than hoa chuẩn vị." },
          { iconClass: "fa-solid fa-jar", text: "Bát nước chấm pha cân bằng vị chua, ngọt, mặn, cay." },
          { iconClass: "fa-solid fa-carrot", text: "Đu đủ xanh, cà rốt ngâm giòn giúp giải ngấy." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, tía tô, kinh giới làm trọn vị tươi mát." },
        ],
        recipeTitle: "Ăn đúng điệu",
        recipeSteps: [
          "Ướp thịt ba chỉ và thịt xay với hành, tỏi, nước mắm rồi nướng than hoa tới khi xém vàng thơm.",
          "Pha nước chấm với nước mắm, đường, giấm, tỏi, ớt; thêm đu đủ và cà rốt ngâm cho giòn ngọt.",
          "Dọn bún và rau sống, chan nước chấm ấm lên thịt nướng để cảm nhận trọn vẹn vị hài hòa.",
        ],
        spotsTitle: "Địa chỉ bún chả nên thử",
        spots: [
          {
            id: "buncha-tuyet",
            name: "BÚN CHẢ TUYẾT",
            address: "34 Hàng Than, quận Ba Đình, Hà Nội",
            description:
              "Hơn 30 năm phục vụ, nổi tiếng với miếng thịt lát lớn, cháy cạnh vừa phải và nước chấm nhẹ nhàng.",
            price: "Giá: 40.000 – 50.000đ (≈ 1,7 – 2,1 USD).",
            image: "/assets/buncha/batuyet.png",
            mapUrl: "https://maps.google.com/?q=34+H%C3%A0ng+Than+Hanoi",
          },
          {
            id: "buncha-huonglien",
            name: "BÚN CHẢ HƯƠNG LIÊN",
            address: "24 Lê Văn Hưu, quận Hai Bà Trưng, Hà Nội",
            description:
              "Nổi tiếng khắp thế giới sau bữa tối của Tổng thống Obama; nước chấm đậm đà ăn kèm nem cua bể giòn rụm.",
            price: "Giá: 50.000 – 70.000đ; set kèm nem cua bể 85.000đ (≈ 3,5 USD).",
            image: "/assets/buncha/bunchahuonglien.png",
            mapUrl: "https://maps.google.com/?q=24+L%C3%AA+V%C4%83n+H%E1%BB%AFu+Hanoi",
          },
          {
            id: "buncha-41",
            name: "BÚN CHẢ 41",
            address: "41 Cửa Đông, quận Hoàn Kiếm, Hà Nội",
            description:
              "Quán lâu đời khu phố cổ với thịt nướng dậy mùi khói và mẹt rau thơm phong phú.",
            price: "Giá: 45.000 – 60.000đ (≈ 1,9 – 2,5 USD).",
            image: "/assets/buncha/buncha41.png",
            mapUrl: "https://maps.google.com/?q=41+C%E1%BB%ADa+%C4%90%C3%B4ng+Hanoi",
          },
        ],
      },

      {
        id: "bunthang",
        hero: {
          eyebrow: "Thanh tao tinh tế",
          title: "BÚN THANG HÀ NỘI",
          description:
            "Bún thang được ví như bản giao hưởng tinh tế của Hà Nội với hơn mười nguyên liệu: bún sợi nhỏ, gà xé, trứng tráng thái chỉ, giò lụa, củ cải khô, nấm hương... Từng topping được cắt đều tăm tắp để mỗi thìa đều cân bằng. Vắt thêm giọt chanh, chấm chút mắm tôm và thoang thoảng hương lá chanh, bát bún thang trở nên trọn vẹn khó quên.",
          image: "/assets/bunthang/bunthang.png",
          imageAlt: "Bát bún thang Hà Nội đầy màu sắc",
          cta: "Thưởng thức bún thang",
        },
        intro: {
          title: "VIDEO",
          body: "Ngắm từng lớp topping và nồi nước dùng thơm phức hòa quyện trong bát bún thang thanh nhã.",
        },
        video: {
          type: "local",
          src: "/assets/bunthang/bunthang.mp4",
          poster: "/assets/bunthang/bunthang.png",
          description: "Video ghi lại quá trình chế biến bún thang với nước dùng trong và topping đầy màu sắc.",
        },
        ingredientGallery: [
          {
            id: "bunthang-broth",
            src: "/assets/bunthang/nuocdung.png",
            caption: {
              vi: "Nước dùng trong được ninh từ xương gà, tôm khô và nấm",
              en: "Clear broth simmered from chicken bones, dried shrimp, and mushrooms",
            },
            alt: {
              vi: "Nồi nước dùng bún thang",
              en: "Bun thang broth in a simmering pot",
            },
          },
          {
            id: "bunthang-noodles",
            src: "/assets/bunthang/soibunthang.png",
            caption: {
              vi: "Bún nhỏ mềm được chần vừa tới",
              en: "Soft, thin vermicelli blanched to perfection",
            },
            alt: {
              vi: "Bún thang sợi mảnh",
              en: "Thin vermicelli for bun thang",
            },
          },
          {
            id: "bunthang-toppings",
            src: "/assets/bunthang/nguyenlieu.png",
            caption: {
              vi: "Gà xé, trứng tráng, giò lụa và củ cải khô thái sợi",
              en: "Shredded chicken, omelet, pork roll, and dried radish",
            },
            alt: {
              vi: "Các topping chuẩn cho bún thang",
              en: "Signature toppings arranged for bun thang",
            },
          },
        ],
        ingredientsTitle: "Thành phần cốt lõi",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bún sợi nhỏ trắng tinh, giúp bát bún thanh và nhẹ." },
          { iconClass: "fa-solid fa-egg", text: "Trứng gà tráng mỏng thái chỉ vàng óng." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Gà xé, giò lụa, tôm khô và nấm hương hòa quyện vị ngọt." },
          { iconClass: "fa-solid fa-jar", text: "Nước dùng trong vắt, nêm mắm ngon, gừng và gia vị khô." },
          { iconClass: "fa-solid fa-leaf", text: "Lá chanh thái chỉ, rau thơm tạo hương vị đặc trưng." },
        ],
        recipeTitle: "Thưởng thức chuẩn Hà Nội",
        recipeSteps: [
          "Ninh xương gà, tôm khô, nấm hương 2-3 giờ để nước dùng trong veo và đậm đà.",
          "Chuẩn bị topping: gà xé, trứng tráng thái chỉ, giò lụa, củ cải và nấm xào thơm.",
          "Xếp bún, chan nước dùng, thêm topping và nhỏ một giọt tinh dầu cà cuống nếu có.",
        ],
        spotsTitle: "Địa chỉ bún thang chuẩn vị",
        spots: [
          {
            id: "bunthang-baduc",
            name: "BÚN THANG BÀ ĐỨC",
            address: "48 Cầu Gỗ, quận Hoàn Kiếm, Hà Nội",
            description:
              "Quán lâu năm nổi tiếng với nước dùng trong, vị ngọt thanh và không gian gọn gàng ấm cúng.",
            price: "Giá: 30.000 – 55.000đ/tô.",
            image: "/assets/bunthang/baduc.png",
            mapUrl: "https://maps.google.com/?q=48+C%E1%BA%A7u+G%E1%BB%97+Hanoi",
          },
          {
            id: "bunthang-thuanly",
            name: "BÚN THANG THUẬN LÝ",
            address: "33 Hàng Hòm, quận Hoàn Kiếm, Hà Nội",
            description:
              "Giữ hương vị truyền thống, khẩu phần vừa vặn và đậm chất phố cổ.",
            price: "Giá: 30.000 – 40.000đ/tô.",
            image: "/assets/bunthang/hang2.png",
            mapUrl: "https://maps.google.com/?q=33+H%C3%A0ng+H%C3%B2m+Hanoi",
          },
          {
            id: "bunthang-tulun",
            name: "BÚN THANG TÙ LÙN",
            address: "5 Hàng Trống, quận Hoàn Kiếm, Hà Nội",
            description:
              "Quán nhỏ bình dị được người địa phương yêu thích bởi vị thanh cân bằng.",
            price: "Giá: 25.000 – 45.000đ/tô.",
            image: "/assets/bunthang/tulun.png",
            mapUrl: "https://maps.google.com/?q=5+H%C3%A0ng+Tr%E1%BB%91ng+Hanoi",
          },
        ],
      },

      {
        id: "banhcuon",
        hero: {
          eyebrow: "Nét thanh tao buổi sớm",
          title: "BÁNH CUỐN HÀ NỘI",
          description:
            "Bánh cuốn Hà Nội mỏng mượt, ôm trọn nhân thịt heo xào mộc nhĩ, rắc hành phi giòn và rau thơm rồi chấm trong bát nước mắm ấm, thoảng hương tinh dầu cà cuống. Tiếng xèo xèo trên khuôn vải buổi sáng đánh thức cả khu phố, mang tới bữa sáng dịu dàng khó quên.",
          image: "/assets/banhcuon/banhcuon.png",
          imageAlt: "Đĩa bánh cuốn Hà Nội",
          cta: "Khám phá bánh cuốn",
        },
        intro: {
          title: "VIDEO",
          body: "Xem những tấm bánh mỏng tang, nhân mặn mà và bát nước chấm ngọt dịu quyện lại hoàn hảo.",
        },
        video: {
          type: "local",
          src: "/assets/banhcuon/banhcuon.mp4",
          poster: "/assets/banhcuon/banhcuon.png",
          description: "Quá trình tráng bánh, cuốn nhân và chan nước mắm nóng hổi được ghi lại trọn vẹn.",
        },
        ingredientGallery: [
          {
            id: "banhcuon-steam",
            src: "/assets/banhcuon/botgao.png",
            caption: {
              vi: "Bột gạo được tráng mỏng trên khuôn vải",
              en: "Rice batter steamed into gossamer-thin sheets",
            },
            alt: {
              vi: "Nồi tráng bánh cuốn",
              en: "Steaming banh cuon sheets",
            },
          },
          {
            id: "banhcuon-filling",
            src: "/assets/banhcuon/thitheo.png",
            caption: {
              vi: "Nhân thịt heo xào mộc nhĩ đậm đà",
              en: "Savory minced pork and wood-ear mushroom filling",
            },
            alt: {
              vi: "Chảo nhân bánh cuốn",
              en: "Banh cuon filling in the pan",
            },
          },
          {
            id: "banhcuon-serve",
            src: "/assets/banhcuon/nuocnam.png",
            caption: {
              vi: "Bánh cuốn dùng kèm chả quế, rau thơm và nước chấm",
              en: "Served with Vietnamese ham, herbs, and nuoc cham",
            },
            alt: {
              vi: "Set bánh cuốn đủ món",
              en: "Plated banh cuon with accompaniments",
            },
          },
        ],
        ingredientsTitle: "Thành phần chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bột gạo pha loãng tráng mỏng cho lớp bánh mịn mượt." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Nhân thịt heo, mộc nhĩ, hành tím xào thơm." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Nước mắm pha ấm với giấm, đường, tỏi, ớt và chút tinh dầu cà cuống." },
          { iconClass: "fa-solid fa-leaf", text: "Rau thơm, giá chần và dưa góp giúp vị thêm cân bằng." },
          { iconClass: "fa-solid fa-bacon", text: "Chả quế, nem chua hoặc ruốc thịt ăn kèm cho thêm độ phong phú." },
        ],
        recipeTitle: "Cuốn bánh chuẩn Hà Nội",
        recipeSteps: [
          "Tráng bột gạo trên khuôn vải, đậy nắp cho chín tới khi bánh trong mịn.",
          "Xào nhân thịt heo với mộc nhĩ, hành tím; dàn đều lên bánh và cuốn chặt tay.",
          "Dọn bánh với nước mắm ấm, hành phi, chả quế và rau thơm để thưởng thức khi còn nóng.",
        ],
        spotsTitle: "Quán bánh cuốn nên ghé",
        spots: [
          {
            id: "banhcuon-baxuan",
            name: "BÁNH CUỐN BÀ XUÂN",
            address: "Dốc Hòe Nhai, quận Ba Đình, Hà Nội",
            description:
              "Quán gia truyền bánh mềm, nước chấm hài hòa và chủ quán thân thiện.",
            price: "Giá: 5.000 – 30.000đ (≈ 0,57 – 1,15 USD).",
            image: "/assets/banhcuon/hinh1.png",
            mapUrl: "https://maps.google.com/?q=D%E1%BB%91c+H%C3%B2e+Nhai+Hanoi",
          },
          {
            id: "banhcuon-thuykhue",
            name: "BÁNH CUỐN THỤY KHUÊ",
            address: "Ngõ 29 Thụy Khuê, quận Tây Hồ, Hà Nội",
            description:
              "Được người dân quanh hồ yêu thích nhờ vị đậm đà và phần rau tươi hào phóng.",
            price: "Giá: 15.000 – 20.000đ (≈ 0,57 – 0,77 USD).",
            image: "/assets/banhcuon/hinh2.png",
            mapUrl: "https://maps.google.com/?q=29+Th%E1%BB%A5y+Khu%C3%AA+Hanoi",
          },
          {
            id: "banhcuon-bahanh",
            name: "BÁNH CUỐN BÀ HẠNH",
            address: "16B Thọ Xương, quận Hoàn Kiếm, Hà Nội",
            description:
              "Nằm gần Nhà thờ Lớn, không gian sạch sẽ với suất bánh cuốn đầy đặn, ấm bụng buổi sáng.",
            price: "Giá: 25.000 – 40.000đ (≈ 0,96 – 1,53 USD).",
            image: "/assets/banhcuon/hinh3.png",
            mapUrl: "https://maps.google.com/?q=16B+Th%E1%BB%8D+X%C6%B0%C6%A1ng+Hanoi",
          },
        ],
      },

      {
        id: "xoi",
        hero: {
          eyebrow: "Bữa sáng ấm áp",
          title: "XÔI HÀ NỘI",
          description:
            "Ở Hà Nội, xôi không chỉ là món ăn mà là một phần của văn hoá sống. Từ góc phố tấp nập buổi sớm đến những con ngõ yên ả đêm khuya, hình ảnh gánh xôi bốc khói gói trong lá chuối đã gắn bó với tuổi thơ của người Hà thành. Một gói xôi mềm dẻo với đậu xanh vàng óng, hành phi giòn, thịt gà, thịt kho hay phiên bản ngọt với dừa nạo, đậu phộng, mè rang đều mang đến hơi ấm bình dị khó quên.",
          image: "/assets/xoi/xoi.png",
          imageAlt: "Gánh xôi Hà Nội bốc khói",
          cta: "Khám phá xôi Hà Nội",
        },
        intro: {
          title: "VIDEO",
          body: "Theo chân gánh xôi Hà Nội từ lúc thổi nếp tới khi gói xôi nóng trong lá chuối.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/udmWMcekReY?autoplay=1&mute=1&rel=0",
          poster: "/assets/xoi/xoi-hero.png",
          description: "Hơi nếp bốc khói, topping phong phú và nhịp sống vội vã quanh gánh xôi Hà Nội.",
        },
        ingredientGallery: [
          {
            id: "xoi-glutinous",
            src: "/assets/xoi/xoi-nep.png",
            caption: {
              vi: "Nếp cái hoa vàng đồ chín mềm, hạt tơi mà dẻo",
              en: "Golden glutinous rice steamed until tender and fragrant",
            },
            alt: {
              vi: "Nồi xôi nếp vừa đồ",
              en: "Freshly steamed sticky rice",
            },
          },
          {
            id: "xoi-toppings-savory",
            src: "/assets/xoi/xoi-man.png",
            caption: {
              vi: "Topping mặn đậm đà như thịt gà xé, thịt kho, chả lụa",
              en: "Savory toppings like shredded chicken, caramelized pork, and pork roll",
            },
            alt: {
              vi: "Đĩa xôi mặn với thịt và trứng",
              en: "Sticky rice with savory toppings",
            },
          },
          {
            id: "xoi-toppings-sweet",
            src: "/assets/xoi/xoi-ngot.png",
            caption: {
              vi: "Phiên bản ngọt với dừa nạo, đậu phộng và mè rang",
              en: "Sweet versions with coconut shavings, peanuts, and sesame",
            },
            alt: {
              vi: "Xôi ngọt rắc dừa và mè",
              en: "Sweet sticky rice with coconut and sesame",
            },
          },
        ],
        ingredientsTitle: "Hương vị kết nối",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Nếp cái hoa vàng đồ chín mềm dẻo, thơm mùi lá dong." },
          { iconClass: "fa-solid fa-seedling", text: "Đậu xanh cà, mè rang, lạc rang tạo vị bùi béo." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt gà xé, thịt kho, chả lụa cho bữa sáng no đủ." },
          { iconClass: "fa-solid fa-ice-cream", text: "Dừa nạo, dừa sợi và chút đường tạo phiên bản ngọt hấp dẫn." },
          { iconClass: "fa-solid fa-leaf", text: "Lá chuối giữ hơi nóng và hương thơm dân dã." },
        ],
        recipeTitle: "Cách thưởng thức trọn vẹn",
        recipeSteps: [
          "Vo sạch nếp, ngâm qua đêm rồi đồ chín với lá dong hoặc lá chuối để giữ hương.",
          "Chuẩn bị topping: đậu xanh giã nhuyễn, hành phi giòn, thịt kho hoặc gà xé, dừa nạo và mè rang.",
          "Múc xôi nóng ra lá chuối, thêm topping yêu thích và thưởng thức ngay khi còn bốc khói.",
        ],
        spotsTitle: "Điểm bán xôi không thể bỏ lỡ",
        spots: [
          {
            id: "xoi-yen",
            name: "XÔI YẾN",
            address: "35B Nguyễn Hữu Huân, Hoàn Kiếm",
            description:
              "Quán nổi tiếng nhất với xôi xéo đậu xanh, hành phi vàng óng, phục vụ từ sáng tới khuya.",
            price: "Giá: 25.000 – 45.000đ (≈ 1 – 1,9 USD).",
            image: "/assets/xoi/1.png",
            mapUrl: "https://maps.google.com/?q=35B+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "xoi-ba-thu",
            name: "XÔI BÀ THU",
            address: "57 Thợ Nhuộm, Hoàn Kiếm",
            description:
              "Nổi tiếng với xôi gà, xôi thịt kho tàu đậm đà, giá mềm và phục vụ nhanh chóng.",
            price: "Giá: 25.000 – 40.000đ (≈ 1 – 1,7 USD).",
            image: "/assets/xoi/2.png",
            mapUrl: "https://maps.google.com/?q=57+Th%E1%BB%A3+Nhu%E1%BB%99m+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "xoi-cat-lam",
            name: "XÔI CÁT LÂM",
            address: "24B Đường Thành, Hoàn Kiếm",
            description:
              "Giữ nguyên hương vị truyền thống với xôi xéo, xôi ngô thơm ngon, ổn định qua từng năm.",
            price: "Giá: 20.000 – 50.000đ (≈ 0,8 – 2 USD).",
            image: "/assets/xoi/3.png",
            mapUrl: "https://maps.google.com/?q=24B+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "bunrieu",
        hero: {
          eyebrow: "Nét tinh tế đồng quê",
          title: "BÚN RIÊU HÀ NỘI",
          description:
            "Một tô bún riêu Hà Nội là bản hoà tấu của sắc đỏ cà chua, vàng rực riêu cua và xanh mướt của rau thơm. Nước dùng thanh nhưng đậm đà vị cua đồng, thoang thoảng mùi mắm tôm, điểm thêm vị chua dịu của cà chua và giấm bỗng. Đậu phụ mềm, thịt heo ngọt và rau sống giòn mát khiến ai cũng khó quên.",
          image: "/assets/bunrieu/rieu.png",
          imageAlt: "Tô bún riêu cua Hà Nội nóng hổi",
          cta: "Thưởng thức bún riêu",
        },
        intro: {
          title: "VIDEO",
          body: "Theo dõi quá trình nấu nước riêu cua, thả đậu phụ và chan nước dùng đỏ au chuẩn vị Hà Nội.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/zXgwTTiysUA?autoplay=1&mute=1&rel=0",
          poster: "/assets/bunrieu/bunrieu-hero.png",
          description: "Gạch cua quyện cà chua, đậu phụ mềm và rau thơm làm nên tô bún riêu trọn vị.",
        },
        ingredientGallery: [
          {
            id: "bunrieu-crab",
            src: "/assets/bunrieu/gach-cua.png",
            caption: {
              vi: "Gạch cua đồng xay nhuyễn tạo phần riêu bông mềm",
              en: "Fresh field crab paste creating delicate curds",
            },
            alt: {
              vi: "Gạch cua đồng đã được xay",
              en: "Prepared crab paste",
            },
          },
          {
            id: "bunrieu-broth",
            src: "/assets/bunrieu/nouoc-dung.png",
            caption: {
              vi: "Nước dùng trong thanh với cà chua và giấm bỗng",
              en: "Clear broth brightened with tomatoes and rice vinegar",
            },
            alt: {
              vi: "Nồi nước bún riêu đang sôi",
              en: "Simmering bun rieu broth",
            },
          },
          {
            id: "bunrieu-garnish",
            src: "/assets/bunrieu/topping.png",
            caption: {
              vi: "Đậu phụ rán, thịt heo và rau thơm làm topping",
              en: "Crispy tofu, pork, and herbs ready to top the bowl",
            },
            alt: {
              vi: "Đĩa topping bún riêu",
              en: "Bun rieu toppings platter",
            },
          },
        ],
        ingredientsTitle: "Hương vị chủ đạo",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Riêu cua đồng xay nhuyễn, ngọt thanh." },
          { iconClass: "fa-solid fa-tomato", text: "Cà chua chín và giấm bỗng tạo vị chua dịu bắt vị." },
          { iconClass: "fa-solid fa-cheese", text: "Đậu phụ non, đậu rán thấm nước dùng béo nhẹ." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt heo, giò hoặc sườn sụn cho thêm độ ngọt." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, rau muống chẻ và kinh giới giúp món ăn tươi mát." },
        ],
        recipeTitle: "Ăn ngon chuẩn vị",
        recipeSteps: [
          "Giã cua đồng, lọc lấy nước và đun tới khi riêu nổi, vớt riêng phần riêu.",
          "Xào cà chua với hành khô, cho vào nồi nước cua cùng giấm bỗng, nêm vừa vị.",
          "Trụng bún, xếp đậu phụ, thịt và riêu cua, chan nước dùng, thêm rau thơm rồi thưởng thức.",
        ],
        spotsTitle: "Quán bún riêu nên ghé",
        spots: [
          {
            id: "bunrieu-huyen-thu",
            name: "BÚN RIÊU HUYỀN THU",
            address: "2F Quang Trung, Hoàn Kiếm",
            description:
              "Hơn 30 năm phục vụ, bát bún riêu cầu kỳ và phục vụ thân thiện.",
            price: "Giá: 45.000 – 90.000đ.",
            image: "/assets/bunrieu/1.png",
            mapUrl: "https://maps.google.com/?q=2F+Quang+Trung+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "bunrieu-trang",
            name: "BÚN RIÊU SƯỜN SỤN TRANG",
            address: "23 Nguyễn Siêu, Hoàn Kiếm",
            description:
              "Biến tấu với sườn sụn mềm ngọt và nước dùng đậm đà, hút khách cả ngày.",
            price: "Giá: 30.000 – 75.000đ.",
            image: "/assets/bunrieu/2.png",
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Si%C3%AAu+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "bunrieu-be-be",
            name: "BÚN RIÊU BỀ BỀ",
            address: "608 Lạc Long Quân, Tây Hồ",
            description:
              "Thêm bề bề tươi ngọt, mang đến trải nghiệm bún riêu hiện đại bên hồ Tây.",
            price: "Giá: 60.000 – 75.000đ.",
            image: "/assets/bunrieu/3.png",
            mapUrl: "https://maps.google.com/?q=608+L%E1%BA%A1c+Long+Qu%C3%A2n+T%C3%A2y+H%E1%BB%93",
          },
        ],
      },
      {
        id: "nemnuong",
        hero: {
          eyebrow: "Đặc sản miền Trung",
          title: "NEM NƯỚNG NHA TRANG",
          description:
            "Nem nướng Nha Trang được làm từ thịt heo quết nhuyễn, nướng trên than hồng thơm lừng, ăn kèm bánh tráng, rau sống và nước chấm sền sệt ngọt bùi. Hương vị hài hoà, dễ ăn khiến món đặc sản miền Trung này chinh phục thực khách ở mọi miền đất nước.",
          image: null,
          imageAlt: "Nem nướng Nha Trang với bánh tráng và rau sống",
          cta: "Thưởng thức nem nướng",
        },
        intro: {
          title: "VIDEO",
          body: "Nem nướng được quết dẻo, nướng vàng và cuốn cùng rau sống, bánh tráng.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/NVzRMbREV_c?autoplay=1&mute=1&rel=0",
          description: "Quy trình quết thịt, nướng nem thơm lừng và cuốn bánh tráng đúng điệu Nha Trang.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu tạo nên hương vị",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt heo quết nhuyễn trộn mỡ, nêm gia vị đậm đà." },
          { iconClass: "fa-solid fa-fire", text: "Que tre và bếp than hồng giúp nem chín vàng thơm." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, xoài xanh, dưa leo cho vị tươi mát." },
          { iconClass: "fa-solid fa-bread-slice", text: "Bánh tráng mềm dẻo cuốn cùng nem và rau." },
          { iconClass: "fa-solid fa-bowl-food", text: "Nước chấm sền sệt từ đậu phộng, gan heo, tỏi ớt." },
        ],
        recipeTitle: "Cách thưởng thức chuẩn vị",
        recipeSteps: [
          "Nướng nem trên than hồng, trở đều tay đến khi vàng óng và dậy mùi thơm.",
          "Trải bánh tráng, thêm rau sống, đồ chua, xoài xanh, đặt nem nướng lên trên.",
          "Cuốn chặt tay và chấm cùng nước chấm đậu phộng sền sệt đặc trưng Nha Trang.",
        ],
        spotsTitle: "Địa chỉ nem nướng ở Hà Nội",
        spots: [
          {
            id: "nemnuong-vukhanh",
            name: "NEM NƯỚNG NHA TRANG VŨ KHÁNH",
            address: "90 Trần Hưng Đạo, Hoàn Kiếm",
            description:
              "Không gian rộng rãi, nem nướng thơm mềm, nước chấm đậm đà đúng kiểu Nha Trang.",
            price: "Giá: 50.000 – 80.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=90+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nemnuong-hangbong",
            name: "NEM NƯỚNG NHA TRANG",
            address: "39 Hàng Bông, Hoàn Kiếm",
            description:
              "Quán nhỏ ngay phố cổ, nổi tiếng với phần nem nướng nóng hổi cuốn bánh tráng rau sống.",
            price: "Giá: 50.000 – 80.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+B%C3%B4ng+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "nemnuong-hanh",
            name: "NEM NƯỚNG NHA TRANG HẠNH",
            address: "23 Nguyễn Thái Học, Ba Đình",
            description:
              "Nem nướng mềm thơm, nước chấm béo bùi, phục vụ nhanh chóng, được thực khách địa phương yêu thích.",
            price: "Giá: 50.000 – 80.000đ/suất.",
            image: null,
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "lau-cua-dong",
        hero: {
          eyebrow: "Ấm áp hồn quê",
          title: "LẨU CUA ĐỒNG",
          description:
            "Lẩu cua đồng mang đậm hương vị đồng quê Bắc Bộ với nước dùng ngọt thanh từ cua đồng tươi, gạch cua béo ngậy và giấm bỗng chua nhẹ. Giữa tiết trời se lạnh của Hà Nội, quây quần bên nồi lẩu nghi ngút khói là trải nghiệm ấm áp khó quên.",
          image: null,
          imageAlt: "Nồi lẩu cua đồng nghi ngút khói",
          cta: "Thưởng thức lẩu cua",
        },
        intro: {
          title: "ẨM THỰC HÀ NỘI",
          body: "Nồi lẩu cua đồng sôi sùng sục với gạch cua vàng, rau nhúng xanh mướt và topping phong phú.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Thành phần dân dã",
        ingredientsList: [
          { iconClass: "fa-solid fa-crab", text: "Cua đồng tươi giã nhuyễn, lọc lấy nước cho vị ngọt thanh." },
          { iconClass: "fa-solid fa-bowl-food", text: "Gạch cua béo ngậy tạo màu vàng hấp dẫn." },
          { iconClass: "fa-solid fa-mug-hot", text: "Giấm bỗng, mắm tôm, cà chua tạo vị chua dịu đặc trưng." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Topping phong phú: thịt bò, sườn sụn, đậu phụ, giò." },
          { iconClass: "fa-solid fa-leaf", text: "Rau theo mùa như rau muống, mồng tơi, hoa chuối." },
        ],
        recipeTitle: "Cách thưởng thức",
        recipeSteps: [
          "Nấu nước lẩu từ nước cua, cà chua, giấm bỗng đến khi sôi nổi gạch cua vàng.",
          "Chuẩn bị topping: thịt bò, sườn sụn, đậu phụ, giò, rau nhúng sạch.",
          "Nhúng đồ ăn khi nước lẩu sôi, chan ra bát cùng bún và rau sống, thưởng thức nóng.",
        ],
        spotsTitle: "Quán lẩu cua đồng nổi bật",
        spots: [
          {
            id: "laucua-685",
            name: "LẨU CUA ĐỒNG 685",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Không gian mang phong cách Bắc Bộ, nước lẩu ngọt thanh, gạch cua thơm béo, topping phong phú.",
            price: "Giá: 250.000 – 400.000đ/nồi.",
            image: null,
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "laucua-songha",
            name: "LẨU CUA ĐỒNG SONG HÀ",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Lẩu cua đồng chuẩn vị Bắc Bộ, nước lẩu ngọt thanh, đồ nhúng đa dạng phù hợp nhóm bạn và gia đình.",
            price: "Giá: 150.000 – 300.000đ/người.",
            image: null,
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "laucua-chinhbeo",
            name: "LẨU CUA ĐỒNG CHÍNH BÉO",
            address: "Liền kề 20A, KĐT Văn Phú, Hà Đông",
            description:
              "Quán bình dân nhưng đông khách, nguyên liệu tươi, nồi lẩu vừa đủ cho 3-4 người với hương vị đậm đà.",
            price: "Giá: 220.000 – 350.000đ/nồi.",
            image: null,
            mapUrl: "https://maps.google.com/?q=Khu+%C4%91%E1%BB%88nh+c%C6%B0+V%C4%83n+Ph%C3%BA+H%C3%A0+N%E1%BB%99i",
          },
        ],
      },
      {
        id: "cha-ca",
        hero: {
          eyebrow: "Tinh hoa phố cổ",
          title: "CHẢ CÁ HÀ NỘI",
          description:
            "Từng miếng cá ướp nghệ vàng óng được nướng thơm rồi xào nóng cùng thì là và hành lá. Món ăn kết hợp với bún, lạc rang, rau thơm và chén mắm tôm pha giấm bỗng tạo nên hương vị đậm đà, khó quên của Hà Nội.",
          image: "/assets/chaca/chaca.png",
          imageAlt: "Chảo chả cá Hà Nội",
          cta: "Thưởng thức chả cá",
        },
        intro: {
          title: "VIDEO",
          body: "Chiêm ngưỡng chảo chả cá xèo xèo và cách pha mắm tôm chuẩn Hà Nội.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/TWX9MaOJ7TQ?autoplay=1&mute=1&rel=0",
          poster: "/assets/chaca/chaca.png",
          description: "Chảo chả cá xèo xèo, thì là xanh mướt và hương thơm lan tỏa.",
        },
        ingredientGallery: [
          {
            id: "chaca-fish",
            src: "/assets/chaca/ca-lang.png",
            caption: {
              vi: "Cá lăng hoặc cá quả phi lê tươi, ướp nghệ và mắm tôm",
              en: "Fresh catfish fillets marinated with turmeric and shrimp paste",
            },
            alt: {
              vi: "Miếng cá chả cá được ướp vàng",
              en: "Golden marinated fish for cha ca",
            },
          },
          {
            id: "chaca-pan",
            src: "/assets/chaca/chao-chaca.png",
            caption: {
              vi: "Chảo chả cá sôi sùng sục cùng thì là và hành lá",
              en: "Sizzling pan of cha ca with dill and scallions",
            },
            alt: {
              vi: "Chảo chả cá đang xào tại bàn",
              en: "Cha ca pan cooking tableside",
            },
          },
          {
            id: "chaca-serving",
            src: "/assets/chaca/cha-ca-set.png",
            caption: {
              vi: "Set chả cá ăn kèm bún, rau thơm, lạc rang và mắm tôm",
              en: "Cha ca platter with vermicelli, herbs, peanuts, and dipping sauces",
            },
            alt: {
              vi: "Mâm chả cá đầy đủ topping",
              en: "Cha ca serving tray",
            },
          },
        ],
        ingredientsTitle: "Điểm nhấn nguyên liệu",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Cá lăng tươi, chắc thịt, thấm vị nghệ và riềng." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Thì là, hành lá xào thơm cùng cá." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Bún rối, rau thơm, bánh đa nướng ăn kèm." },
          { iconClass: "fa-solid fa-mug-hot", text: "Mắm tôm pha chanh ớt hoặc nước mắm tỏi ớt." },
          { iconClass: "fa-solid fa-seedling", text: "Lạc rang giã dậy vị béo bùi." },
        ],
        recipeTitle: "Thưởng thức đúng điệu",
        recipeSteps: [
          "Ướp cá với nghệ, riềng, mắm tôm, mẻ rồi nướng sơ cho thơm.",
          "Đun nóng chảo với mỡ nước, cho cá vào xào nhanh tay cùng thì là, hành lá và lạc rang.",
          "Ăn kèm bún, rau thơm, bánh đa và chén mắm tôm pha giấm bỗng, chanh ớt.",
        ],
        spotsTitle: "Địa chỉ chả cá nên ghé",
        spots: [
          {
            id: "chaca-la-vong",
            name: "CHẢ CÁ LÃ VỌNG",
            address: "14 Chả Cá, Hoàn Kiếm",
            description:
              "Hơn 100 năm tuổi, giữ trọn công thức gia truyền và phong cách phục vụ tại bàn.",
            price: "Giá: 120.000 – 150.000đ (≈ 5 – 6,2 USD).",
            image: "/assets/chaca/1.png",
            mapUrl: "https://maps.google.com/?q=14+Ch%E1%BA%A3+C%C3%A1+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "chaca-thang-long",
            name: "CHẢ CÁ THĂNG LONG",
            address: "21 Đường Thành, Hoàn Kiếm",
            description:
              "Không gian rộng rãi, phù hợp nhóm bạn đông với cá đậm vị và rau thơm tươi.",
            price: "Giá: 100.000 – 130.000đ (≈ 4,2 – 5,4 USD).",
            image: "/assets/chaca/2.png",
            mapUrl: "https://maps.google.com/?q=21+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "chaca-anh-vu",
            name: "CHẢ CÁ ANH VŨ",
            address: "120-122 K1 Giảng Võ, Ba Đình",
            description:
              "Không gian hiện đại nhưng vẫn giữ hương vị truyền thống, nổi tiếng với cá tươi và nước chấm hài hoà.",
            price: "Giá: 120.000 – 150.000đ (≈ 5 – 6,2 USD).",
            image: "/assets/chaca/3.png",
            mapUrl: "https://maps.google.com/?q=120+K1+Gi%E1%BA%A3ng+V%C3%B5+H%C3%A0+N%E1%BB%99i",
          },
      
        ],
      },
    ],
  },
  en: {
    labels: {
      cta: "Discover now",
      mapButton: "Open Google Maps",
      clicks: "Clicks",
      videoFallback: "Your browser does not support the video tag. Please download the file to watch.",
      detailsButton: "Review",
      whyTryTitle: "Why you should try it?",
    },
    dishes: [
      {
        id: "pho",
        hero: {
          eyebrow: "The national soul",
          title: "PHO HANOI",
          description:
            "Hanoi Pho is Vietnam’s most iconic dish. Flat rice noodles, tender beef or chicken, and a clear broth simmered for hours with bones, onions, ginger, and spices create a light yet deeply flavorful bowl. Enjoying pho at a tiny street-side stall is an authentic Hanoi ritual. Every spoonful carries layers of star anise, cinnamon, and charred aromatics carefully skimmed through the night. The rising steam mingles with the city haze, inviting you to linger for just one more bowl.",
          image: "/assets/pho/pho-feature.png",
          imageAlt: "Steaming bowl of Hanoi pho",
          cta: "Dive into Hanoi Pho",
        },
        intro: {
          title: "VIDEO",
          body: "Discover why pho is treasured as Vietnam’s culinary soul.",
        },
        video: {
          type: "local",
          src: "/assets/pho/pho-video.mp4",
          poster: "/assets/pho/pho-feature.png",
        },
        ingredientGallery: [
          {
            id: "pho-broth",
            src: "/assets/pho/nuocdung.png",
            caption: {
              vi: "Nồi nước dùng trong vắt hầm từ xương bò và gia vị thơm",
              en: "Crystal-clear broth simmered from beef bones and aromatics",
            },
            alt: {
              vi: "Nồi nước dùng phở đang nghi ngút khói",
              en: "Simmering pho broth pot",
            },
          },
          {
            id: "pho-noodles",
            src: "/assets/pho/banhpho.png",
            caption: {
              vi: "Bánh phở tươi trắng mềm được tráng thủ công từng lớp",
              en: "Fresh rice noodles hand-crafted to stay silky and springy",
            },
            alt: {
              vi: "Bánh phở mềm mịn chuẩn bị cho bát phở",
              en: "Soft pho noodles ready for serving",
            },
          },
          {
            id: "pho-beef",
            src: "/assets/pho/thibo.png",
            caption: {
              vi: "Thịt bò thăn thái lát mỏng để giữ độ mềm ngọt",
              en: "Thinly sliced tenderloin that keeps every bite juicy",
            },
            alt: {
              vi: "Thịt bò thái lát dùng cho phở tái",
              en: "Thin beef slices prepared for rare pho",
            },
          },
        ],
        ingredientsTitle: "RAW MATERIALS",
        ingredientsList: [
          {
            iconClass: "fa-solid fa-bone",
            text: "Beef and pork bones simmered for hours for a naturally sweet broth.",
          },
          {
            iconClass: "fa-solid fa-bowl-food",
            text: "Tenderloin, flank, brisket, or tendon sliced thin for a balanced texture.",
          },
          {
            iconClass: "fa-solid fa-seedling",
            text: "Charred ginger, onions, star anise, cinnamon, and cardamom for fragrance.",
          },
          {
            iconClass: "fa-solid fa-utensils",
            text: "Fresh rice noodles that stay silky yet firm.",
          },
          {
            iconClass: "fa-solid fa-bread-slice",
            text: "Herbs, lime, chili, and crispy crullers to complete each slurp.",
          },
        ],
        recipeTitle: "Our Secret Recipe",
        recipeSteps: [
          "Blanch and simmer bones for at least eight hours for a clear, rich broth.",
          "Slice beef thinly or cook to perfection to keep it tender.",
          "Warm the noodles, top with meat, ladle hot broth, and serve with herbs, lime, chili, and crullers.",
        ],
        spotsTitle: "Where to taste authentic pho",
        spots: [
          {
            id: "pho-batdan",
            name: "PHO BAT DAN",
            address: "49 Bat Dan Street, Hoan Kiem District, Hanoi",
            description:
              "Famed in the Old Quarter for clear broth, tender beef, and the queue-and-self-serve ritual that preserves the old-school flavor.",
            image: "/assets/pho/pho-batdan.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+B%C3%A1t+%C4%90%C3%A0n",
          },
          {
            id: "pho-thin",
            name: "PHO THIN",
            address: "13 Pho Lo Duc, Ngo Thi Nham, Hai Ba Trung, Ha Noi",
            description:
              "Known for “stir-fried beef pho,” where beef is quickly seared over high heat for a richer broth.",
            image: "/assets/pho/pho-thin.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+Th%C3%ACn+L%C3%B2+%C4%90%C3%BAc",
          },
          {
            id: "pho-lyquocsu",
            name: "PHO 10 LY QUOC SU",
            address: "10 Ly Quoc Su, Phuong Hang Trong, Quan Hoan Kiem, Ha Noi",
            description:
              "A favorite near St. Joseph’s Cathedral, serving both beef and chicken pho with consistent flavors for locals and travelers alike.",
            image: "/assets/pho/pho-lyquocsu.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+10+L%C3%BD+Qu%E1%BB%91c+S%C6%B2",
          },
        ],
      },
      {
        id: "buncha",
        hero: {
          eyebrow: "Street-side favorite",
          title: "HANOI BUN CHA",
          description:
            "Among Hanoi’s rich culinary heritage, bun cha captures every visitor’s heart. Soft vermicelli, smoky grilled pork, and a well-balanced dipping sauce create a vibrant, refreshing meal. The charcoal smoke perfumes the air with caramelized pork fat, promising a satisfying bite. Dip your chopsticks into the warm nuoc cham and each mouthful bursts with sweet, sour, salty, and spicy harmony.",
          image: "/assets/buncha/buncha.png",
          imageAlt: "Basket of Hanoi bun cha with grilled pork and greens",
          cta: "Discover bun cha",
        },
        intro: {
          title: "VIDEO",
          body: "Watch how charcoal-grilled pork, pickles, and herbs come together for authentic bun cha.",
        },
        video: {
          type: "local",
          src: "/assets/buncha/buncha.mp4",
          poster: "/assets/buncha/buncha.png",
          description: "A cinematic look at crafting an iconic Hanoi bun cha spread.",
        },
        ingredientGallery: [
          {
            id: "buncha-nuoccham",
            src: "/assets/buncha/nuoccham.png",
            caption: {
              vi: "Nước chấm pha từ nước mắm, đường, giấm, tỏi và ớt",
              en: "Balanced fish sauce with vinegar, sugar, garlic, and chili",
            },
            alt: {
              vi: "Chén nước chấm bún chả với cà rốt và đu đủ ngâm",
              en: "Bun cha dipping sauce with pickled papaya",
            },
          },
          {
            id: "buncha-quay",
            src: "/assets/buncha/soibun.png.jpg",
            caption: {
              vi: "Sợi bún trắng mảnh cùng đĩa rau sống mát lành",
              en: "Thin vermicelli and fresh herbs ready to serve",
            },
            alt: {
              vi: "Đĩa bún và rau sống ăn kèm bún chả",
              en: "Platter of vermicelli noodles and greens",
            },
          },
          {
            id: "buncha-meat",
            src: "/assets/buncha/thitnuong.png.jpg",
            caption: {
              vi: "Thịt heo được tẩm ướp thơm và nướng trên than",
              en: "Marinated pork grilled over charcoal",
            },
            alt: {
              vi: "Thịt heo thái lát và vo viên chuẩn bị nướng",
              en: "Sliced pork and patties ready for grilling",
            },
          },
        ],
        ingredientsTitle: "Essential components",
        ingredientsList: [
          {
            iconClass: "fa-solid fa-bowl-rice",
            text: "Soft vermicelli noodles that keep each bite light.",
          },
          {
            iconClass: "fa-solid fa-drumstick-bite",
            text: "Marinated pork patties and slices grilled over charcoal for smokiness.",
          },
          {
            iconClass: "fa-solid fa-jar",
            text: "Nuoc cham dipping sauce balancing sweet, sour, salty, and spicy notes.",
          },
          {
            iconClass: "fa-solid fa-carrot",
            text: "Pickled green papaya and carrot to cut through richness.",
          },
          {
            iconClass: "fa-solid fa-leaf",
            text: "Fresh herbs—lettuce, perilla, aromatic greens—for a refreshing finish.",
          },
        ],
        recipeTitle: "How to enjoy it right",
        recipeSteps: [
          "Marinate pork belly and minced pork, grill over charcoal until smoky and caramelized.",
          "Mix nuoc cham with fish sauce, sugar, vinegar, garlic, and chili; add pickled papaya and carrot.",
          "Serve with vermicelli and herbs, ladle warm sauce over the grilled pork for a harmonious bite.",
        ],
        spotsTitle: "Must-try bun cha spots",
        spots: [
          {
            id: "buncha-tuyet",
            name: "BUN CHA TUYET",
            address: "34 Hang Than, Ba Dinh District, Hanoi",
            description:
              "Over 30 years of tradition—famous for big, flavorful pork slices and light dipping sauce.",
            price: "Price: 40,000 – 50,000 VND (~1.7 – 2.1 USD).",
            image: "/assets/buncha/batuyet.png",
            mapUrl: "https://maps.google.com/?q=34+H%C3%A0ng+Than+Hanoi",
          },
          {
            id: "buncha-huonglien",
            name: "BUN CHA HUONG LIEN",
            address: "24 Le Van Huu, Hai Ba Trung District, Hanoi",
            description:
              "Gained world fame after President Obama dined here; known for rich sauce and crispy crab spring rolls.",
            price: "Price: 50,000 – 70,000 VND; combo with crab spring roll 85,000 VND (~3.5 USD).",
            image: "/assets/buncha/bunchahuonglien.png",
            mapUrl: "https://maps.google.com/?q=24+L%C3%AA+V%C4%83n+H%E1%BB%AFu+Hanoi",
          },
          {
            id: "buncha-41",
            name: "BUN CHA 41",
            address: "41 Cua Dong, Hoan Kiem District, Hanoi",
            description:
              "Old Quarter favorite with smoky grilled pork and vibrant herb platters.",
            price: "Price: 45,000 – 60,000 VND (~1.9 – 2.5 USD).",
            image: "/assets/buncha/buncha41.png",
            mapUrl: "https://maps.google.com/?q=41+C%E1%BB%ADa+%C4%90%C3%B4ng+Hanoi",
          },
        ],
      },
      {
        id: "bunthang",
        hero: {
          eyebrow: "Elegant Hanoi flavor",
          title: "HANOI BUN THANG",
          description:
            "Bun thang is Hanoi’s refined noodle soup, layering over ten ingredients: thin vermicelli, shredded chicken, julienned omelet, Vietnamese pork roll, dried radish, shiitake mushrooms, and a clear broth simmered from chicken bones, dried shrimp, and mushrooms. Each topping is meticulously cut so every spoonful tastes balanced and elegant. A squeeze of lime, a hint of Vietnamese shrimp paste, and the aroma of lime leaves elevate the broth into a nuanced symphony.",
          image: "/assets/bunthang/bunthang.png",
          imageAlt: "Colorful Hanoi bun thang bowl",
          cta: "Savor bun thang",
        },
        intro: {
          title: "VIDEO",
          body: "See how each topping and the fragrant broth complete a delicate bun thang bowl.",
        },
        video: {
          type: "local",
          src: "/assets/bunthang/bunthang.mp4",
          poster: "/assets/bunthang/bunthang.png",
          description: "Watch the broth simmer and toppings assemble into a vibrant bun thang bowl.",
        },
        ingredientGallery: [
          {
            id: "bunthang-broth",
            src: "/assets/bunthang/nuocdung.png",
            caption: {
              vi: "Nước dùng trong được ninh từ xương gà, tôm khô và nấm",
              en: "Clear broth simmered from chicken bones, dried shrimp, and mushrooms",
            },
            alt: {
              vi: "Nồi nước dùng bún thang",
              en: "Bun thang broth in a simmering pot",
            },
          },
          {
            id: "bunthang-noodles",
            src: "/assets/bunthang/soibunthang.png",
            caption: {
              vi: "Bún nhỏ mềm được chần vừa tới",
              en: "Soft, thin vermicelli blanched to perfection",
            },
            alt: {
              vi: "Bún thang sợi mảnh",
              en: "Thin vermicelli for bun thang",
            },
          },
          {
            id: "bunthang-toppings",
            src: "/assets/bunthang/nguyenlieu.png",
            caption: {
              vi: "Gà xé, trứng tráng, giò lụa và củ cải khô thái sợi",
              en: "Shredded chicken, omelet, pork roll, and dried radish",
            },
            alt: {
              vi: "Các topping chuẩn cho bún thang",
              en: "Signature toppings arranged for bun thang",
            },
          },
        ],
        ingredientsTitle: "Essential components",
        ingredientsList: [
          {
            iconClass: "fa-solid fa-bowl-rice",
            text: "Ultra-thin vermicelli that keeps the soup light and elegant.",
          },
          {
            iconClass: "fa-solid fa-egg",
            text: "Golden egg omelet cut into fine strips.",
          },
          {
            iconClass: "fa-solid fa-drumstick-bite",
            text: "Shredded chicken, pork roll, dried shrimp, and shiitake mushrooms.",
          },
          {
            iconClass: "fa-solid fa-jar",
            text: "Crystal-clear broth balanced with fish sauce, ginger, and dried aromatics.",
          },
          {
            iconClass: "fa-solid fa-leaf",
            text: "Fragrant herbs, cilantro, dried radish to add aroma and texture.",
          },
        ],
        recipeTitle: "How to enjoy it like a local",
        recipeSteps: [
          "Simmer chicken bones, dried shrimp, and mushrooms for 2-3 hours until the broth turns clear and flavorful.",
          "Prepare toppings: shredded chicken, julienned omelet, pork roll, pickled radish, and mushrooms.",
          "Arrange noodles and toppings, ladle hot broth, and finish with a drop of ca cuong essence if available.",
        ],
        spotsTitle: "Where to try authentic bun thang",
        spots: [
          {
            id: "bunthang-baduc",
            name: "BUN THANG BA DUC",
            address: "48 Cau Go Street, Hoan Kiem, Hanoi",
            description:
              "Long-standing eatery known for clear, rich broth and a tidy, cozy space.",
            price: "Price: 30,000 – 55,000 VND/bowl.",
            image: "/assets/bunthang/baduc.png",
            mapUrl: "https://maps.google.com/?q=48+C%E1%BA%A7u+G%E1%BB%97+Hanoi",
          },
          {
            id: "bunthang-thuanly",
            name: "BUN THANG THUAN LY",
            address: "33 Hang Hom Street, Hoan Kiem, Hanoi",
            description:
              "Traditional flavors with well-balanced portions and an Old Quarter charm.",
            price: "Price: 30,000 – 40,000 VND/bowl.",
            image: "/assets/bunthang/hang2.png",
            mapUrl: "https://maps.google.com/?q=33+H%C3%A0ng+H%C3%B2m+Hanoi",
          },
          {
            id: "bunthang-tulun",
            name: "BUN THANG TU LUN",
            address: "5 Hang Trong Street, Hoan Kiem, Hanoi",
            description:
              "Unassuming, rustic eatery loved by locals for its comforting balance.",
            price: "Price: 25,000 – 45,000 VND/bowl.",
            image: "/assets/bunthang/tulun.png",
            mapUrl: "https://maps.google.com/?q=5+H%C3%A0ng+Tr%E1%BB%91ng+Hanoi",
          },
        ],
      },
      {
        id: "banhcuon",
        hero: {
          eyebrow: "Breakfast elegance",
          title: "BANH CUON HANOI",
          description:
            "Soft steamed rice rolls filled with minced pork and wood-ear mushrooms, topped with crispy shallots and herbs, then dipped in warm nuoc cham with a nostalgic hint of ca cuong essence. The gentle hiss of steaming cloth pans greets early risers at every corner stall. Once you dip the delicate roll into the sauce, the silky batter and savory filling melt into a comforting morning embrace.",
          image: "/assets/banhcuon/banhcuon.png",
          imageAlt: "Plate of Hanoi banh cuon",
          cta: "Explore banh cuon",
        },
        intro: {
          title: "VIDEO",
          body: "Watch how ultra-thin rice sheets, savory fillings, and sweet-savory sauce come together.",
        },
        video: {
          type: "local",
          src: "/assets/banhcuon/banhcuon.mp4",
          poster: "/assets/banhcuon/banhcuon.png",
          description: "Silky rice sheets, savoury fillings, and warm nuoc cham captured from steamer to plate.",
        },
        ingredientGallery: [
          {
            id: "banhcuon-steam",
            src: "/assets/banhcuon/botgao.png",
            caption: {
              vi: "Bột gạo được tráng mỏng trên khuôn vải",
              en: "Rice batter steamed into gossamer-thin sheets",
            },
            alt: {
              vi: "Nồi tráng bánh cuốn",
              en: "Steaming banh cuon sheets",
            },
          },
          {
            id: "banhcuon-filling",
            src: "/assets/banhcuon/thitheo.png",
            caption: {
              vi: "Nhân thịt heo xào mộc nhĩ đậm đà",
              en: "Savory minced pork and wood-ear mushroom filling",
            },
            alt: {
              vi: "Chảo nhân bánh cuốn",
              en: "Banh cuon filling in the pan",
            },
          },
          {
            id: "banhcuon-serve",
            src: "/assets/banhcuon/nuocnam.png",
            caption: {
              vi: "Bánh cuốn dùng kèm chả quế, rau thơm và nước chấm",
              en: "Served with Vietnamese ham, herbs, and nuoc cham",
            },
            alt: {
              vi: "Set bánh cuốn đủ món",
              en: "Plated banh cuon with accompaniments",
            },
          },
        ],
        ingredientsTitle: "Essential components",
        ingredientsList: [
          {
            iconClass: "fa-solid fa-bowl-rice",
            text: "Rice batter steamed into silky sheets.",
          },
          {
            iconClass: "fa-solid fa-drumstick-bite",
            text: "Minced pork, wood-ear mushrooms, and shallots for the filling.",
          },
          {
            iconClass: "fa-solid fa-pepper-hot",
            text: "Warm fish sauce dip with vinegar, sugar, garlic, chili, and optional ca cuong essence.",
          },
          {
            iconClass: "fa-solid fa-leaf",
            text: "Fresh herbs, blanched bean sprouts, and pickled veggies.",
          },
          {
            iconClass: "fa-solid fa-bacon",
            text: "Vietnamese ham, fermented pork, or pork floss as toppings.",
          },
        ],
        recipeTitle: "How Hanoians roll it",
        recipeSteps: [
          "Steam paper-thin rice sheets on a cloth-covered pot.",
          "Sauté pork, mushrooms, and shallots; spread over each sheet and roll tightly.",
          "Serve with warm nuoc cham, herbs, crispy shallots, and cha lua.",
        ],
        spotsTitle: "Where to eat banh cuon",
        spots: [
          {
            id: "banhcuon-baxuan",
            name: "BANH CUON BA XUAN",
            address: "Doc Hoe Nhai, Ba Dinh, Hanoi",
            description:
              "Family-run stall with soft rice rolls and friendly service.",
            price: "Price: 5,000 – 30,000 VND (≈ $0.57 – $1.15).",
            image: "/assets/banhcuon/hinh1.png",
            mapUrl: "https://maps.google.com/?q=D%E1%BB%91c+H%C3%B2e+Nhai+Hanoi",
          },
          {
            id: "banhcuon-thuykhue",
            name: "BANH CUON THUY KHUE",
            address: "Alley 29 Thuy Khue, Tay Ho, Hanoi",
            description:
              "Local favourite with balanced flavours and generous herbs.",
            price: "Price: 15,000 – 20,000 VND (≈ $0.57 – $0.77).",
            image: "/assets/banhcuon/hinh2.png",
            mapUrl: "https://maps.google.com/?q=29+Th%E1%BB%A5y+Khu%C3%AA+Hanoi",
          },
          {
            id: "banhcuon-bahanh",
            name: "BANH CUON BA HANH",
            address: "16B Tho Xuong, Hoan Kiem, Hanoi",
            description:
              "Tucked near St. Joseph’s Cathedral, this clean eatery serves comforting rolls.",
            price: "Price: 25,000 – 40,000 VND (≈ $0.96 – $1.53).",
            image: "/assets/banhcuon/hinh3.png",
            mapUrl: "https://maps.google.com/?q=16B+Th%E1%BB%8D+X%C6%B0%C6%A1ng+Hanoi",
          },
        ],
      },

      {
        id: "xoi",
        hero: {
          eyebrow: "Comfort in every bite",
          title: "HANOI STICKY RICE",
          description:
            "In Hanoi, xoi—sticky rice—is more than food; it is living heritage. From dawn street corners to late-night alleys, steaming bundles wrapped in banana leaves accompany locals through every stage of life. Each packet reveals a story: silky rice crowned with golden mung beans and crispy shallots, savoury chicken or braised pork, or sweet coconut, peanut, and sesame. Simple yet deeply satisfying, it is the warm, timeless soul of Hanoi.",
          image: "/assets/xoi/xoi-hero.png",
          imageAlt: "Steaming basket of Hanoi sticky rice",
          cta: "Experience Hanoi xoi",
        },
        intro: {
          title: "VIDEO",
          body: "Follow Hanoi’s sticky rice vendors from steaming the grains to wrapping fragrant servings.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/udmWMcekReY?autoplay=1&mute=1&rel=0",
          poster: "/assets/xoi/xoi-hero.png",
          description: "A sensory journey of fragrant rice, colourful toppings, and Hanoi’s morning rhythm.",
        },
        ingredientGallery: [
          {
            id: "xoi-glutinous",
            src: "/assets/xoi/xoi-nep.png",
            caption: {
              vi: "Nếp cái hoa vàng đồ chín mềm, hạt tơi mà dẻo",
              en: "Golden glutinous rice steamed until tender and fragrant",
            },
            alt: {
              vi: "Nồi xôi nếp vừa đồ",
              en: "Freshly steamed sticky rice",
            },
          },
          {
            id: "xoi-toppings-savory",
            src: "/assets/xoi/xoi-man.png",
            caption: {
              vi: "Topping đậm đà như thịt gà, thịt kho, chả lụa",
              en: "Savory toppings like shredded chicken, caramelized pork, and pork roll",
            },
            alt: {
              vi: "Đĩa xôi mặn với thịt và trứng",
              en: "Sticky rice with savory toppings",
            },
          },
          {
            id: "xoi-toppings-sweet",
            src: "/assets/xoi/xoi-ngot.png",
            caption: {
              vi: "Phiên bản ngọt với dừa nạo, đậu phộng và mè rang",
              en: "Sweet versions with coconut shavings, peanuts, and sesame",
            },
            alt: {
              vi: "Xôi ngọt rắc dừa và mè",
              en: "Sweet sticky rice with coconut and sesame",
            },
          },
        ],
        ingredientsTitle: "Flavours that connect",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Steamed golden sticky rice infused with banana-leaf aroma." },
          { iconClass: "fa-solid fa-seedling", text: "Mung beans, roasted sesame, and peanuts for nutty richness." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Shredded chicken, braised pork, and pork roll for hearty bites." },
          { iconClass: "fa-solid fa-ice-cream", text: "Coconut shavings and sugar for comforting sweet variations." },
          { iconClass: "fa-solid fa-leaf", text: "Banana leaves that keep each parcel warm and fragrant." },
        ],
        recipeTitle: "How locals enjoy it",
        recipeSteps: [
          "Soak glutinous rice overnight, then steam with banana leaves for extra fragrance.",
          "Prepare toppings: mashed mung beans, crispy shallots, braised meats, coconut, and sesame.",
          "Scoop hot sticky rice onto banana leaves, add favourite toppings, and savour while it steams.",
        ],
        spotsTitle: "Where to try sticky rice in Hanoi",
        spots: [
          {
            id: "xoi-yen",
            name: "XOI YEN",
            address: "35B Nguyen Huu Huan, Hoan Kiem",
            description:
              "The city’s most famous xoi xeo with mung beans and crispy shallots, open from morning till night.",
            price: "Price: 25,000 – 45,000 VND (~1 – 1.9 USD).",
            image: "/assets/xoi/xoi-yen.png",
            mapUrl: "https://maps.google.com/?q=35B+Nguy%E1%BB%85n+H%E1%BB%AFu+H%C3%A2n+H%E1%BB%93n+Ki%E1%BA%BFm",
          },
          {
            id: "xoi-ba-thu",
            name: "XOI BA THU",
            address: "57 Tho Nhuom, Hoan Kiem",
            description:
              "Beloved for shredded chicken and braised pork toppings—hearty, flavourful, and affordable.",
            price: "Price: 25,000 – 40,000 VND (~1 – 1.7 USD).",
            image: "/assets/xoi/xoi-ba-thu.png",
            mapUrl: "https://maps.google.com/?q=57+Th%E1%BB%A3+Nhu%E1%BB%99m+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "xoi-cat-lam",
            name: "XOI CAT LAM",
            address: "24B Duong Thanh, Hoan Kiem",
            description:
              "A traditional favourite serving classics like xoi xeo and xoi ngo with consistent quality.",
            price: "Price: 20,000 – 50,000 VND (~0.8 – 2 USD).",
            image: "/assets/xoi/xoi-cat-lam.png",
            mapUrl: "https://maps.google.com/?q=24B+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
        ],
      },
      {
        id: "bunrieu",
        hero: {
          eyebrow: "Crab comfort",
          title: "HANOI BUN RIEU",
          description:
            "A bowl of bun rieu in Hanoi is a feast for the senses. The broth is light yet brimming with the sweetness of fresh field crab and a gentle tomato tang. Silky rice noodles, tofu, pork, and vibrant herbs absorb every flavour, making each spoonful bright, savoury, and deeply satisfying.",
          image: "/assets/bunrieu/bunrieu-hero.png",
          imageAlt: "Hanoi crab noodle soup",
          cta: "Taste bun rieu",
        },
        intro: {
          title: "VIDEO",
          body: "Follow the making of Hanoi bun rieu—from simmering the crab broth to finishing with fresh herbs.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/zXgwTTiysUA?autoplay=1&mute=1&rel=0",
          poster: "/assets/bunrieu/bunrieu-hero.png",
          description: "Delicate crab curds, ruby tomatoes, and fragrant herbs coming together in one bowl.",
        },
        ingredientGallery: [
          {
            id: "bunrieu-crab",
            src: "/assets/bunrieu/gach-cua.png",
            caption: {
              vi: "Gạch cua đồng xay nhuyễn tạo phần riêu bông mềm",
              en: "Fresh crab paste whipped into fluffy curds",
            },
            alt: {
              vi: "Gạch cua đồng đã được xay",
              en: "Prepared crab paste",
            },
          },
          {
            id: "bunrieu-broth",
            src: "/assets/bunrieu/nouoc-dung.png",
            caption: {
              vi: "Nước dùng trong thanh với cà chua và giấm bỗng",
              en: "Clear tomato broth with rice vinegar brightness",
            },
            alt: {
              vi: "Nồi nước bún riêu đang sôi",
              en: "Simmering bun rieu broth",
            },
          },
          {
            id: "bunrieu-garnish",
            src: "/assets/bunrieu/topping.png",
            caption: {
              vi: "Đậu phụ rán, thịt heo và rau thơm làm topping",
              en: "Tofu, pork, and herbs waiting to top the noodles",
            },
            alt: {
              vi: "Đĩa topping bún riêu",
              en: "Bun rieu toppings platter",
            },
          },
        ],
        ingredientsTitle: "Signature flavours",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Fresh crab paste lending natural sweetness to the broth." },
          { iconClass: "fa-solid fa-tomato", text: "Tomatoes and rice vinegar for gentle acidity and colour." },
          { iconClass: "fa-solid fa-cheese", text: "Soft tofu and fried tofu cubes soaking up the soup." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Pork, pork ribs, or cartilage for hearty bites." },
          { iconClass: "fa-solid fa-leaf", text: "Herbs, shredded morning glory, and perilla for a fresh finish." },
        ],
        recipeTitle: "How locals enjoy it",
        recipeSteps: [
          "Extract crab paste, simmer gently, and skim the delicate curds.",
          "Stir-fry tomatoes, add to the broth with rice vinegar, and season to taste.",
          "Blanch noodles, top with tofu, pork, and crab curds, ladle hot broth, and garnish with herbs.",
        ],
        spotsTitle: "Bun rieu to try",
        spots: [
          {
            id: "bunrieu-huyen-thu",
            name: "BUN RIEU HUYEN THU",
            address: "2F Quang Trung Street, Hoan Kiem",
            description:
              "Over 30 years of serving warmly crafted bowls with time-honoured flavours and friendly service.",
            price: "Price: 45,000 – 90,000 VND.",
            image: "/assets/bunrieu/huyen-thu.png",
            mapUrl: "https://maps.google.com/?q=2F+Quang+Trung+Hanoi",
          },
          {
            id: "bunrieu-trang",
            name: "BUN RIEU SUON SUN TRANG",
            address: "23 Nguyen Sieu Street, Hoan Kiem",
            description:
              "Beloved for tender pork ribs and crunchy cartilage that elevate the classic broth.",
            price: "Price: 30,000 – 75,000 VND.",
            image: "/assets/bunrieu/trang.png",
            mapUrl: "https://maps.google.com/?q=23+Nguyen+Sieu+Hanoi",
          },
          {
            id: "bunrieu-be-be",
            name: "BUN RIEU BE BE",
            address: "608 Lac Long Quan, Tay Ho",
            description:
              "Adds sweet mantis shrimp to classic crab broth for a lakeside twist that locals adore.",
            price: "Price: 60,000 – 75,000 VND.",
            image: "/assets/bunrieu/be-be.png",
            mapUrl: "https://maps.google.com/?q=608+Lac+Long+Quan+Hanoi",
          },
        ],
      },
      {
        id: "cha-ca",
        hero: {
          eyebrow: "Century-old icon",
          title: "HANOI CHA CA",
          description:
            "Cha ca is one of Hanoi’s century-old treasures. Turmeric-marinated fish is grilled and then sizzled tableside with dill and scallions. The aroma fills the room while diners pair the fish with vermicelli, roasted peanuts, herbs, and a splash of shrimp paste for perfect harmony.",
          image: "/assets/chaca/chaca.png",
          imageAlt: "Sizzling pan of Hanoi cha ca with dill",
          cta: "Savor cha ca",
        },
        intro: {
          title: "VIDEO",
          body: "Watch Hanoi’s signature cha ca from the grill to the sizzling tableside pan.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/TWX9MaOJ7TQ?autoplay=1&mute=1&rel=0",
          poster: "/assets/chaca/chaca.png",
          description: "Turmeric fish, vibrant dill, and the sizzling spectacle of Hanoi’s famed cha ca.",
        },
        ingredientGallery: [
          {
            id: "chaca-fish",
            src: "/assets/chaca/ca-lang.png",
            caption: {
              vi: "Cá lăng hoặc cá quả phi lê tươi, ướp nghệ và mắm tôm",
              en: "Fresh catfish fillets marinated with turmeric and shrimp paste",
            },
            alt: {
              vi: "Miếng cá chả cá được ướp vàng",
              en: "Golden marinated fish for cha ca",
            },
          },
          {
            id: "chaca-pan",
            src: "/assets/chaca/chao-chaca.png",
            caption: {
              vi: "Chảo chả cá sôi sùng sục cùng thì là và hành lá",
              en: "Sizzling pan of cha ca with dill and scallions",
            },
            alt: {
              vi: "Chảo chả cá đang xào tại bàn",
              en: "Cha ca pan cooking tableside",
            },
          },
          {
            id: "chaca-serving",
            src: "/assets/chaca/cha-ca-set.png",
            caption: {
              vi: "Set chả cá ăn kèm bún, rau thơm, lạc rang và mắm tôm",
              en: "Cha ca platter with vermicelli, herbs, peanuts, and dipping sauces",
            },
            alt: {
              vi: "Mâm chả cá đầy đủ topping",
              en: "Cha ca serving tray",
            },
          },
        ],
        ingredientsTitle: "Signature components",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Firm catfish fillets marinated with turmeric, galangal, and shrimp paste." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Dill, scallions, and roasted peanuts stirred through the sizzling pan." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Rice vermicelli, herbs, and crisp rice crackers to accompany each bite." },
          { iconClass: "fa-solid fa-mug-hot", text: "Shrimp paste or fish sauce brightened with lime, chili, and garlic." },
          { iconClass: "fa-solid fa-leaf", text: "Fresh herbs and pickled greens to balance the richness." },
        ],
        recipeTitle: "How to enjoy it",
        recipeSteps: [
          "Marinate fish for at least two hours, then grill until lightly charred.",
          "Reheat in a sizzling pan with dill and scallions until fragrant.",
          "Serve hot with vermicelli, herbs, roasted peanuts, and shrimp paste dressing.",
        ],
        spotsTitle: "Where to taste cha ca",
        spots: [
          {
            id: "chaca-la-vong",
            name: "CHA CA LA VONG",
            address: "14 Cha Ca Street, Hoan Kiem",
            description:
              "The original institution serving century-old recipes and tableside sizzling pans.",
            price: "Price: 120,000 – 150,000 VND (~5 – 6.2 USD).",
            image: "/assets/chaca/1.png",
            mapUrl: "https://maps.google.com/?q=14+Ch%E1%BA%A3+C%C3%A1+Hanoi",
          },
          {
            id: "chaca-thang-long",
            name: "CHA CA THANG LONG",
            address: "21 Duong Thanh Street, Hoan Kiem",
            description:
              "Spacious and lively—ideal for groups—with well-seasoned fish and fresh herbs.",
            price: "Price: 100,000 – 130,000 VND (~4.2 – 5.4 USD).",
            image: "/assets/chaca/2.png",
            mapUrl: "https://maps.google.com/?q=21+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh+Hanoi",
          },
          {
            id: "chaca-anh-vu",
            name: "CHA CA ANH VU",
            address: "120–122 K1 Giang Vo, Ba Dinh",
            description:
              "Modern yet authentic, renowned for fresh fish and balanced flavors.",
            price: "Price: 120,000 – 150,000 VND (~5 – 6.2 USD).",
            image: "/assets/chaca/3.png",
            mapUrl: "https://maps.google.com/?q=120+K1+Gi%E1%BA%A3ng+V%C3%B5+Hanoi",
          },
          {
            id: "chaca-ha-thanh",
            name: "CHA CA HA THANH",
            address: "20 Nguyen Van Huyen, Cau Giay",
            description:
              "Contemporary presentation that keeps tradition alive with every sizzling pan.",
            price: "Price: 100,000 – 140,000 VND (~4.2 – 5.8 USD).",
            image: "/assets/chaca/ha-thanh.png",
            mapUrl: "https://maps.google.com/?q=20+Nguy%E1%BB%85n+V%C4%83n+Huy%C3%AAn+Hanoi",
          },
        ],
      },
    ],
  },
};

const STORAGE_KEY = "foodie_map_clicks";

export default function Foods() {
  const { language } = useLanguage();
  const content = useMemo(() => FOODS_COPY[language], [language]);
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
      // ignore storage errors
    }
  }, [clickStats]);

  useAutoPlayVideos();

  useEffect(() => {
    const videos = document.querySelectorAll(".foods-video__player");
    if (!videos.length) return undefined;

    const applyNativeSettings = (video) => {
      video.muted = true;
      video.playsInline = true;
    };

    if (!("IntersectionObserver" in window)) {
      videos.forEach((video) => {
        applyNativeSettings(video);
        video.play().catch(() => {});
      });
      return undefined;
    }

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.55,
    });

    videos.forEach((video) => {
      applyNativeSettings(video);
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  const handleMapClick = (spot) => () => {
    setClickStats((prev) => {
      const next = { ...prev, [spot.id]: (prev[spot.id] || 0) + 1 };
      return next;
    });
    recordClickEvent({
      category: "foods",
      id: spot.id,
      name: spot.name,
      mapUrl: spot.mapUrl,
    });
    window.open(spot.mapUrl, "_blank", "noopener,noreferrer");
  };

  const scrollToDetails = (anchorId) => {
    const target = document.getElementById(anchorId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderVideoPlayer = (dish) => {
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
                    onClick={() => scrollToDetails(`${dish.id}-details`)}
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
                  {renderVideoPlayer(dish)}
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
                        to={`/spot/foods/${spot.id}`}
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
