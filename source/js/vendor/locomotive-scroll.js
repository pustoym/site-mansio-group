import LocomotiveScroll from 'locomotive-scroll';

export const scroll = new LocomotiveScroll({
  // el: document.querySelector('[]'),
  el: document.getElementById("siteWrapper"),
  smooth: true,
  class: "is-inview",
  inertia: 0.7,
});

export const initScroll = () => {
  scroll.init();
};
export const update_scroll = () => {
  scroll.update();
};
export const destroy_scroll =() => {
  scroll.destroy();
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
