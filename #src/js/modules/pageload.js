import { jqSlick } from "../vendor/slick-slider";
import { lightbox } from "../vendor/glightbox";
import { initModals } from "./init-modals";
import { textAnimate } from "./animate";
import { showSideMenu } from "./show-side-menu";
import { showFilter } from "./catalog-filter";
import { tabs } from "./product-tabs";
// import {initScroll, update_scroll, destroy_scroll} from "../vendor/locomotive-scroll";

const reinitOnAfter = () => {
  lightbox.init();
  // initScroll();
  initModals();
  // textAnimate();
  showSideMenu();
  showFilter();
  tabs();
};

export const createLoader = () => {
  let loader = document.createElement("div");
  loader.className = "loader";
  document.body.append(loader);
};

export const loading = document.getElementById("pageBody");
if (loading.classList.contains("loading") === true) {
  createLoader();
}

export const loadrAnimate = () => {
  $(".loader").addClass("startanimate");
  $(".wrapper").addClass("wrapper--page-loaded");
  setTimeout(() => {
    $(".loader").remove();
    $("body").removeClass("loading");
  }, 1000);
};

export const createOnAjaxLoader = () => {
  let loader = document.createElement("div");
  loader.className = "ajaxloader";
  document.body.append(loader);
  setTimeout(() => {
    $(".ajaxloader").addClass("startanimate");
  }, 100);
};

export const afterAjaxLoaderAnimate = () => {
  $(".ajaxloader").addClass("processanimate");
  $(".wrapper").addClass("wrapper--page-loaded");
};

export const addHideClassToFirstScreen = () => {
  $(
    ".intro__title, .intro__subtitle, #pageFirstScreen .btn, .benefits-list__item-icon, .benefits-list__item-title, .benefits-list__item-subtitle, .first-screen__inner"
  ).addClass("hideFb animFb");
};

export const showFirstBlock = () => {
  setTimeout(function () {
    $(".animFb").each(function (i) {
      var _elFb = $(this),
        _cntFb = ++i * 250;
      setTimeout(function () {
        _elFb.removeClass("hideFb");
      }, _cntFb);
    });
  }, 1500);
};

export const smParams = {
  debug: true,
  prefetch: true,
  cacheLength: 10,
  pageCacheSize: 100,
  scroll: true,
  autoScrolling: false,
  repeatDelay: 500,
  blacklist: "a.glightbox, a.header__consultation, .pageFirstScreen btn",
  anchors: "a",
  onBefore: ($currentTarget, $container) => {
    createOnAjaxLoader();
  },
  onStart: {
    duration: 700,
    render: ($container) => {
      console.log();
      setTimeout(() => {
        // destroy_scroll();
        // $('html').addClass('has-scroll-smooth');
        // $('#js-scroll').removeAttr('style');
      }, 600);

      // $(window).scrollTop(0);
      // if ($("div").hasClass("glightbox-container")) {
      //   $.lightbox.destroy();
      // }

      // временно здесь
      setTimeout(() => {
        $("body").removeClass("loading");
        afterAjaxLoaderAnimate();
        showFirstBlock();
      }, 1000);
      setTimeout(() => {
        $(".ajaxloader").remove();
        // update_scroll();
      }, 2000);
    },
  },
  OnProgress: {
    duration: 300,
    render: function ($container) {},
  },
  onAfter: function ($container, $newContent) {
    // $('html').removeClass('has-scroll-smooth');
    reinitOnAfter();
    addHideClassToFirstScreen();

    $("body")
      .imagesLoaded()
      .done(function (instance) {
        jqSlick();
        // animMenuEls();
        showFirstBlock();
        // scrollMenu();

        setTimeout(function () {
          // if ($('body').hasClass('chrome')) {
          //     tmb_mediaHeight();
          // }

          $("body").removeClass("loading");
          afterAjaxLoaderAnimate();
          // update_scroll();
        }, 500);

        setTimeout(function () {
          $(".ajaxloader").remove();
        }, 1000);
      });
  },
};
