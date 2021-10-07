export const textAnimate = () => {
  let animatedBlocks = $(
      'h1, h2, h3, h4, h5, h6, p:not([class^="action-call"]), li, dt, dd, .btn:not(.card__modal-btn)'
  );

  animatedBlocks.addClass('animated-text');
  animatedBlocks.attr('data-scroll', '');
  animatedBlocks.attr('data-scroll-offset', '50');
};

export const addAttrScrollToImg = () => {
  $('.js-picture').attr('data-scroll', '');
  $('.js-picture').attr('data-scroll-repeat', '');

  $('.js-picture__img').attr('data-scroll', '');

  $('.js-picture__img--big-scroll').attr('data-scroll-speed', '-1.5');
  $('.js-picture__img--mid-scroll').attr('data-scroll-speed', '-1');
};


// function limitImgHeight() {
//   let pictures = document.querySelectorAll('.js-picture');
//   pictures.forEach((picture) => {
//     picture.removeAttr('style');
//     let img = picture.find('.js-picture__img').height();
//     picture.css('height', img + 'px');
//   });
// }

export const limitImgHeight = () => {
  $('.js-picture').each(function () {
    $(this).removeAttr('style');
    let _el = $(this).find('.js-picture__img').height();
    $(this).css('height', _el + 'px');
  });
};
