import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  // el: document.querySelector('[data-scroll-container]'),
  el: document.getElementById('siteWrapper'),
  // el: document.getElementById('jsScroll'),
  smooth: true,
  inertia: 0.7,
});

export const initScroll = () => {
  scroll.init();
};
export const updateScroll = () => {
  scroll.update();
};
export const destroyScroll = () => {
  scroll.destroy();
};

export const scrollMenuLegacy = () => {

  const html = document.querySelector('html');
  const header = document.getElementById('pageHeader');
  // let windowHeight = html.clientHeight;
  let windowHeight = $(window).outerHeight();
  let scrollPrev = 0;


  // show hide menu on locomotive scroll
  if (html.classList.contains('has-scroll-init')) {
    scroll.on('scroll', (obj) => {
      let scrolled = obj.scroll.y;

      if (scrolled > 100 && scrolled > scrollPrev) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }

      if (scrolled > windowHeight) {
        header.classList.add('header--bg-dark');
      } else {
        header.classList.remove('header--bg-dark');
      }
      scrollPrev = scrolled;
    });
  }

  // show hide menu on window scroll
  if (!html.classList.contains('has-scroll-init')) {
    $(document).on('scroll', function () {
      let scrolled = $(window).scrollTop();

      if (scrolled > 100 && scrolled > scrollPrev) {
        header.addClass('header--hide');
      } else {
        header.removeClass('header--hide');
      }

      if (scrolled > windowHeight) {
        header.addClass('header--hide');
      } else {
        header.removeClass('header--hide');
      }
      scrollPrev = scrolled;
    });
  }
};
export const scrollMenu = () => {

  const html = document.querySelector('html');
  const header = document.getElementById('pageHeader');
  let wHeight = $(window).outerHeight();
  console.log('компонент скрола меню подключен');

  if ($('.header').length > 0) {
    console.log('длина хедера больше нуля');
    let headerTopPos = wHeight;

    if (!html.classList.contains('has-scroll-init')) {
      $(document).on('scroll', function () {

        if ($(window).scrollTop() > headerTopPos) {
          header.classList.add('header--bg-dark');
        } else {
          header.classList.remove('header--bg-dark');
        }
      })
    }

    if (html.classList.contains('has-scroll-init')) {
      console.log('локомотив скролл активен');
      scroll.on('scroll', (obj) => {

        if (obj.scroll.y > headerTopPos) {
          console.log('позиция скрола больше величины окна');
          header.classList.add('header--bg-dark');
        } else {
          header.classList.remove('header--bg-dark');
        }
      });
    }
  }
};

// $("body").imagesLoaded(function () {
//   if (!$("body").hasClass("disable-effects")) {
//     document.body.classList.remove("loading");
//     tmb_mediaHeight();
//     scroll.update();
//     $(window).resize(function () {
//       setTimeout(function () {
//         tmb_mediaHeight();
//         scroll.update();
//       }, 700);
//     });
//   }
// });
