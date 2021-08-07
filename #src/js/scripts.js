$(function(){
   /* header menu */

   $('.menu').click(function(){
      $(this).toggleClass('menu--active');
      $('.header__inner').toggleClass('header__inner--active');
   })

   /* -- header menu end -- */

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
});

/* lightbox */

const lightbox = GLightbox({
});

/* lightbox end */