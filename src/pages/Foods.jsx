import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useAutoPlayVideos from "../hooks/useAutoPlayVideos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import "../styles/foods.css";
import { aggregateEventCounts, recordClickEvent } from "../utils/clickTracker.js";
import { fetchClickEvents } from "../utils/supabaseApi.js";

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
            name: "Phở Bát Đàn",
            address: "49 Bát Đàn, quận Hoàn Kiếm, Hà Nội",
            description:
              "Phở Bát Đàn gắn liền với phố cổ nhờ nước dùng trong veo, thịt bò mềm và truyền thống xếp hàng, tự phục vụ để giữ đúng hương vị xưa.",
            image: "/assets/pho/pho-batdan.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+B%C3%A1t+%C4%90%C3%A0n",
          },
          {
            id: "pho-thin",
            name: "Phở Thìn Lò Đúc",
            address: "13 Lò Đúc, quận Hai Bà Trưng, Hà Nội",
            description:
              "Quán nổi tiếng với bí quyết xào nhanh thịt bò trên lửa lớn trước khi chan nước dùng, tạo nên vị béo ngậy khác biệt.",
            image: "/assets/pho/pho-thin.png",
            mapUrl: "https://maps.google.com/?q=Ph%E1%BB%9F+Th%C3%ACn+L%C3%B2+%C4%90%C3%BAc",
          },
          {
            id: "pho-lyquocsu",
            name: "Phở 10 Lý Quốc Sư",
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
          eyebrow: "Đặc sản miền Trung",
          title: "NEM NƯỚNG NHA TRANG",
          description:
            "Nem nướng Nha Trang được giã nhuyễn từ thịt heo, quết dẻo rồi nướng trên than hồng cho thơm lừng, mặt ngoài xém nhẹ mà bên trong vẫn mọng ngọt. Gắp miếng nem nóng, cuốn cùng bánh tráng, rau sống, đồ chua và rưới nước chấm đậu phộng béo ngậy – sự hòa quyện ngọt, mặn, bùi khiến ai thưởng thức cũng nhớ mãi.",
          image: "/assets/nemnuong/nem.jpg",
          imageAlt: "Nem nướng Nha Trang ăn kèm bánh tráng và rau sống",
          cta: "Thưởng thức nem nướng",
        },
        intro: {
          title: "VIDEO",
          body: "Quy trình quết, nướng và cuốn nem nướng Nha Trang cùng rau tươi hấp dẫn.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/NVzRMbREV_c?autoplay=1&mute=1&rel=0",
          description: "Nem nướng được tạo hình, nướng trên than và thưởng thức cùng nước chấm đậu phộng béo thơm.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Thành phần tạo nên hương vị",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt heo xay quện mỡ, tỏi và gia vị, quết tay cho thật dẻo." },
          { iconClass: "fa-solid fa-fire", text: "Than hoa giúp mặt ngoài xém vàng, giữ phần nhân vẫn ngọt mềm." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, xà lách, xoài xanh tạo độ giòn và vị thanh." },
          { iconClass: "fa-solid fa-bread-slice", text: "Bánh tráng mỏng dai để ôm trọn phần nhân và rau." },
          { iconClass: "fa-solid fa-bowl-food", text: "Nước chấm đậu phộng béo thơm làm nên điểm nhấn khó quên." },
        ],
        recipeTitle: "Cách thưởng thức trọn vị",
        recipeSteps: [
          "Nướng xiên nem trên bếp than, trở đều tay tới khi vàng thơm.",
          "Trải bánh tráng, xếp rau, đồ chua rồi đặt nem nướng nóng hổi lên trên.",
          "Cuốn chặt tay, chấm nước chấm đậu phộng và thưởng thức khi còn nóng.",
        ],
        spotsTitle: "Địa chỉ nem nướng Hà Nội nên thử",
        spots: [
          {
            id: "nemnuong-vukhanh",
            name: "NEM NƯỚNG NHA TRANG VŨ KHÁNH",
            address: "90 Trần Hưng Đạo, Hoàn Kiếm",
            description:
              "Không gian rộng rãi, xiên nem nướng thơm lừng, rau sống đầy đặn và nước chấm béo ngậy.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/1.png",
            mapUrl: "https://maps.google.com/?q=90+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Hanoi",
          },
          {
            id: "nemnuong-hangbong",
            name: "NEM NƯỚNG NHA TRANG",
            address: "39 Hàng Bông, Hoàn Kiếm",
            description:
              "Quán phố cổ quen thuộc, nem nướng được cuốn tại bàn và phục vụ nóng hổi.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/2.png",
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+B%C3%B4ng+Hanoi",
          },
          {
            id: "nemnuong-hanh",
            name: "NEM NƯỚNG NHA TRANG HẠNH",
            address: "23 Nguyễn Thái Học, Ba Đình",
            description:
              "Được dân địa phương yêu thích nhờ xiên nem mọng, nước chấm béo và phục vụ nhanh nhẹn.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/3.png",
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+Hanoi",
          },
        ],
      },
      {
        id: "lau-cua-dong",
        hero: {
          eyebrow: "Ấm áp hương quê",
          title: "LẨU CUA ĐỒNG MIỀN BẮC",
          description:
            "Lẩu cua đồng mang trọn tinh túy đồng quê miền Bắc: nước dùng từ cua đồng ngọt thanh, gạch cua béo ngậy nổi óng vàng và chút chua nhẹ từ dấm bỗng. Những ngày Hà Nội se lạnh, quây quần bên nồi lẩu nghi ngút khói, nhúng thịt, rau rồi chan bún là trải nghiệm ấm lòng khó quên.",
          image: "/assets/laucua/laucua.png",
          imageAlt: "Nồi lẩu cua đồng Việt Nam bốc khói nghi ngút",
          cta: "Quây quần bên nồi lẩu cua",
        },
        intro: {
          title: "VIDEO",
          body: "Nồi lẩu cua đồng sôi sùng sục với gạch cua vàng ươm và nhiều món nhúng tươi ngon.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu nổi bật",
        ingredientsList: [
          { iconClass: "fa-solid fa-crab", text: "Cua đồng tươi giã lọc thủ công cho nước dùng ngọt thanh." },
          { iconClass: "fa-solid fa-bowl-food", text: "Gạch cua óng vàng tạo màu sắc đẹp mắt và vị béo bùi." },
          { iconClass: "fa-solid fa-mug-hot", text: "Dấm bỗng, cà chua, mắm tôm cho vị chua dịu và đậm đà." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt bò, giò sống, đậu phụ, chả quế… sẵn sàng để nhúng." },
          { iconClass: "fa-solid fa-leaf", text: "Rau muống, rau cần, hoa chuối thái mỏng mang lại độ tươi mát." },
        ],
        recipeTitle: "Cách thưởng thức đúng điệu",
        recipeSteps: [
          "Ninh nước cua cùng cà chua, dấm bỗng tới khi gạch nổi vàng mặt nước.",
          "Bày thịt, đậu, rau ra đĩa để mọi người nhúng theo ý thích.",
          "Thêm topping vào nồi sôi, chan cùng bún hoặc miến và thưởng thức khi còn nóng.",
        ],
        spotsTitle: "Quán lẩu cua đồng ở Hà Nội",
        spots: [
          {
            id: "laucua-685",
            name: "LẨU CUA ĐỒNG 685",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Không gian ấm cúng phong cách miền Bắc, nước lẩu ngọt thanh, gạch cua nhiều và đồ nhúng phong phú.",
            price: "Giá: 250.000 – 400.000đ/nồi.",
            image: "/assets/laucua/1.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-songha",
            name: "LẨU CUA ĐỒNG SÔNG HÀ",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Hương vị chuẩn Bắc với nước lẩu nhẹ nhàng, vừa miệng và phần nhúng đầy đặn.",
            price: "Giá: 150.000 – 300.000đ/người.",
            image: "/assets/laucua/2.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-chinhbeo",
            name: "LẨU CUA ĐỒNG CHINH BÉO",
            address: "Khu 20A Văn Phú, Hà Đông",
            description:
              "Quán bình dân tại Hà Đông, nổi tiếng lẩu cua đậm đà, nguyên liệu tươi và nồi vừa đủ cho nhóm nhỏ.",
            price: "Giá: 220.000 – 350.000đ/nồi.",
            image: "/assets/laucua/3.png",
            mapUrl: "https://maps.google.com/?q=Khu+%C4%91%E1%BB%8Bnh+c%C6%B0+V%C4%83n+Ph%C3%BA+Hanoi",
          },
        ],
      },
      {
        id: "nemnuong",
        hero: {
          eyebrow: "Đặc sản miền Trung",
          title: "NEM NƯỚNG NHA TRANG",
          description:
            "Nem nướng Nha Trang được giã nhuyễn từ thịt heo, quết dẻo rồi nướng trên than hồng cho thơm lừng, mặt ngoài xém nhẹ mà bên trong vẫn mọng ngọt. Gắp miếng nem nóng, cuốn cùng bánh tráng, rau sống, đồ chua và rưới nước chấm đậu phộng béo ngậy – sự hòa quyện ngọt, mặn, bùi khiến ai thưởng thức cũng nhớ mãi.",
          image: "/assets/nemnuong/nem.jpg",
          imageAlt: "Nem nướng Nha Trang ăn kèm bánh tráng và rau sống",
          cta: "Tự cuốn nem nướng ngon chuẩn",
        },
        intro: {
          title: "VIDEO",
          body: "Quy trình quết, nướng và cuốn nem nướng Nha Trang cùng rau tươi hấp dẫn.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/NVzRMbREV_c?autoplay=1&mute=1&rel=0",
          description: "Nem nướng được tạo hình, nướng trên than và thưởng thức cùng nước chấm đậu phộng béo thơm.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Thành phần tạo nên hương vị",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt heo xay quện mỡ, tỏi và gia vị, quết tay cho thật dẻo." },
          { iconClass: "fa-solid fa-fire", text: "Than hoa giúp mặt ngoài xém vàng, giữ phần nhân vẫn ngọt mềm." },
          { iconClass: "fa-solid fa-leaf", text: "Rau sống, xà lách, xoài xanh tạo độ giòn và vị thanh." },
          { iconClass: "fa-solid fa-bread-slice", text: "Bánh tráng mỏng dai để ôm trọn phần nhân và rau." },
          { iconClass: "fa-solid fa-bowl-food", text: "Nước chấm đậu phộng béo thơm làm nên điểm nhấn khó quên." },
        ],
        recipeTitle: "Cách thưởng thức trọn vị",
        recipeSteps: [
          "Nướng xiên nem trên bếp than, trở đều tay tới khi vàng thơm.",
          "Trải bánh tráng, xếp rau, đồ chua rồi đặt nem nướng nóng hổi lên trên.",
          "Cuốn chặt tay, chấm nước chấm đậu phộng và thưởng thức khi còn nóng.",
        ],
        spotsTitle: "Địa chỉ nem nướng Hà Nội nên thử",
        spots: [
          {
            id: "nemnuong-vukhanh",
            name: "Nem nướng Nha Trang Vũ Khánh",
            address: "90 Trần Hưng Đạo, Hoàn Kiếm",
            description:
              "Không gian rộng rãi, xiên nem nướng thơm lừng, rau sống đầy đặn và nước chấm béo ngậy.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/1.png",
            mapUrl: "https://maps.google.com/?q=90+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Hanoi",
          },
          {
            id: "nemnuong-hangbong",
            name: "Nem nướng Nha Trang Hàng Bông",
            address: "39 Hàng Bông, Hoàn Kiếm",
            description:
              "Quán phố cổ quen thuộc, nem nướng được cuốn tại bàn và phục vụ nóng hổi.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/2.png",
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+B%C3%B4ng+Hanoi",
          },
          {
            id: "nemnuong-hanh",
            name: "Nem nướng Nha Trang Hạnh",
            address: "23 Nguyễn Thái Học, Ba Đình",
            description:
              "Được dân địa phương yêu thích nhờ xiên nem mọng, nước chấm béo và phục vụ nhanh nhẹn.",
            price: "Giá: 50.000 – 80.000đ/phần.",
            image: "/assets/nemnuong/3.png",
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+Hanoi",
          },
        ],
      },
      {
        id: "lau-cua-dong",
        hero: {
          eyebrow: "Ấm áp hương quê",
          title: "LẨU CUA ĐỒNG MIỀN BẮC",
          description:
            "Lẩu cua đồng mang trọn tinh túy đồng quê miền Bắc: nước dùng từ cua đồng ngọt thanh, gạch cua béo ngậy nổi óng vàng và chút chua nhẹ từ dấm bỗng. Những ngày Hà Nội se lạnh, quây quần bên nồi lẩu nghi ngút khói, nhúng thịt, rau rồi chan bún là trải nghiệm ấm lòng khó quên.",
          image: "/assets/laucua/laucua.png",
          imageAlt: "Nồi lẩu cua đồng Việt Nam bốc khói nghi ngút",
          cta: "Quây quần bên nồi lẩu cua",
        },
        intro: {
          title: "VIDEO",
          body: "Nồi lẩu cua đồng sôi sùng sục cùng gạch cua vàng óng và nhiều món nhúng tươi ngon.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu nổi bật",
        ingredientsList: [
          { iconClass: "fa-solid fa-crab", text: "Cua đồng tươi giã lọc thủ công cho nước dùng ngọt tự nhiên." },
          { iconClass: "fa-solid fa-bowl-food", text: "Gạch cua óng vàng tạo màu sắc đẹp mắt và vị béo bùi." },
          { iconClass: "fa-solid fa-mug-hot", text: "Dấm bỗng, cà chua, mắm tôm cho vị chua dịu và đậm đà." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt bò, giò sống, đậu phụ, chả quế… sẵn sàng để nhúng." },
          { iconClass: "fa-solid fa-leaf", text: "Rau muống, rau cần, hoa chuối thái mỏng mang lại độ tươi mát." },
        ],
        recipeTitle: "Cách thưởng thức đúng điệu",
        recipeSteps: [
          "Ninh nước cua cùng cà chua, dấm bỗng tới khi gạch nổi vàng mặt nước.",
          "Bày thịt, đậu, rau ra đĩa để mọi người nhúng theo ý thích.",
          "Thêm topping vào nồi sôi, chan cùng bún hoặc miến và thưởng thức khi còn nóng.",
        ],
        spotsTitle: "Quán lẩu cua đồng ở Hà Nội",
        spots: [
          {
            id: "laucua-685",
            name: "Lẩu cua đồng 685",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Không gian ấm cúng phong cách miền Bắc, nước lẩu ngọt thanh, gạch cua nhiều và đồ nhúng phong phú.",
            price: "Giá: 250.000 – 400.000đ/nồi.",
            image: "/assets/laucua/1.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-songha",
            name: "Lẩu cua đồng Sông Hà",
            address: "685 Lạc Long Quân, Tây Hồ",
            description:
              "Hương vị chuẩn Bắc với nước lẩu nhẹ nhàng, vừa miệng và phần nhúng đầy đặn.",
            price: "Giá: 150.000 – 300.000đ/người.",
            image: "/assets/laucua/2.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-chinhbeo",
            name: "Lẩu cua đồng Chinh Béo",
            address: "20A Khu đô thị Văn Phú, Hà Đông",
            description:
              "Quán bình dân tại Hà Đông, nổi tiếng lẩu cua đậm đà, nguyên liệu tươi và nồi vừa đủ cho nhóm nhỏ.",
            price: "Giá: 220.000 – 350.000đ/nồi.",
            image: "/assets/laucua/3.png",
            mapUrl: "https://maps.google.com/?q=Khu+%C4%91%E1%BB%8Bnh+c%C6%B0+V%C4%83n+Ph%C3%BA+Hanoi",
          },
        ],
      },
      {
        id: "chao-trai",
        hero: {
          eyebrow: "Ấm lòng trong từng muỗng",
          title: "CHÁO TRAI HÀ NỘI",
          description:
            "Cháo trai là món quà bình dị của người Hà Nội: gạo xay được nấu chín cùng nước luộc trai ngọt thanh, trên mặt điểm thêm trai xào hành phi, mắm và tiêu thơm nồng. Mỗi muỗng cháo đều nhẹ nhàng, đậm đà và khiến người ăn thấy ấm bụng giữa ngày se lạnh.",
          image: "/assets/chaotrai/chaotrai.png",
          imageAlt: "Bát cháo trai nóng hổi",
          cta: "Thưởng thức cháo trai",
        },
        intro: {
          title: "VIDEO",
          body: "Gạo nấu cùng nước trai ngọt mát, chan thêm trai xào và rau thơm chuẩn vị phố cổ.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/JQhFY7_CiSs?autoplay=1&mute=1&rel=0",
          description: "Cách nấu cháo trai Hà Nội với trai tươi và hành phi vàng ruộm.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Gạo tẻ xay nhỏ được ninh tới khi sánh mịn." },
          { iconClass: "fa-solid fa-water", text: "Nước luộc trai ngọt thanh làm nền." },
          { iconClass: "fa-solid fa-fish", text: "Thịt trai xào hành, mắm, tiêu dậy mùi." },
          { iconClass: "fa-solid fa-onion", text: "Hành phi vàng giòn thơm lừng." },
          { iconClass: "fa-solid fa-leaf", text: "Rau răm, tía tô thái nhỏ cho vị mát." },
        ],
        recipeTitle: "Cách thưởng thức",
        recipeSteps: [
          "Luộc trai lấy nước, nhặt sạch phần thịt trai.",
          "Ninh gạo xay với nước trai tới khi sánh mịn và nêm nhẹ.",
          "Múc cháo ra bát, cho trai xào, hành phi, rau thơm và rắc tiêu rồi dùng nóng." ,
        ],
        spotsTitle: "Quán cháo trai nên ghé",
        spots: [
          {
            id: "chaotrai-colan",
            name: "Cháo Trai Cô Lan",
            address: "34 Nguyen Van To, Hoan Kiem",
            description:
              "Gánh hàng chiều nổi tiếng với cháo sánh mịn và mùi rau thơm dễ chịu." ,
            price: "Giá: 10.000 – 15.000đ/bát.",
            image: "/assets/chaotrai/1.png",
            mapUrl: "https://maps.google.com/?q=34+Nguy%E1%BB%85n+V%C4%83n+T%E1%BB%91+Hanoi",
          },
          {
            id: "chaotrai-trankhatchan",
            name: "Cháo Trai 321 Trần Khát Chân",
            address: "321 Tran Khat Chan, Hai Ba Trung",
            description:
              "Quán ăn sáng muộn được yêu thích nhờ nước cháo đậm đà và topping đầy đặn." ,
            price: "Giá: 20.000 – 25.000đ/bát.",
            image: "/assets/chaotrai/2.png",
            mapUrl: "https://maps.google.com/?q=321+Tr%E1%BA%A7n+Kh%C3%A1t+Ch%C3%A2n+Hanoi",
          },
          {
            id: "chaotrai-cohang",
            name: "Cháo Trai Cô Hằng",
            address: "C2 Trung Tu, Dong Da",
            description:
              "Quán gia đình bán cả ngày với bát cháo trai nóng hổi, vừa miệng." ,
            price: "Giá: 27.000đ/bát.",
            image: "/assets/chaotrai/3.png",
            mapUrl: "https://maps.google.com/?q=C2+Trung+T%E1%BB%B1+Hanoi",
          },
        ],
      },
      {
        id: "chao-suon",
        hero: {
          eyebrow: "Bữa sáng kinh điển",
          title: "CHÁO SƯỜN HÀ NỘI",
          description:
            "Cháo sườn là món ăn sáng quen thuộc của người Hà Nội: bột gạo được nấu cùng nước xương sườn tới khi mịn sánh, phía trên là thịt sườn mềm tách xương, hành phi thơm và quẩy giòn. Bát cháo nóng hổi mang lại cảm giác ấm áp, dễ chịu như bữa sáng ở nhà.",
          image: "/assets/chaosuon/chaosuon.png",
          imageAlt: "Bát cháo sườn kèm quẩy giòn",
          cta: "Khởi đầu ngày mới với cháo sườn",
        },
        intro: {
          title: "VIDEO",
          body: "Cháo sườn sánh mịn nấu từ bột gạo và xương sườn, hoàn thiện với topping quen thuộc.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/ZneH5LsyYBo?autoplay=1&mute=1&rel=0",
          description: "Cách nấu cháo sườn Hà Nội mềm mịn, đậm vị xương.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-bone", text: "Xương sườn heo hầm lâu cho nước ngọt thanh." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Bột gạo được khuấy liên tục tới khi mịn mượt." },
          { iconClass: "fa-solid fa-onion", text: "Hành phi thơm và tiêu xay tạo hương." },
          { iconClass: "fa-solid fa-bread-slice", text: "Quẩy nóng giòn để ăn kèm." },
          { iconClass: "fa-solid fa-leaf", text: "Hành lá, mùi tàu thái nhỏ rắc lên trên." },
        ],
        recipeTitle: "Thưởng thức tròn vị",
        recipeSteps: [
          "Hầm xương sườn lấy nước dùng trong và ngọt.",
          "Khuấy bột gạo vào nồi nước xương, nấu nhỏ lửa tới khi sánh mịn.",
          "Múc cháo ra bát, thêm thịt sườn, hành phi, quẩy và rắc tiêu rồi thưởng thức ngay." ,
        ],
        spotsTitle: "Địa chỉ cháo sườn nên thử",
        spots: [
          {
            id: "chaosuon-cola",
            name: "Cháo Sườn Cô La",
            address: "2A Ly Quoc Su, Hoan Kiem",
            description:
              "Quán phố cổ lâu đời, cháo mịn và phục vụ cả sáng lẫn chiều." ,
            price: "Giá: 15.000 – 25.000đ/bát.",
            image: "/assets/chaosuon/1.png",
            mapUrl: "https://maps.google.com/?q=2A+L%C3%BD+Qu%E1%BB%91c+S%C6%B2+Hanoi",
          },
          {
            id: "chaosuon-baloi",
            name: "Cháo Sườn Bà Lợi",
            address: "39 Hang Dieu, Hoan Kiem",
            description:
              "Nổi tiếng với topping sụn giòn, phục vụ suốt cả ngày." ,
            price: "Giá: 25.000 – 30.000đ/bát.",
            image: "/assets/chaosuon/2.png",
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+%C4%90i%E1%BA%BFu+Hanoi",
          },
          {
            id: "chaosuon-dongxuan",
            name: "Cháo Sườn Chợ Đồng Xuân",
            address: "14 Dong Xuan, Hoan Kiem",
            description:
              "Quán vỉa hè tấp nập với bát cháo đầy đặn, giá phải chăng." ,
            price: "Giá: 20.000 – 30.000đ/bát.",
            image: "/assets/chaosuon/3.png",
            mapUrl: "https://maps.google.com/?q=14+%C4%90%E1%BB%93ng+Xu%C3%A2n+Hanoi",
          },
        ],
      },
      {
        id: "mien-luon",
        hero: {
          eyebrow: "Đậm đà vị lươn",
          title: "MIẾN LƯƠN HÀ NỘI",
          description:
            "Miến lươn Hà Nội có thể ăn khô hoặc chan nước: lươn đồng được làm sạch rồi chiên giòn hoặc om mềm, ăn cùng miến dong dai sợi và bát nước dùng thơm mùi xương hầm, tôm khô. Rau giá, hành phi, rau thơm khiến mỗi miếng vừa giòn vừa ngọt, khó quên.",
          image: "/assets/mienluon/mienluon.jpg",
          imageAlt: "Bát miến lươn với lươn giòn",
          cta: "Thưởng thức miến lươn",
        },
        intro: {
          title: "VIDEO",
          body: "Lươn chiên vàng và nồi nước dùng thơm ngậy cho món miến lươn chuẩn Hà Nội.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/snCdgrF_dTQ?autoplay=1&mute=1&rel=0",
          description: "Sơ chế lươn, chiên giòn và chan nước dùng cho bát miến lươn hấp dẫn.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu nổi bật",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Lươn đồng tươi làm sạch, chiên giòn hoặc om mềm." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Miến dong dai sợi dễ thấm nước dùng." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước dùng từ xương, tôm khô ninh trong." },
          { iconClass: "fa-solid fa-onion", text: "Hành phi, hành lá giúp dậy hương." },
          { iconClass: "fa-solid fa-leaf", text: "Giá đỗ, rau thơm làm món ăn thêm hài hòa." },
        ],
        recipeTitle: "Thưởng thức đúng điệu",
        recipeSteps: [
          "Sơ chế lươn, khử nhớt, chiên giòn hoặc om mềm tùy thích.",
          "Ninh xương cùng tôm khô để lấy nước dùng trong, nêm nhẹ tay.",
          "Chần miến, chan nước, thêm lươn, rau giá, hành phi và thưởng thức khi còn nóng." ,
        ],
        spotsTitle: "Quán miến lươn nên ghé",
        spots: [
          {
            id: "mienluon-chancam",
            name: "Miến lươn Chân Cầm",
            address: "1 Chân Cầm, Hoàn Kiếm",
            description:
              "Địa chỉ lâu năm ở phố cổ với lươn giòn rụm và nước dùng thơm nhẹ." ,
            price: "Giá: 40.000 – 50.000đ/bát.",
            image: "/assets/mienluon/1.png",
            mapUrl: "https://maps.google.com/?q=1+Ch%C3%A2n+C%E1%BA%A7m+Hanoi",
          },
          {
            id: "mienluon-thaiha",
            name: "Miến lươn Đông Thái Hà",
            address: "42 Thái Hà, Đống Đa",
            description:
              "Quán đông khách với cả phiên bản lươn giòn và lươn mềm chan nước." ,
            price: "Giá: 35.000 – 60.000đ/bát.",
            image: "/assets/mienluon/2.png",
            mapUrl: "https://maps.google.com/?q=42+Th%C3%A1i+H%C3%A0+Hanoi",
          },
          {
            id: "mienluon-nghiahang",
            name: "Miến lươn Nghĩa Hàng",
            address: "72 Nghĩa Hàng, Cầu Giấy",
            description:
              "Quán quen trong khu dân cư, lươn tươi mỗi ngày, rau sống sạch." ,
            price: "Giá: 35.000 – 55.000đ/bát.",
            image: "/assets/mienluon/3.png",
            mapUrl: "https://maps.google.com/?q=72+Ngh%C4%A9a+H%C3%A0ng+Hanoi",
          },
        ],
      },
      {
        id: "bun-tron",
        hero: {
          eyebrow: "Hòa quyện đủ vị",
          title: "BÚN TRỘN HÀ NỘI",
          description:
            "Bún trộn Hà Nội gồm bún mềm, thịt nướng thơm, rau sống tươi, lạc rang và nước mắm chua ngọt. Món ăn được dọn khô, thực khách tự trộn đều để cảm nhận sự cân bằng giữa vị ngọt, mặn, chua, bùi trong từng gắp.",
          image: "/assets/buntron/buntron.jpg",
          imageAlt: "Bát bún trộn Hà Nội đầy đủ topping",
          cta: "Trộn đều và thưởng thức",
        },
        intro: {
          title: "Hương vị phố cổ",
          body: "Bún sợi mảnh ăn cùng đồ nướng, rau thơm, lạc rang và nước chấm chua ngọt.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Thành phần đặc trưng",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Bún gạo trắng mềm." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt nướng hoặc chả giò tạo vị đậm đà." },
          { iconClass: "fa-solid fa-seedling", text: "Rau thơm, xà lách tươi mát." },
          { iconClass: "fa-solid fa-seedling", text: "Lạc rang vàng cho cảm giác bùi giòn." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước mắm chua ngọt làm liên kết tất cả hương vị." },
        ],
        recipeTitle: "Cách thưởng thức",
        recipeSteps: [
          "Cho bún, thịt, rau và nước mắm vào tô lớn.",
          "Thêm lạc rang, hành phi để tăng hương thơm.",
          "Trộn đều tay để nước chấm phủ lên mọi nguyên liệu trước khi ăn." ,
        ],
        spotsTitle: "Quán bún trộn đáng thử",
        spots: [
          {
            id: "buntron-hangbun",
            name: "Bún trộn Hàng Bún",
            address: "57 Hàng Bún, Ba Đình",
            description:
              "Hương vị phố cổ đặc trưng với thịt nướng thơm khói và rau giòn mát." ,
            price: "Giá: 35.000 – 45.000đ/bát.",
            image: "/assets/buntron/1.png",
            mapUrl: "https://maps.google.com/?q=57+H%C3%A0ng+B%C3%BAn+Hanoi",
          },
          {
            id: "buntron-comai",
            name: "Bún trộn Cô Mai",
            address: "9 Ngõ Tràng Tiền, Hoàn Kiếm",
            description:
              "Biến tấu hiện đại với nhiều topping và nước chấm cân bằng." ,
            price: "Giá: 40.000 – 55.000đ/bát.",
            image: "/assets/buntron/2.png",
            mapUrl: "https://maps.google.com/?q=9+Ng%C3%B5+Tr%C3%A0ng+Ti%E1%BB%81n+Hanoi",
          },
          {
            id: "buntron-anlac",
            name: "Bún trộn chay An Lạc",
            address: "18 Ngõ Huyện, Hoàn Kiếm",
            description:
              "Phiên bản chay với nấm, đậu phụ và rau củ đầy màu sắc." ,
            price: "Giá: 35.000 – 45.000đ/bát.",
            image: "/assets/buntron/3.png",
            mapUrl: "https://maps.google.com/?q=18+Ng%C3%B5+Huy%E1%BB%87n+Hanoi",
          },
        ],
      },
      {
        id: "cha-ruoi",
        hero: {
          eyebrow: "Đặc sản theo mùa",
          title: "CHẢ RƯƠI",
          description:
            "Chả rươi là món đặc sản mùa thu của Hà Nội. Rươi tươi được làm sạch, trộn cùng thịt nạc vai, trứng gà, thì là, hành hoa và vỏ quýt thái nhỏ rồi chiên trên chảo nóng. Miếng chả vàng ruộm bên ngoài, mềm béo bên trong, thơm đặc trưng khó lẫn.",
          image: "/assets/charuoi/charuoi.jpg",
          imageAlt: "Đĩa chả rươi vàng giòn",
          cta: "Thưởng thức chả rươi",
        },
        intro: {
          title: "VIDEO",
          body: "Từ khâu làm sạch rươi tới chiên vàng ruộm những miếng chả thơm béo.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/1Rp4ScQawEk?autoplay=1&mute=1&rel=0",
          description: "Chế biến chả rươi Hà Nội trong mùa rươi ngắn ngủi cuối năm.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu đặc trưng",
        ingredientsList: [
          { iconClass: "fa-solid fa-water", text: "Rươi tươi sơ chế kỹ để giữ vị ngọt." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thịt băm và trứng gà giúp kết dính hỗn hợp." },
          { iconClass: "fa-solid fa-leaf", text: "Thì là, hành hoa tạo hương thơm đặc trưng." },
          { iconClass: "fa-solid fa-lemon", text: "Vỏ quýt thái nhuyễn làm dậy mùi, khử tanh." },
          { iconClass: "fa-solid fa-fire", text: "Chiên trên chảo nóng đều tay cho mặt ngoài giòn." },
        ],
        recipeTitle: "Thưởng thức ngon nhất",
        recipeSteps: [
          "Rửa rươi với nước ấm pha muối, quất để sạch nhớt.",
          "Trộn rươi với thịt băm, trứng, thì là, hành, gia vị rồi múc vào chảo dầu nóng.",
          "Chiên vàng hai mặt, gắp ra dùng nóng với rau thơm và nước chấm chua ngọt." ,
        ],
        spotsTitle: "Điểm bán chả rươi ngon",
        spots: [
          {
            id: "charuoi-hangbeo",
            name: "Chả rươi Hàng Bèo",
            address: "244 Lò Đúc, Hai Bà Trưng",
            description:
              "Quán lâu năm nổi tiếng với miếng chả giòn rụm, phần ăn đầy đặn." ,
            price: "Giá: 35.000 – 65.000đ/phần.",
            image: "/assets/charuoi/1.png",
            mapUrl: "https://maps.google.com/?q=244+L%C3%B2+%C4%90%C3%BAc+Hanoi",
          },
          {
            id: "charuoi-hungthinh",
            name: "Chả rươi Hưng Thịnh",
            address: "1 Hàng Chiếu, Hoàn Kiếm",
            description:
              "Bán cả ngày, ăn kèm bún tươi và nhiều loại rau sống." ,
            price: "Giá: 20.000 – 200.000đ tùy khẩu phần.",
            image: "/assets/charuoi/2.png",
            mapUrl: "https://maps.google.com/?q=1+H%C3%A0ng+Chi%E1%BA%BFu+Hanoi",
          },
          {
            id: "charuoi-tamtho",
            name: "Chả rươi Tâm Thọ",
            address: "58 Hàng Bè, Hoàn Kiếm",
            description:
              "Đậm hương thì là, vỏ quýt; chả dày và chiên vàng đều tay." ,
            price: "Giá: 40.000 – 80.000đ/phần.",
            image: "/assets/charuoi/3.png",
            mapUrl: "https://maps.google.com/?q=58+H%C3%A0ng+B%E1%BB%83+Hanoi",
          },
        ],
      },
      {
        id: "mi-ga-tan",
        hero: {
          eyebrow: "Bổ dưỡng từ thảo mộc",
          title: "MÌ GÀ TẦN",
          description:
            "Mì gà tần được hầm từ gà ta cùng các vị thuốc bắc như kỷ tử, táo đỏ, đẳng sâm. Nước dùng đầu tiên hơi đắng nhẹ nhưng sau đó ngọt hậu, ăn kèm sợi mì dai nóng hổi giúp cơ thể phục hồi sau ngày dài.",
          image: "/assets/gatan/gatan.png",
          imageAlt: "Bát mì gà tần thảo mộc",
          cta: "Bồi bổ với mì gà tần",
        },
        intro: {
          title: "VIDEO",
          body: "Nước gà tần hầm lửa nhỏ cùng thuốc bắc rồi chan lên tô mì nóng.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/2L_8wW_EPHQ?autoplay=1&mute=1&rel=0",
          description: "Hầm gà với thảo mộc và trình bày tô mì gà tần chuẩn vị Hà Nội." ,
        },
        ingredientGallery: [],
        ingredientsTitle: "Nguyên liệu chính",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Gà ta hầm mềm tơi nhưng vẫn giữ vị ngọt." },
          { iconClass: "fa-solid fa-seedling", text: "Kỷ tử, táo đỏ, đẳng sâm và các vị thuốc bổ." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Sợi mì mềm dai thấm đều nước tần." },
          { iconClass: "fa-solid fa-mug-hot", text: "Nước dùng hơi đắng đầu lưỡi nhưng ngọt hậu thanh." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Gừng, tiêu làm ấm bụng, xua mệt mỏi." },
        ],
        recipeTitle: "Thưởng thức",
        recipeSteps: [
          "Hầm gà cùng vị thuốc tối thiểu một giờ cho nước ngọt đậm." ,
          "Chần mì, chan nước gà, thêm thịt xé và rau thơm.",
          "Ăn khi còn nóng, có thể thêm mật ong hoặc tiêu tùy khẩu vị." ,
        ],
        spotsTitle: "Địa chỉ mì gà tần nổi tiếng",
        spots: [
          {
            id: "miga-caysi",
            name: "Gà tần Cây Si",
            address: "29 Tống Duy Tân, Hoàn Kiếm",
            description:
              "Phố ẩm thực Tống Duy Tân luôn tấp nập với nồi gà tần thơm nức tới tận khuya." ,
            price: "Giá: 150.000đ/bát.",
            image: "/assets/gatan/1.png",
            mapUrl: "https://maps.google.com/?q=29+T%E1%BB%91ng+Duy+T%C3%A2n+Hanoi",
          },
          {
            id: "miga-badau",
            name: "Gà tần Bà Đậu",
            address: "203 Tôn Đức Thắng, Đống Đa",
            description:
              "Quán bình dân nổi tiếng gà mềm, nước tần vừa vị, mở cửa tới khuya." ,
            price: "Giá: 40.000 – 75.000đ/bát.",
            image: "/assets/gatan/2.png",
            mapUrl: "https://maps.google.com/?q=203+T%C3%B4n+%C4%90%E1%BB%A9c+Th%E1%BA%AFng+Hanoi",
          },
          {
            id: "miga-hangbo",
            name: "Mì gà tần 24 Hàng Bông",
            address: "24 Hàng Bồ, Hoàn Kiếm",
            description:
              "Quán phục vụ cả ngày với tô mì gà tần hài hòa hương thuốc bắc." ,
            price: "Giá: 40.000đ/bát.",
            image: "/assets/gatan/3.png",
            mapUrl: "https://maps.google.com/?q=24+H%C3%A0ng+B%E1%BB%93+Hanoi",
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
            name: "Bún Chả Tuyết",
            address: "34 Hàng Than, quận Ba Đình, Hà Nội",
            description:
              "Hơn 30 năm phục vụ, nổi tiếng với miếng thịt lát lớn, cháy cạnh vừa phải và nước chấm nhẹ nhàng.",
            price: "Giá: 40.000 – 50.000đ (≈ 1,7 – 2,1 USD).",
            image: "/assets/buncha/batuyet.png",
            mapUrl: "https://maps.google.com/?q=34+H%C3%A0ng+Than+Hanoi",
          },
          {
            id: "buncha-huonglien",
            name: "Bún Chả Hương Liên",
            address: "24 Lê Văn Hưu, quận Hai Bà Trưng, Hà Nội",
            description:
              "Nổi tiếng khắp thế giới sau bữa tối của Tổng thống Obama; nước chấm đậm đà ăn kèm nem cua bể giòn rụm.",
            price: "Giá: 50.000 – 70.000đ; set kèm nem cua bể 85.000đ (≈ 3,5 USD).",
            image: "/assets/buncha/bunchahuonglien.png",
            mapUrl: "https://maps.google.com/?q=24+L%C3%AA+V%C4%83n+H%E1%BB%AFu+Hanoi",
          },
          {
            id: "buncha-41",
            name: "Bún Chả 41",
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
            name: "Bún Thang Bà Đức",
            address: "48 Cầu Gỗ, quận Hoàn Kiếm, Hà Nội",
            description:
              "Quán lâu năm nổi tiếng với nước dùng trong, vị ngọt thanh và không gian gọn gàng ấm cúng.",
            price: "Giá: 30.000 – 55.000đ/tô.",
            image: "/assets/bunthang/baduc.png",
            mapUrl: "https://maps.google.com/?q=48+C%E1%BA%A7u+G%E1%BB%97+Hanoi",
          },
          {
            id: "bunthang-thuanly",
            name: "Bún Thang Thuận Lý",
            address: "33 Hàng Hòm, quận Hoàn Kiếm, Hà Nội",
            description:
              "Giữ hương vị truyền thống, khẩu phần vừa vặn và đậm chất phố cổ.",
            price: "Giá: 30.000 – 40.000đ/tô.",
            image: "/assets/bunthang/hang2.png",
            mapUrl: "https://maps.google.com/?q=33+H%C3%A0ng+H%C3%B2m+Hanoi",
          },
          {
            id: "bunthang-tulun",
            name: "Bún Thang Tù Lùn",
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
            name: "Bánh Cuốn Bà Xuân",
            address: "Dốc Hòe Nhai, quận Ba Đình, Hà Nội",
            description:
              "Quán gia truyền bánh mềm, nước chấm hài hòa và chủ quán thân thiện.",
            price: "Giá: 5.000 – 30.000đ (≈ 0,57 – 1,15 USD).",
            image: "/assets/banhcuon/hinh1.png",
            mapUrl: "https://maps.google.com/?q=D%E1%BB%91c+H%C3%B2e+Nhai+Hanoi",
          },
          {
            id: "banhcuon-thuykhue",
            name: "Bánh Cuốn Thụy Khuê",
            address: "Ngõ 29 Thụy Khuê, quận Tây Hồ, Hà Nội",
            description:
              "Được người dân quanh hồ yêu thích nhờ vị đậm đà và phần rau tươi hào phóng.",
            price: "Giá: 15.000 – 20.000đ (≈ 0,57 – 0,77 USD).",
            image: "/assets/banhcuon/hinh2.png",
            mapUrl: "https://maps.google.com/?q=29+Th%E1%BB%A5y+Khu%C3%AA+Hanoi",
          },
          {
            id: "banhcuon-bahanh",
            name: "Bánh Cuốn Bà Hạnh",
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
          poster: "/assets/xoi/xoi.png",
          description: "Hơi nếp bốc khói, topping phong phú và nhịp sống vội vã quanh gánh xôi Hà Nội.",
        },
        ingredientGallery: [
          {
            id: "xoi-glutinous",
            src: "/assets/xoi/xoi.png",
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
            src: "/assets/xoi/1.png",
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
            src: "/assets/xoi/2.png",
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
            name: "Xôi Yến",
            address: "35B Nguyễn Hữu Huân, Hoàn Kiếm",
            description:
              "Quán nổi tiếng nhất với xôi xéo đậu xanh, hành phi vàng óng, phục vụ từ sáng tới khuya.",
            price: "Giá: 25.000 – 45.000đ (≈ 1 – 1,9 USD).",
            image: "/assets/xoi/1.png",
            mapUrl: "https://maps.google.com/?q=35B+Nguy%E1%BB%85n+H%E1%BB%AFu+Hu%C3%A2n+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "xoi-ba-thu",
            name: "Xôi Bà Thu",
            address: "57 Thợ Nhuộm, Hoàn Kiếm",
            description:
              "Nổi tiếng với xôi gà, xôi thịt kho tàu đậm đà, giá mềm và phục vụ nhanh chóng.",
            price: "Giá: 25.000 – 40.000đ (≈ 1 – 1,7 USD).",
            image: "/assets/xoi/2.png",
            mapUrl: "https://maps.google.com/?q=57+Th%E1%BB%A3+Nhu%E1%BB%99m+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "xoi-cat-lam",
            name: "Xôi Cát Lâm",
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
          poster: "/assets/bunrieu/rieu.png",
          description: "Gạch cua quyện cà chua, đậu phụ mềm và rau thơm làm nên tô bún riêu trọn vị.",
        },
        ingredientGallery: [
          {
            id: "bunrieu-crab",
            src: "/assets/bunrieu/1.png",
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
            src: "/assets/bunrieu/2.png",
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
            src: "/assets/bunrieu/3.png",
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
            name: "Bún Riêu Huyền Thu",
            address: "2F Quang Trung, Hoàn Kiếm",
            description:
              "Hơn 30 năm phục vụ, bát bún riêu cầu kỳ và phục vụ thân thiện.",
            price: "Giá: 45.000 – 90.000đ.",
            image: "/assets/bunrieu/1.png",
            mapUrl: "https://maps.google.com/?q=2F+Quang+Trung+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "bunrieu-trang",
            name: "Bún Riêu Sườn Sụn Trang",
            address: "23 Nguyễn Siêu, Hoàn Kiếm",
            description:
              "Biến tấu với sườn sụn mềm ngọt và nước dùng đậm đà, hút khách cả ngày.",
            price: "Giá: 30.000 – 75.000đ.",
            image: "/assets/bunrieu/2.png",
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Si%C3%AAu+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "bunrieu-be-be",
            name: "Bún Riêu Bề Bề",
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
            name: "Chả Cá Lã Vọng",
            address: "14 Chả Cá, Hoàn Kiếm",
            description:
              "Hơn 100 năm tuổi, giữ trọn công thức gia truyền và phong cách phục vụ tại bàn.",
            price: "Giá: 120.000 – 150.000đ (≈ 5 – 6,2 USD).",
            image: "/assets/chaca/1.png",
            mapUrl: "https://maps.google.com/?q=14+Ch%E1%BA%A3+C%C3%A1+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "chaca-thang-long",
            name: "Chả Cá Thăng Long",
            address: "21 Đường Thành, Hoàn Kiếm",
            description:
              "Không gian rộng rãi, phù hợp nhóm bạn đông với cá đậm vị và rau thơm tươi.",
            price: "Giá: 100.000 – 130.000đ (≈ 4,2 – 5,4 USD).",
            image: "/assets/chaca/2.png",
            mapUrl: "https://maps.google.com/?q=21+%C4%90%C6%B0%E1%BB%9Dng+Th%C3%A0nh+H%C3%A0+N%E1%BB%99i",
          },
          {
            id: "chaca-anh-vu",
            name: "Chả Cá Anh Vũ",
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
        id: "nemnuong",
        hero: {
          eyebrow: "Central coast delight",
          title: "NHA TRANG NEM NUONG",
          description:
            "Nha Trang nem nuong is hand-pounded pork mixed with aromatics, shaped onto skewers, and grilled over glowing charcoal. The surface caramelizes while the inside stays irresistibly juicy. Wrap a hot skewer with rice paper, fresh herbs, pickles, and a generous spoon of peanut sauce. The balance of sweet, savory, and nutty flavors keeps you craving the next bite.",
          image: "/assets/nemnuong/nem.jpg",
          imageAlt: "Nha Trang nem nuong with rice paper and fresh herbs",
          cta: "Roll your nem nuong",
        },
        intro: {
          title: "VIDEO",
          body: "From pounding the pork to grilling and wrapping nem nuong with crisp greens.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/NVzRMbREV_c?autoplay=1&mute=1&rel=0",
          description: "Shaping, grilling, and serving Nha Trang nem nuong with creamy peanut sauce.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Key components",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Hand-pounded pork blended with fat, garlic, and spices until springy." },
          { iconClass: "fa-solid fa-fire", text: "Charcoal heat that caramelizes the outside yet keeps the filling juicy." },
          { iconClass: "fa-solid fa-leaf", text: "Fresh herbs, lettuce, and green mango for crunch and brightness." },
          { iconClass: "fa-solid fa-bread-slice", text: "Chewy rice paper to wrap every ingredient together." },
          { iconClass: "fa-solid fa-bowl-food", text: "Rich peanut dipping sauce that ties all the flavors together." },
        ],
        recipeTitle: "How to enjoy it",
        recipeSteps: [
          "Grill the skewers over charcoal, turning often until lightly charred and fragrant.",
          "Lay out rice paper with herbs, pickles, and a hot skewer of nem nuong.",
          "Roll tightly, dip into the peanut sauce, and savor while still warm.",
        ],
        spotsTitle: "Where to try nem nuong in Hanoi",
        spots: [
          {
            id: "nemnuong-vukhanh",
            name: "NEM NUONG NHA TRANG VU KHANH",
            address: "90 Tran Hung Dao, Hoan Kiem",
            description:
              "Spacious dining room with smoky skewers, plentiful herbs, and extra-creamy dipping sauce.",
            price: "Price: 50,000 - 80,000 VND per serving.",
            image: "/assets/nemnuong/1.png",
            mapUrl: "https://maps.google.com/?q=90+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Hanoi",
          },
          {
            id: "nemnuong-hangbong",
            name: "NEM NUONG NHA TRANG",
            address: "39 Hang Bong, Hoan Kiem",
            description:
              "Old Quarter favorite where skewers are rolled tableside and served piping hot.",
            price: "Price: 50,000 - 80,000 VND per serving.",
            image: "/assets/nemnuong/2.png",
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+B%C3%B4ng+Hanoi",
          },
          {
            id: "nemnuong-hanh",
            name: "NEM NUONG NHA TRANG HANH",
            address: "23 Nguyen Thai Hoc, Ba Dinh",
            description:
              "Loved by locals for juicy skewers, bold peanut sauce, and quick service.",
            price: "Price: 50,000 - 80,000 VND per serving.",
            image: "/assets/nemnuong/3.png",
            mapUrl: "https://maps.google.com/?q=23+Nguy%E1%BB%85n+Th%C3%A1i+H%E1%BB%8Dc+Hanoi",
          },
        ],
      },
      {
        id: "lau-cua-dong",
        hero: {
          eyebrow: "Countryside warmth",
          title: "NORTHERN FIELD CRAB HOTPOT",
          description:
            "Field crab hotpot captures the rustic soul of northern Vietnam: a light, naturally sweet broth pressed from freshwater crabs, crowned with golden crab roe, and lifted with a gentle tang from fermented rice vinegar. On a chilly Hanoi evening, gathering around the bubbling pot, dipping meats and greens, then ladling it over vermicelli is the very definition of cozy comfort.",
          image: "/assets/laucua/laucua.png",
          imageAlt: "Steaming Vietnamese field crab hotpot",
          cta: "Share a crab hotpot",
        },
        intro: {
          title: "VIDEO",
          body: "A simmering pot of crab broth with golden roe and plenty of fresh add-ins.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Signature ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-crab", text: "Freshwater field crabs pounded and strained for a sweet, clean broth." },
          { iconClass: "fa-solid fa-bowl-food", text: "Golden crab roe that adds color and richness." },
          { iconClass: "fa-solid fa-mug-hot", text: "Fermented rice vinegar, tomatoes, and shrimp paste for gentle acidity." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Thinly sliced beef, pork paste, tofu, and cinnamon sausage for dipping." },
          { iconClass: "fa-solid fa-leaf", text: "Morning glory, water celery, and banana blossom for crisp freshness." },
        ],
        recipeTitle: "How to enjoy it",
        recipeSteps: [
          "Simmer the crab broth with tomatoes and fermented rice vinegar until the roe floats to the top.",
          "Arrange meats, tofu, and vegetables so everyone can dip as they like.",
          "Add toppings to the bubbling pot, then ladle the broth over noodles and enjoy while steaming hot.",
        ],
        spotsTitle: "Field crab hotpot spots in Hanoi",
        spots: [
          {
            id: "laucua-685",
            name: "LAU CUA DONG 685",
            address: "685 Lac Long Quan, Tay Ho",
            description:
              "Northern-style setting with naturally sweet broth, abundant crab roe, and generous platters of add-ins.",
            price: "Price: 250,000 - 400,000 VND per pot.",
            image: "/assets/laucua/1.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-songha",
            name: "LAU CUA DONG SONG HA",
            address: "685 Lac Long Quan, Tay Ho",
            description:
              "Classic northern flavors with light, balanced broth and plentiful dipping platters.",
            price: "Price: 150,000 - 300,000 VND per person.",
            image: "/assets/laucua/2.png",
            mapUrl: "https://maps.google.com/?q=685+L%E1%BA%A1c+Long+Qu%C3%A2n+Hanoi",
          },
          {
            id: "laucua-chinhbeo",
            name: "LAU CUA DONG CHINH BEO",
            address: "20A Van Phu Urban Area, Ha Dong",
            description:
              "Beloved neighborhood joint serving hearty pots with fresh ingredients at cozy portions for small groups.",
            price: "Price: 220,000 - 350,000 VND per pot.",
            image: "/assets/laucua/3.png",
            mapUrl: "https://maps.google.com/?q=Khu+%C4%91%E1%BB%8Bnh+c%C6%B0+V%C4%83n+Ph%C3%BA+Hanoi",
          },
        ],
      },
      {
        id: "chao-trai",
        hero: {
          eyebrow: "Gentle comfort",
          title: "HANOI CLAM PORRIDGE",
          description:
            "Clam porridge is a humble Hanoi staple: rice is simmered in sweet clam broth until silky, then topped with sauteed river clams, fried shallots, fish sauce, and pepper. Every spoonful is light yet savory, the perfect bowl for a breezy afternoon or late-night supper.",
          image: "/assets/chaotrai/chaotrai.png",
          imageAlt: "Bowl of Hanoi clam porridge",
          cta: "Savor clam porridge",
        },
        intro: {
          title: "VIDEO",
          body: "Cooking rice in clam broth, then finishing with sauteed clams and fragrant herbs.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/JQhFY7_CiSs?autoplay=1&mute=1&rel=0",
          description: "Preparing Hanoi-style clam porridge with fresh river clams.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Essential ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Rice soaked and ground, simmered until velvety smooth." },
          { iconClass: "fa-solid fa-water", text: "Sweet clam stock forming the base." },
          { iconClass: "fa-solid fa-fish", text: "Clam meat sauteed with shallots, fish sauce, and pepper." },
          { iconClass: "fa-solid fa-onion", text: "Golden fried shallots for aroma." },
          { iconClass: "fa-solid fa-leaf", text: "Vietnamese coriander and shiso brighten the bowl." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Blanch the clams, reserve the broth, and clean the meat.",
          "Simmer ground rice in the clam stock until silky, seasoning gently.",
          "Top with sauteed clam meat, herbs, fried shallots, and a sprinkle of pepper.",
        ],
        spotsTitle: "Where to taste clam porridge",
        spots: [
          {
            id: "chaotrai-colan",
            name: "CO LAN CLAM PORRIDGE",
            address: "34 Nguyen Van To Street, Hoan Kiem District",
            description:
              "Afternoon-only stall serving silky porridge perfumed with fresh herbs.",
            price: "Price: 10,000 - 15,000 VND per bowl.",
            image: "/assets/chaotrai/1.png",
            mapUrl: "https://maps.google.com/?q=34+Nguy%E1%BB%85n+V%C4%83n+T%E1%BB%91+Hanoi",
          },
          {
            id: "chaotrai-trankhatchan",
            name: "321 TRAN KHAT CHAN CLAM PORRIDGE",
            address: "321 Tran Khat Chan Street, Hai Ba Trung District",
            description:
              "Late-morning favorite with richly flavored broth and generous toppings.",
            price: "Price: 20,000 - 25,000 VND per bowl.",
            image: "/assets/chaotrai/2.png",
            mapUrl: "https://maps.google.com/?q=321+Tr%E1%BA%A7n+Kh%C3%A1t+Ch%C3%A2n+Hanoi",
          },
          {
            id: "chaotrai-cohang",
            name: "CO HANG CLAM PORRIDGE",
            address: "C2 Trung Tu, Dong Da District",
            description:
              "Family-run shop serving hot clam porridge all day with crispy fried shallots.",
            price: "Price: 27,000 VND per bowl.",
            image: "/assets/chaotrai/3.png",
            mapUrl: "https://maps.google.com/?q=C2+Trung+T%E1%BB%B1+Hanoi",
          },
        ],
      },
      {
        id: "chao-suon",
        hero: {
          eyebrow: "Breakfast classic",
          title: "HANOI PORK RIB PORRIDGE",
          description:
            "Pork rib porridge is a beloved Hanoi breakfast: ground rice is simmered with pork ribs until luxuriously smooth, then topped with tender rib meat, fried shallots, and crisp Chinese crullers. A steaming bowl brings the comforting warmth of a home-cooked morning.",
          image: "/assets/chaosuon/chaosuon.png",
          imageAlt: "Bowl of pork rib porridge with fried dough sticks",
          cta: "Start your day with chao suon",
        },
        intro: {
          title: "VIDEO",
          body: "Silky porridge simmered from ground rice and pork ribs, finished with toppings.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/ZneH5LsyYBo?autoplay=1&mute=1&rel=0",
          description: "Making creamy Hanoi pork rib porridge from scratch.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Core components",
        ingredientsList: [
          { iconClass: "fa-solid fa-bone", text: "Pork ribs simmered for a naturally sweet broth." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Ground rice cooked until velvety." },
          { iconClass: "fa-solid fa-onion", text: "Fried shallots and pepper for fragrance." },
          { iconClass: "fa-solid fa-bread-slice", text: "Crispy crullers for dipping and crunch." },
          { iconClass: "fa-solid fa-leaf", text: "Spring onions and herbs to finish." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Simmer ribs to create a clear, flavorful broth.",
          "Cook ground rice in the broth until smooth and creamy.",
          "Top with rib meat, fried shallots, crullers, and freshly ground pepper.",
        ],
        spotsTitle: "Where to try it",
        spots: [
          {
            id: "chaosuon-cola",
            name: "CO LA PORK RIB PORRIDGE",
            address: "2A Ly Quoc Su Street, Hoan Kiem District",
            description:
              "Long-standing Old Quarter favorite serving silky bowls morning and afternoon.",
            price: "Price: 15,000 - 25,000 VND per bowl.",
            image: "/assets/chaosuon/1.png",
            mapUrl: "https://maps.google.com/?q=2A+L%C3%BD+Qu%E1%BB%91c+S%C6%B2+Hanoi",
          },
          {
            id: "chaosuon-baloi",
            name: "BA LOI PORK RIB PORRIDGE",
            address: "39 Hang Dieu Street, Hoan Kiem District",
            description:
              "Known for cartilage-rich toppings and all-day service.",
            price: "Price: 25,000 - 30,000 VND per bowl.",
            image: "/assets/chaosuon/2.png",
            mapUrl: "https://maps.google.com/?q=39+H%C3%A0ng+%C4%90i%E1%BA%BFu+Hanoi",
          },
          {
            id: "chaosuon-dongxuan",
            name: "DONG XUAN PORK RIB PORRIDGE",
            address: "14 Dong Xuan Street, Hoan Kiem District",
            description:
              "Bustling street stall offering hearty bowls at wallet-friendly prices.",
            price: "Price: 20,000 - 30,000 VND per bowl.",
            image: "/assets/chaosuon/3.png",
            mapUrl: "https://maps.google.com/?q=14+%C4%90%E1%BB%93ng+Xu%C3%A2n+Hanoi",
          },
        ],
      },
      {
        id: "mien-luon",
        hero: {
          eyebrow: "Crisp eel delight",
          title: "HANOI EEL GLASS NOODLES",
          description:
            "Hanoi's eel glass noodles can be served dry or with broth: field eel is cleaned, then either fried until crisp or simmered until tender, and paired with chewy glass noodles. The light broth made from pork bones and dried shrimp, together with bean sprouts, fried shallots, and herbs, creates a wonderfully balanced bowl.",
          image: "/assets/mienluon/mienluon.jpg",
          imageAlt: "Bowl of eel glass noodles",
          cta: "Enjoy eel noodles",
        },
        intro: {
          title: "VIDEO",
          body: "Frying eel to a crisp and simmering broth for Hanoi's signature mien luon.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/snCdgrF_dTQ?autoplay=1&mute=1&rel=0",
          description: "Preparing eel two ways for Hanoi glass noodles.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Signature ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-fish", text: "Fresh field eel fried crisp or simmered tender." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Glass noodles that happily soak up broth." },
          { iconClass: "fa-solid fa-mug-hot", text: "Light broth simmered from bones and dried shrimp." },
          { iconClass: "fa-solid fa-onion", text: "Fried shallots and scallions for aroma." },
          { iconClass: "fa-solid fa-leaf", text: "Herbs and bean sprouts brighten every bite." },
        ],
        recipeTitle: "Serving suggestion",
        recipeSteps: [
          "Clean eel, then fry until crisp or simmer until silky, depending on the style you prefer.",
          "Prepare a clear broth from pork bones and dried shrimp, seasoning lightly.",
          "Blanch the noodles, ladle over broth, add eel, and finish with sprouts, herbs, and fried shallots.",
        ],
        spotsTitle: "Where to try eel noodles",
        spots: [
          {
            id: "mienluon-chancam",
            name: "MIEN LUON CHAN CAM",
            address: "1 Chan Cam Street, Hoan Kiem District",
            description:
              "Old Quarter institution serving crisp eel and fragrant broth.",
            price: "Price: 40,000 - 50,000 VND per bowl.",
            image: "/assets/mienluon/1.png",
            mapUrl: "https://maps.google.com/?q=1+Ch%C3%A2n+C%E1%BA%A7m+Hanoi",
          },
          {
            id: "mienluon-thaiha",
            name: "MIEN LUON DONG THAI HA",
            address: "42 Thai Ha Street, Dong Da District",
            description:
              "Popular spot offering both crisp eel noodles and hearty broth bowls all day long.",
            price: "Price: 35,000 - 60,000 VND per bowl.",
            image: "/assets/mienluon/2.png",
            mapUrl: "https://maps.google.com/?q=42+Th%C3%A1i+H%C3%A0+Hanoi",
          },
          {
            id: "mienluon-nghiahang",
            name: "MIEN LUON NGHIA HANG",
            address: "72 Nghia Hang Street, Cau Giay District",
            description:
              "Neighborhood favorite with fresh daily eel and vibrant herbs.",
            price: "Price: 35,000 - 55,000 VND per bowl.",
            image: "/assets/mienluon/3.png",
            mapUrl: "https://maps.google.com/?q=72+Ngh%C4%A9a+H%C3%A0ng+Hanoi",
          },
        ],
      },
      {
        id: "bun-tron",
        hero: {
          eyebrow: "All-in-one harmony",
          title: "HANOI MIXED VERMICELLI",
          description:
            "Hanoi bun tron layers soft vermicelli, smoky grilled meat, fresh herbs, roasted peanuts, and a tangy fish-sauce dressing. Served dry so diners toss everything themselves, each chopstickful balances sweet, salty, sour, and nutty notes.",
          image: "/assets/buntron/buntron.jpg",
          imageAlt: "Bowl of Hanoi mixed vermicelli with full toppings",
          cta: "Toss and enjoy",
        },
        intro: {
          title: "Old Quarter flavors",
          body: "Fine rice noodles paired with grilled meats, fragrant herbs, roasted peanuts, and sweet-sour dressing.",
        },
        video: null,
        ingredientGallery: [],
        ingredientsTitle: "Signature components",
        ingredientsList: [
          { iconClass: "fa-solid fa-bowl-rice", text: "Soft, fine rice vermicelli noodles." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Charcoal-grilled pork or spring rolls for savory depth." },
          { iconClass: "fa-solid fa-seedling", text: "Fresh herbs and lettuce for cool crunch." },
          { iconClass: "fa-solid fa-seedling", text: "Roasted peanuts that add nutty crunch." },
          { iconClass: "fa-solid fa-mug-hot", text: "Sweet-sour fish sauce dressing that ties every flavor together." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Add noodles, grilled meat, herbs, and dressing to a large bowl.",
          "Top with roasted peanuts and fried shallots for aroma.",
          "Toss thoroughly so the dressing coats every ingredient before eating.",
        ],
        spotsTitle: "Where to try bun tron",
        spots: [
          {
            id: "buntron-hangbun",
            name: "BUN TRON HANG BUN",
            address: "57 Hang Bun, Ba Dinh",
            description:
              "Classic Old Quarter flavors with smoky grilled pork and crisp greens.",
            price: "Price: 35,000 - 45,000 VND per bowl.",
            image: "/assets/buntron/1.png",
            mapUrl: "https://maps.google.com/?q=57+H%C3%A0ng+B%C3%BAn+Hanoi",
          },
          {
            id: "buntron-comai",
            name: "BUN TRON CO MAI",
            address: "9 Ngo Trang Tien, Hoan Kiem",
            description:
              "Modern twist with plentiful toppings and a well-balanced dressing.",
            price: "Price: 40,000 - 55,000 VND per bowl.",
            image: "/assets/buntron/2.png",
            mapUrl: "https://maps.google.com/?q=9+Ng%C3%B5+Tr%C3%A0ng+Ti%E1%BB%81n+Hanoi",
          },
          {
            id: "buntron-anlac",
            name: "BUN TRON CHAY AN LAC",
            address: "18 Ngo Huyen, Hoan Kiem",
            description:
              "Vegetarian version with mushrooms, tofu, and colorful vegetables.",
            price: "Price: 35,000 - 45,000 VND per bowl.",
            image: "/assets/buntron/3.png",
            mapUrl: "https://maps.google.com/?q=18+Ng%C3%B5+Huy%E1%BB%87n+Hanoi",
          },
        ],
      },
      {
        id: "cha-ruoi",
        hero: {
          eyebrow: "Seasonal specialty",
          title: "CHA RUOI",
          description:
            "Cha ruoi is Hanoi's treasured autumn treat. Fresh sand worms are cleaned, mixed with minced pork, eggs, dill, scallions, and finely sliced tangerine peel, then pan-fried until golden. Each patty stays crisp outside, custardy within, and carries a uniquely aromatic finish.",
          image: "/assets/charuoi/charuoi.jpg",
          imageAlt: "Plate of golden cha ruoi fritters",
          cta: "Savor cha ruoi",
        },
        intro: {
          title: "VIDEO",
          body: "Cleaning the sand worms and frying fragrant cha ruoi patties to golden perfection.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/1Rp4ScQawEk?autoplay=1&mute=1&rel=0",
          description: "Making Hanoi-style cha ruoi during the short late-autumn season.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Signature ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-water", text: "Fresh sand worms carefully cleaned to keep their sweetness." },
          { iconClass: "fa-solid fa-drumstick-bite", text: "Minced pork and eggs provide structure and richness." },
          { iconClass: "fa-solid fa-leaf", text: "Dill and scallions lend the iconic herbal aroma." },
          { iconClass: "fa-solid fa-lemon", text: "Finely sliced tangerine peel brightens and removes any briny notes." },
          { iconClass: "fa-solid fa-fire", text: "Pan-fried over steady heat for a crisp exterior." },
        ],
        recipeTitle: "Best enjoyed",
        recipeSteps: [
          "Rinse the sand worms with warm salted water and kumquat juice to remove slime.",
          "Combine with minced pork, eggs, dill, scallions, and seasoning before ladling into hot oil.",
          "Fry until both sides are golden, then serve hot with herbs and sweet-sour dipping sauce.",
        ],
        spotsTitle: "Where to buy cha ruoi",
        spots: [
          {
            id: "charuoi-hangbeo",
            name: "CHA RUOI HANG BEO",
            address: "244 Lo Duc, Hai Ba Trung",
            description:
              "Longtime shop famous for crispy patties and generous portions.",
            price: "Price: 35,000 - 65,000 VND per serving.",
            image: "/assets/charuoi/1.png",
            mapUrl: "https://maps.google.com/?q=244+L%C3%B2+%C4%90%C3%BAc+Hanoi",
          },
          {
            id: "charuoi-hungthinh",
            name: "CHA RUOI HUNG THINH",
            address: "1 Hang Chieu, Hoan Kiem",
            description:
              "Open all day with fresh cha ruoi served alongside vermicelli and herbs.",
            price: "Price: 20,000 - 200,000 VND depending on portion size.",
            image: "/assets/charuoi/2.png",
            mapUrl: "https://maps.google.com/?q=1+H%C3%A0ng+Chi%E1%BA%BFu+Hanoi",
          },
          {
            id: "charuoi-tamtho",
            name: "CHA RUOI TAM THO",
            address: "58 Hang Be, Hoan Kiem",
            description:
              "Aromatic with dill and citrus peel, thick patties fried evenly to a golden hue.",
            price: "Price: 40,000 - 80,000 VND per serving.",
            image: "/assets/charuoi/3.png",
            mapUrl: "https://maps.google.com/?q=58+H%C3%A0ng+B%E1%BB%83+Hanoi",
          },
        ],
      },
      {
        id: "mi-ga-tan",
        hero: {
          eyebrow: "Herbal nourishment",
          title: "MI GA TAN",
          description:
            "Mi ga tan is free-range chicken gently stewed with traditional herbs such as goji berries, red dates, and codonopsis. The broth starts with a slight bitterness that mellows into lingering sweetness, soaking into springy noodles for the perfect pick-me-up after a long day.",
          image: "/assets/gatan/gatan.png",
          imageAlt: "Bowl of herbal mi ga tan",
          cta: "Recharge with mi ga tan",
        },
        intro: {
          title: "VIDEO",
          body: "Chicken simmered low and slow with herbs before being ladled over hot noodles.",
        },
        video: {
          type: "youtube",
          src: "https://www.youtube.com/embed/2L_8wW_EPHQ?autoplay=1&mute=1&rel=0",
          description: "Stewing chicken with medicinal herbs and plating a classic Hanoi mi ga tan.",
        },
        ingredientGallery: [],
        ingredientsTitle: "Key ingredients",
        ingredientsList: [
          { iconClass: "fa-solid fa-drumstick-bite", text: "Free-range chicken simmered until tender yet naturally sweet." },
          { iconClass: "fa-solid fa-seedling", text: "Goji berries, red dates, codonopsis, and other nourishing herbs." },
          { iconClass: "fa-solid fa-bowl-rice", text: "Soft yet springy noodles that soak up the broth." },
          { iconClass: "fa-solid fa-mug-hot", text: "Broth with a gentle bitterness upfront and a sweet finish." },
          { iconClass: "fa-solid fa-pepper-hot", text: "Ginger and pepper to warm the body and chase away fatigue." },
        ],
        recipeTitle: "How to enjoy",
        recipeSteps: [
          "Simmer chicken with the herbal mix for at least an hour to draw out deep sweetness.",
          "Blanch the noodles, ladle over hot broth, add shredded chicken, and finish with herbs.",
          "Serve steaming hot; add a touch of honey or extra pepper to taste.",
        ],
        spotsTitle: "Popular mi ga tan shops",
        spots: [
          {
            id: "miga-caysi",
            name: "GA TAN CAY SI",
            address: "29 Tong Duy Tan, Hoan Kiem",
            description:
              "Night-food street favorite with fragrant herbal broth simmering until late.",
            price: "Price: 150,000 VND per bowl.",
            image: "/assets/gatan/1.png",
            mapUrl: "https://maps.google.com/?q=29+T%E1%BB%91ng+Duy+T%C3%A2n+Hanoi",
          },
          {
            id: "miga-badau",
            name: "GA TAN BA DAU",
            address: "203 Ton Duc Thang, Dong Da",
            description:
              "Beloved casual spot with tender chicken and balanced herbal broth, open until late.",
            price: "Price: 40,000 - 75,000 VND per bowl.",
            image: "/assets/gatan/2.png",
            mapUrl: "https://maps.google.com/?q=203+T%C3%B4n+%C4%90%E1%BB%A9c+Th%E1%BA%AFng+Hanoi",
          },
          {
            id: "miga-hangbo",
            name: "MI GA TAN 24 HANG BO",
            address: "24 Hang Bo, Hoan Kiem",
            description:
              "Open all day with bowls that balance herbal aromas and comforting noodles.",
            price: "Price: 40,000 VND per bowl.",
            image: "/assets/gatan/3.png",
            mapUrl: "https://maps.google.com/?q=24+H%C3%A0ng+B%E1%BB%93+Hanoi",
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
          image: "/assets/xoi/xoi.png",
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
          poster: "/assets/xoi/xoi.png",
          description: "A sensory journey of fragrant rice, colourful toppings, and Hanoi’s morning rhythm.",
        },
        ingredientGallery: [
          {
            id: "xoi-glutinous",
            src: "/assets/xoi/xoi.png",
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
            src: "/assets/xoi/1.png",
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
            src: "/assets/xoi/2.png",
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
            image: "/assets/xoi/1.png",
            mapUrl: "https://maps.google.com/?q=35B+Nguy%E1%BB%85n+H%E1%BB%AFu+H%C3%A2n+H%E1%BB%93n+Ki%E1%BA%BFm",
          },
          {
            id: "xoi-ba-thu",
            name: "XOI BA THU",
            address: "57 Tho Nhuom, Hoan Kiem",
            description:
              "Beloved for shredded chicken and braised pork toppings—hearty, flavourful, and affordable.",
            price: "Price: 25,000 – 40,000 VND (~1 – 1.7 USD).",
            image: "/assets/xoi/2.png",
            mapUrl: "https://maps.google.com/?q=57+Th%E1%BB%A3+Nhu%E1%BB%99m+Ho%C3%A0n+Ki%E1%BA%BFm",
          },
          {
            id: "xoi-cat-lam",
            name: "XOI CAT LAM",
            address: "24B Duong Thanh, Hoan Kiem",
            description:
              "A traditional favourite serving classics like xoi xeo and xoi ngo with consistent quality.",
            price: "Price: 20,000 – 50,000 VND (~0.8 – 2 USD).",
            image: "/assets/xoi/3.png",
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
          image: "/assets/bunrieu/rieu.png",
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
          poster: "/assets/bunrieu/rieu.png",
          description: "Delicate crab curds, ruby tomatoes, and fragrant herbs coming together in one bowl.",
        },
        ingredientGallery: [
          {
            id: "bunrieu-crab",
            src: "/assets/bunrieu/1.png",
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
            src: "/assets/bunrieu/2.png",
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
            src: "/assets/bunrieu/3.png",
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
            image: "/assets/bunrieu/1.png",
            mapUrl: "https://maps.google.com/?q=2F+Quang+Trung+Hanoi",
          },
          {
            id: "bunrieu-trang",
            name: "BUN RIEU SUON SUN TRANG",
            address: "23 Nguyen Sieu Street, Hoan Kiem",
            description:
              "Beloved for tender pork ribs and crunchy cartilage that elevate the classic broth.",
            price: "Price: 30,000 – 75,000 VND.",
            image: "/assets/bunrieu/2.png",
            mapUrl: "https://maps.google.com/?q=23+Nguyen+Sieu+Hanoi",
          },
          {
            id: "bunrieu-be-be",
            name: "BUN RIEU BE BE",
            address: "608 Lac Long Quan, Tay Ho",
            description:
              "Adds sweet mantis shrimp to classic crab broth for a lakeside twist that locals adore.",
            price: "Price: 60,000 – 75,000 VND.",
            image: "/assets/bunrieu/3.png",
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
        ],
      },
    ],
  },
};

const STORAGE_KEY = "foodie_map_clicks";

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

export default function Foods() {
  const { language } = useLanguage();
  const content = useMemo(() => {
    const raw = FOODS_COPY[language];
    const uniqueDishes = raw.dishes.reduce((acc, dish) => {
      if (!acc.some((item) => item.id === dish.id)) {
        acc.push(dish);
      }
      return acc;
    }, []);

    return { ...raw, dishes: uniqueDishes };
  }, [language]);
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
    let isActive = true;

    const syncRemoteCounts = async () => {
      try {
        const { data, error } = await fetchClickEvents({ category: "foods", limit: 1000 });
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
          console.warn("Unable to fetch remote click counts for foods:", error.message);
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
