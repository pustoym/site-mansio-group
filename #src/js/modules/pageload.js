import { initModals } from "./init-modals";

const pageLoad = () => {
  var sm_params = ({
    debug: true,
    prefetch: true,
    cacheLength: 10,
    pageCacheSize: 100,
    scroll: true,
    autoScrolling: false,
    repeatDelay: 500,
    blacklist: "a.glightbox, a.header__consultation, .pageFirstScreen btn",
    anchors: "a",
    onBefore: function ($currentTarget, $container) {
      createOnAjaxLoader();
    },
    onStart: {
      duration: 700,
      render: function ($container) {
        console.log();
        // setTimeout(function () {
        //   $('body').find('.styles_from_ajax').remove();
        //   $('body').find('.js_from_ajax').remove();
        //   destroy_scroll();
        //   $('html').addClass('has-scroll-smooth');
        //   $('#js-scroll').removeAttr('style');
        //   $('.top-header').removeClass('dark-bg');
        //   $('.top-header').removeClass('out');
        // }, 600);

        $(window).scrollTop(0);
        if ($("div").hasClass("glightbox-container")) {
          $.lightbox.destroy();
        }
        // временно здесь
        setTimeout(function () {
          $("body").removeClass("loading");
          afterAjaxLoaderAnimate();
          showFirstBlock();
        }, 1000);
        setTimeout(function () {
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

      initModals();
      // $('[data-modal]').on('click', () => {
      //   $('.modal').addClass('modal--active');
      // })
      hideFirstBlock();

      $("body").imagesLoaded().done(function (instance) {
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
  });

  document.addEventListener("DOMContentLoaded", function () {
    // ajax links
    if (!$("body").hasClass("disable-effects")) {
      $("#loadcontent").smoothState(sm_params);

      $(
        ".header__link a, .footer__link, .header__logo[href], .footer__logo[href]").on("click", function (e) {
        createOnAjaxLoader();
        e.preventDefault();
        var content = $("#loadcontent")
          .smoothState(sm_params)
          .data("smoothState");
        var href = $(this).attr("href");
        content.load(href);
      });

      // $('.go_ajax').click(function(e) {
      //     close_menu();
      //     e.preventDefault();
      //     var content = $('#loadcontent').smoothState(sm_params).data('smoothState');
      //     var href = $(this).attr('href');
      //     content.load(href);
      // });
    }
  });

  function createLoader() {
    let loader = document.createElement("div");
    loader.className = "loader";
    document.body.append(loader);
  }
  const loading = document.getElementById("pageBody");
  if (loading.classList.contains("loading") === true) {
    createLoader();
  }

  function loadrAnimate() {
    $(".loader").addClass("startanimate");
    $(".wrapper").addClass("wrapper--page-loaded");
    setTimeout(function () {
      $(".loader").remove();
      $("body").removeClass("loading");
    }, 1000);
  }

  const createOnAjaxLoader = () => {
    let loader = document.createElement("div");
    loader.className = "ajaxloader";
    document.body.append(loader);
    setTimeout(function () {
      $(".ajaxloader").addClass("startanimate");
    }, 100);
  };
  function afterAjaxLoaderAnimate() {
    $(".ajaxloader").addClass("processanimate");
    $(".wrapper").addClass("wrapper--page-loaded");
  }

  function hideFirstBlock() {
    $(
      ".intro__title, .intro__subtitle, .btn, .intro-item__icon, .intro-item__title, .intro-item__subtitle, .first-screen__inner"
    ).addClass("hideFb animFb");
  }

  function showFirstBlock() {
    setTimeout(function () {
      $(".animFb").each(function (i) {
        var _elFb = $(this),
          _cntFb = ++i * 250;
        setTimeout(function () {
          _elFb.removeClass("hideFb");
        }, _cntFb);
      });
    }, 1500);
  }

};
export {pageLoad};
