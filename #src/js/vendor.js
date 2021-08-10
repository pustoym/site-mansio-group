import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import GLightbox from 'glightbox';
require('../../node_modules/slick-carousel/slick/slick.min.js')

//-- этот скрипт загружает модуль для тестирования, его не должно быть в финальном билде и на проде для клиента
import {testInstruments} from './vendor/testInstruments';

window.addEventListener('load', () => {
  testInstruments();
});
//--

const lightbox = GLightbox({
});
