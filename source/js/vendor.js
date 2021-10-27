require('./vendor/modernizr-webp.js');

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('../../node_modules/slick-carousel/slick/slick.min.js');
require('./vendor/jquery.smoothState.js');
require('../../node_modules/imagesloaded/imagesloaded.pkgd.min.js');
import {Tab} from 'bootstrap';

// lighthouse fix  Does not use passive listeners to improve scrolling performance
// more https://stackoverflow.com/questions/60357083/does-not-use-passive-listeners-to-improve-scrolling-performance-lighthouse-repo

$.event.special.touchstart = {
  setup(_, ns, handle) {
    this.addEventListener('touchstart', handle, {passive: !ns.includes('noPreventDefault')});
  },
};
$.event.special.touchmove = {
  setup(_, ns, handle) {
    this.addEventListener('touchmove', handle, {passive: !ns.includes('noPreventDefault')});
  },
};
$.event.special.wheel = {
  setup(_, ns, handle) {
    this.addEventListener('wheel', handle, {passive: true});
  },
};
$.event.special.mousewheel = {
  setup(_, ns, handle) {
    this.addEventListener('mousewheel', handle, {passive: true});
  },
};

// JQuery section

$(function () {
  /* scroll mouse */
  // $('[data-scroll]').on('click', function (event) {
  //   event.preventDefault();

  //   const elementID = $(this).data('scroll');
  //   const elementOffset = $(elementID).offset().top;

  //   $('html,body').animate({
  //     scrollTop: elementOffset,
  //   }, 700);
  // });
  /* -- scroll mouse end -- */
});

// -- этот скрипт загружает модуль для тестирования, его не должно быть в финальном билде и на проде для клиента
// import {testInstruments} from './vendor/testInstruments';

// window.addEventListener('load', () => {
//   testInstruments();
// });
// --
