const textAnimate = () => {
  let animated_blocks = $(
    "h1, h2, h3, p"
  );

  animated_blocks.addClass("animated-text");
  animated_blocks.attr("data-scroll", "");
  animated_blocks.attr("data-scroll-offset", "50");
};

function img_data_attr() {
  $(".content-picture").attr("data-scroll", "");
  $(".tmb-media").attr("data-scroll-repeat", "");

  $(".translatedImg").attr("data-scroll", "");

  $(".bigTranslatedImg").attr("data-scroll-speed", "-1.5");
  $(".midTranslatedImg").attr("data-scroll-speed", "-1");
}

export { textAnimate };

