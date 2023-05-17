$(function () {
  /* -- 헤더 높이만큼 페딩 적용 */
  setTimeout(() => {
    const headerHeight = $("header").outerHeight();
    $(".landing").css("padding-top", `${headerHeight}px`);
    $(".sign-form").css("padding-top", `${headerHeight}px`);
  }, 300);
  $(window).on("resize", function () {
    const headerHeight = $("header").outerHeight();
    $(".landing").css("padding-top", `${headerHeight}px`);
    $(".sign-form").css("padding-top", `${headerHeight}px`);
  });

  // 메인 랜딩 슬라이더
  /*===== VISUAL SLIDER FUNCTION ===== */

  function visualSlider() {
    var visualSlider = new Swiper(".landing-slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".landing .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          var bulletArray = [];
          $(".landing .swiper-slide").each(function () {
            bulletArray.push($(this).find("span").html());
          });
          return `
            <div class="${className} main-slide-bullet">
              <span>0${index + 1}</span>
              <em>${bulletArray[index + 1]}</em>
            </div>
          `;
        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      on: {
        init: function () {
          $(".landing-slider").addClass("load-init");
        },
        progress: function () {
          for (var i = 0; i < this.slides.length; i++) {
            var slideProgress = this.slides[i].progress;
            var innerOffset = this.width * 0.5;
            var innerTranslate = slideProgress * innerOffset;
            this.slides[i].querySelector(".bg-wrap").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        },
        // touchStart: function () {
        //   for (var i = 0; i < this.slides.length; i++) {
        //     this.slides[i].style.transition = "";
        //   }
        // },
        setTransition: function (speed) {
          for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = speed + "ms";
            this.slides[i].querySelector(".bg-wrap").style.transition =
              speed + "ms";
          }
        },
      },
    });

    visualSlider.on("slideChange", function () {
      $(".landing-slider").removeClass("load-init");
    });
  }
  const isSwiper = $(".swiper-wrapper");
  if (isSwiper.length > 0) {
    visualSlider();
  }

  /*-------- FITTING MD PICK IMAGE RATIO --------*/
  function fit2ImageRatio(el1, el2, elv1, elv2) {
    const mdImageWidth = $(el1).width();
    const panelWidth = $(el2).width();
    $(el1).height(mdImageWidth * elv1);
    $(el2).height(panelWidth * elv2);
  }

  $(window).on("resize", function () {
    fit2ImageRatio(
      ".pick-tab-panel.on .panel-img",
      ".pick-tab-panel.on .panel-desc",
      0.8,
      0.4
    );
  });
  $(".pick-tab-btn").on("click", function () {
    fit2ImageRatio(
      ".pick-tab-panel.on .panel-img",
      ".pick-tab-panel.on .panel-desc",
      0.8,
      0.4
    );
  });
  fit2ImageRatio(
    ".pick-tab-panel.on .panel-img",
    ".pick-tab-panel.on .panel-desc",
    0.8,
    0.4
  );

  /*-------- FITTING NEW ART IMAGE RATIO --------*/
  function fit1ImageRatio(el1, elv1) {
    const fitElmtWidth = $(el1).width();
    $(el1).height(fitElmtWidth * elv1);
  }

  fit1ImageRatio(".new-art-image", 1.4);
  $(window).on("resize", function () {
    fit1ImageRatio(".new-art-image", 1.4);
  });

  /*-------- FITTING REVIEW IMAGE RATIO --------*/
  fit1ImageRatio(".review-image", 0.8);
  $(window).on("resize", function () {
    fit1ImageRatio(".review-image", 0.8);
  });

  /*-------- GO TO TOP --------*/
  $(window).on("scroll", function () {
    const sct = $(window).scrollTop();
    if (sct > 100) {
      $(".to-top").css("display", "flex");
    } else {
      $(".to-top").css("display", "none");
    }
  });

  $(".to-top").on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, "fast");
  });

  /*-------- LOADER EFFECT --------*/
  const isPreloader = $(".preloader");
  if (isPreloader.length > 0) {
    // (isPreloader !== null)
    $(".js-preloader").preloadinator({
      minTime: 1000,
      animation: "fadeOut",
      animationDuration: 400,
    });
  }
});
