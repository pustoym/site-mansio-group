require('./vendor/modernizr-webp.js');
import LocomotiveScroll from 'locomotive-scroll';
// const scroll = new LocomotiveScroll();
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   class: "is-inview",
//   inertia: 0.7,
// });

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('../../node_modules/slick-carousel/slick/slick.min.js')

// lighthouse fix  Does not use passive listeners to improve scrolling performance
// more https://stackoverflow.com/questions/60357083/does-not-use-passive-listeners-to-improve-scrolling-performance-lighthouse-repo
jQuery.event.special.touchstart = {
  setup: function( _, ns, handle ) {
      this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.touchmove = {
  setup: function( _, ns, handle ) {
      this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.wheel = {
  setup: function( _, ns, handle ){
      this.addEventListener("wheel", handle, { passive: true });
  }
};
jQuery.event.special.mousewheel = {
  setup: function( _, ns, handle ){
      this.addEventListener("mousewheel", handle, { passive: true });
  }
};

// JQuery section

$(function(){
  /* header menu */

  $('.menu').on( "click", function() {
     $(this).toggleClass('menu--active');
     $('.header__inner').toggleClass('header__inner--active');
  })

  /* -- header menu end -- */

  /* scroll mouse */

  $("[data-scroll]").on('click', function (event) {
     event.preventDefault();

     const elementID = $(this).data('scroll');
     const elementOffset = $(elementID).offset().top;

     $("html,body").animate({
        scrollTop: elementOffset
     }, 700);
  });

  /* -- scroll mouse end -- */

  /* product tabs */

  $('.product__btn').on( "click", function() {
     /* nav script */
     $('.product__btn').removeClass('product__btn--active');
     $(this).addClass('product__btn--active');

     /* content script */
     const id = $(this).attr('data-product'),
     content = $('.product__content[data-product="'+ id +'"]');

     $('.product__content--active').removeClass('product__content--active');
     content.addClass('product__content--active');
  })

  /* -- product tabs end -- */

  /* SLIDER */

  /* slider reviews */

  $('.reviews-slider__content').slick({
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     dots: false,
     arrows: false,
     variableWidth: true,
     centerMode: true,
     responsive: [
        {
           breakpoint: 1180,
           settings: {
              centerMode: false,
              variableWidth: false
           }
        },
        {
           breakpoint: 576,
           settings: {
              autoplay: true,
              variableWidth: false,
              centerMode: false,
              speed: 1500
           }
        }
     ]
  });

  /* -- slider reviews end -- */

  /* slider foto */

  $('.reviews-slider__foto-slider').slick({
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     dots: true,
     arrows: false,
     swipe: false,
     responsive: [
        {
           breakpoint: 991,
           settings: {
              autoplay: true
           }
        }
     ]
  });

  /* -- slider foto end -- */

  /* filter */

  $('#filterShow').on( "click", function() {
     $('.filter__inner').fadeIn();
  })

  $('#filterHide').on( "click", function() {
     $('.filter__inner').fadeOut();
  })

  /* -- filter -- */

  /* ---- SLIDER END ---- */
});

import GLightbox from 'glightbox';
const lightbox = GLightbox({});

//-- этот скрипт загружает модуль для тестирования, его не должно быть в финальном билде и на проде для клиента
// import {testInstruments} from './vendor/testInstruments';

// window.addEventListener('load', () => {
//   testInstruments();
// });
//--
