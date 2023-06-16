/*-------- HEADER HIDE AND SHOW --------*/
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */

setTimeout(() => {
  // window.addEventListener('DOMContentLoaded', function () {
  // function loadDom() {
  let prevScrollpos = window.pageYOffset;
  const header = document.querySelector("header");
  // console.log(header);

  window.addEventListener("scroll", function () {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 150) {
      header.classList.remove("top");
      if (prevScrollpos > currentScrollPos) {
        header.style.top = 0;
      } else {
        header.style.top = -100 + "%";
      }
      prevScrollpos = currentScrollPos; // 마우스 이동 후 스크롤 위치값 재할당
    } else {
      header.classList.add("top");
    }
  });

  /*-------- MOBILE MENU HIDE AND SHOW --------*/
  const mobileMenuIcon = document.querySelector(".menu-icon");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const mobileCloseIcon = document.querySelector(".close-icon");
  // console.log(mobileMenuIcon);
  mobileMenuIcon.addEventListener("click", function (e) {
    e.preventDefault(); // default original effect prevented
    mobileOverlay.classList.add("on");
    document.body.style.overflow = "hidden"; // when menu activated, all scroll prevented
  });
  mobileCloseIcon.addEventListener("click", function (e) {
    e.preventDefault();
    mobileOverlay.classList.remove("on");
    document.body.style.overflow = "auto";
  });

  // target, currentTarge
  mobileOverlay.addEventListener("click", function (e) {
    // console.log(e.target); // point to clicked element
    // console.log(e.currentTarget); // point to uppest element(최상위)
    // console.log(e.target.nodeName);
    if (
      e.target.getAttribute("class") !== "mobile-menus" &&
      e.target.nodeName !== "LI" &&
      e.target.nodeName !== "A" &&
      e.target.nodeName !== "IMG"
    ) {
      mobileOverlay.classList.remove("on");
      document.body.style.overflow = "auto";
    }
  });
  // }, 2000);
  // }

  /*-------- BEST ITEMS SLIDE --------*/
  const isSwiper = document.querySelectorAll(".swiper-wrapper");
  if (isSwiper.length > 0) {
    const bestArtSwiper = new Swiper(".best-image-wrapper .swiper", {
      slidesPerView: 4,
      spaceBetween: 15,

      // If we need pagination
      pagination: {
        el: ".best-swiper-pagination",
        clickable: true,
        type: "bullets",
      },
      breakpoints: {
        480: {
          // 480 이하
          slidesPerView: 1, // 보이는 슬라이드 갯수
          slidesPerGroup: 1, // 하나의 페이지네이션에 묶이는 슬라이드 갯수
        },
        880: {
          // 880 이하
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1400: {
          // 1400 이하
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
    });

    /*-------- NEW ART SLIDE --------*/
    const newArtSwiper = new Swiper(".new-art-slider-wrapper .swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".new-swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        480: {
          // 480 이하
          slidesPerView: 1, // 보이는 슬라이드 갯수
          slidesPerGroup: 1, // 하나의 페이지네이션에 묶이는 슬라이드 갯수
          spaceBetween: 0,
        },
        786: {
          // 786 이하
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10,
        },
      },
    });

    /*-------- PRODUCT PAGE SLIDE --------*/
    const contentsNumber = $(".swiper-contents .text-contents");
    const slideCount = $(".swiper-contents .swiper-slide").length;
    const num = $(".swiper-text-wrapper .num");
    const productSwiper = new Swiper(".product .swiper", {
      slidesPerView: 1,
      loop: true,
      on: {
        init: function () {
          $(".swiper-text-wrapper .text-contents:first-of-type").addClass(
            "active"
          );

          num.text($(this)[0].activeIndex + " / " + slideCount);
        },
        slideChange: () => {
          contentsNumber.removeClass("active");
          contentsNumber.eq(productSwiper.realIndex).addClass("active");
          num.text(productSwiper.realIndex + 1 + " / " + slideCount);
        },
      },
      navigation: {
        nextEl: ".preview-swiper .btn_next",
        prevEl: ".preview-swiper .btn_prev",
      },
    });
  }

  /*----- AOS Plugin Initiate ----- */
  AOS.init({
    duration: 1200,
  });
}, 2000);

/*-------- MD PICK TBAS --------*/
// 1. 요소 선택
// pick 패널 요소
const btns = document.querySelectorAll(".pick-tab-btn");
const panels = document.querySelectorAll(".pick-tab-panel");

// admin 패널 요소
const adminBtns = document.querySelectorAll(".admin-btns button");
const adminPanels = document.querySelectorAll(".admin-panel");

// 2. 함수 정의
function commonTabs(bts, pns) {
  function activeTabs(i) {
    bts.forEach((btn) => {
      btn.classList.remove("on");
    });
    pns.forEach((panel) => {
      panel.classList.remove("on");
    });
    bts[i].classList.add("on");
    pns[i].classList.add("on");
  }

  // 3. 함수 호출
  bts.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      activeTabs(idx);
    });
  });
}

commonTabs(btns, panels); // pick 패널 실행
commonTabs(adminBtns, adminPanels); // admin 패널 실행

// Direct Gallery Text Effect
const dgLetters = document.querySelectorAll(".direct-gallery-inside span");
// console.log(dgLetters);
dgLetters.forEach((lt, i) => {
  const delayIndex = i + 8;
  if (delayIndex < 10) {
    lt.style.animationDelay = `0.${delayIndex}s`;
  } else {
    lt.style.animationDelay = `${delayIndex / 10}s`;
    // console.log(i / 10);
    // const strIndex = String(i);
    // const strArr = [...strIndex];
    // console.log(strArr[0]);
    // lt.style.animationDelay = `${strArr[0]}.${strArr[1]}s`;
  }
});

// 브라우저가 컨텐츠 내용 보다 크면 요소를 화면 위아래로 맞춤
function fitBrowerHeight(el1, el2) {
  const windowHeight = $(el1).outerHeight();
  const wrapperHeight = $(el2).outerHeight();

  if (windowHeight > wrapperHeight) {
    //786 < 1023
    $(el2).css({
      display: "flex",
      "flex-direction": "column",
      "justify-content": "space-between",
      height: "100vh",
    });
  } else {
    $(el2).css({
      display: "block",
      height: "auto",
    });
  }
}

setTimeout(() => {
  fitBrowerHeight(window, ".wrapper");
}, 1200);

// 모바일 버전 감지 후 PC 버전에서만 실행 시킴(계획)
// setTimeout(() => {
//   fitBrowerHeight(window, ".wrapper");
// }, 300);

// const delay = 200;
// let timer = null;
// $(window).on("resize", function () {
//   clearTimeout(timer);
//   timer = setTimeout(function () {
//     fitBrowerHeight(window, ".wrapper");
//     document.location.reload();
//   }, delay);
// });

// ------ 이미지 미리보기 ------- //
const imageFile = document.querySelector("#f_img");
if (imageFile) {
  imageFile.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      const imagePreview = document.querySelector("#preview-img");
      imagePreview.setAttribute("src", e.target.result);
    };
    fitBrowerHeight(window, ".wrapper");
  });
}
