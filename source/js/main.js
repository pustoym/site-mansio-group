import {initModals} from './modules/init-modals';
import {smoothParams} from './modules/pageload';
import {textAnimate, addAttrScrollToImg, limitImgHeight} from './modules/animate';
import {initScroll, destroyScroll, updateScroll, scrollMenu} from './vendor/locomotive-scroll';
// import {addHideClassToFirstScreen,showFirstBlock} from './utils/firstscreen-animate.js';
import {showSideMenu} from './modules/show-side-menu';
import {showFilter} from './modules/catalog-filter';
import {tabs} from './modules/product-tabs';
// import {jqSlick} from './vendor/slick-slider';


document.addEventListener('DOMContentLoaded', () => {
  showSideMenu();
  textAnimate();
  addAttrScrollToImg();
  // destroyScroll();
  // initScroll();
  updateScroll();
  scrollMenu();

  window.addEventListener('load', () => {
    initModals();
    showFilter();
    tabs();
    // jqSlick();
  });
  // ajax links
  if (!$('body').hasClass('disable-effects')) {
    $('#siteWrapper').smoothState(smoothParams);

    // $(".header__link a, .footer__link a, .header__logo[href], .footer__logo[href]").on("click", function (e) {
    //   createOnAjaxLoader();
    //   e.preventDefault();
    //   let content = $("#siteWrapper").smoothState(smParams).data("smoothState");
    //   let href = $(this).attr("href");
    //   content.load(href);
    // });

    // $('.go_ajax').click(function(e) {
    //     close_menu();
    //     e.preventDefault();
    //     var content = $('#siteWrapper').smoothState(smParams).data('smoothState');
    //     var href = $(this).attr('href');
    //     content.load(href);
    // });
  }
});

$('body').imagesLoaded(function () {
  if (!$('body').hasClass('disable-effects')) {
    document.body.classList.remove('loading');
    limitImgHeight();
    updateScroll();
    $(window).resize(function () {
      setTimeout(function () {
        limitImgHeight();
        updateScroll();
      }, 700);
    });
  }
});
