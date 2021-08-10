import {initModals} from './modules/init-modals';
initModals();

$(function(){
   /* header menu */

   $('.menu').click(function(){
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

   $('.product__btn').click(function(){
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

   $('#filterShow').click(function(){
      $('.filter__inner').fadeIn();
   })

   $('#filterHide').click(function(){
      $('.filter__inner').fadeOut();
   })

   /* -- filter -- */

   /* ---- SLIDER END ---- */
});
