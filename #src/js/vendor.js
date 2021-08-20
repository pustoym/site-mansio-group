require('./vendor/modernizr-webp.js');
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
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

import GLightbox from 'glightbox';
require('../../node_modules/slick-carousel/slick/slick.min.js')

//-- этот скрипт загружает модуль для тестирования, его не должно быть в финальном билде и на проде для клиента
// import {testInstruments} from './vendor/testInstruments';

// window.addEventListener('load', () => {
//   testInstruments();
// });
//--

const lightbox = GLightbox({
});
