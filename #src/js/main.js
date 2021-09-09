import { jqSlick } from "./vendor/slick-slider";
import { lightbox } from "./vendor/glightbox";
import { initModals } from "./modules/init-modals";
import { smParams } from "./modules/pageload";
import { textAnimate } from "./modules/animate";
import { showSideMenu } from "./modules/show-side-menu";
import { showFilter } from "./modules/catalog-filter";
import { tabs } from "./modules/product-tabs";
// import { scroll } from "./vendor/locomotive-scroll";

document.addEventListener("DOMContentLoaded", function () {
  jqSlick();
  tabs();
  showSideMenu();
  showFilter();
  initModals();
  // textAnimate();

  // ajax links
  if (!$("body").hasClass("disable-effects")) {
    $("#loadcontent").smoothState(smParams);

    // $(".header__link a, .footer__link, .header__logo[href], .footer__logo[href]").on("click", function (e) {
    //   createOnAjaxLoader();
    //   e.preventDefault();
    //   var content = $("#loadcontent").smoothState(smParams).data("smoothState");
    //   var href = $(this).attr("href");
    //   content.load(href);
    // });

    // $('.go_ajax').click(function(e) {
    //     close_menu();
    //     e.preventDefault();
    //     var content = $('#loadcontent').smoothState(smParams).data('smoothState');
    //     var href = $(this).attr('href');
    //     content.load(href);
    // });
  }
});
