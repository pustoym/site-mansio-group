import {initScroll, updateScroll, destroyScroll, scrollMenu} from '../vendor/locomotive-scroll';
import {addHideClassToFirstScreen, showFirstBlock} from '../utils/firstscreen-animate';
import {jqSlick} from '../vendor/slick-slider';
import {lightbox} from '../vendor/glightbox';
import {initModals} from './init-modals';
import {textAnimate, addAttrScrollToImg} from './animate';
import {showSideMenu} from './show-side-menu';
import {showFilter} from './catalog-filter';
import {tabs} from './product-tabs';
import {tabGallery} from './tabgallery';
import {createOnAjaxLoader, afterAjaxLoaderAnimate} from '../utils/loaders';


const reinitOnAfter = () => {
  initScroll();
  initModals();
  lightbox.init();
  textAnimate();
  addAttrScrollToImg();
  showSideMenu();
  showFilter();
  tabs();
  // tabGallery();
  addHideClassToFirstScreen();
  // animMenuEls();
  showFirstBlock();
  scrollMenu();
};

export const smoothParams = {
  debug: true,
  prefetch: true,
  cacheLength: 10,
  pageCacheSize: 100,
  scroll: true,
  autoScrolling: false,
  repeatDelay: 500,
  blacklist:
    'a.js-no-smoothState, a.glightbox, a.header__consultation, .pageFirstScreen btn, a:not([href]), a[download]',
  anchors: 'a',
  onBefore: () => {
    createOnAjaxLoader();
  },
  onStart: {
    duration: 700,
    render: () => {
      console.log('smooth state Start');
      setTimeout(() => {
        destroyScroll();
        $('html').addClass('has-scroll-smooth');
        $('#siteWrapper').removeAttr('style');
        $('#pageHeader').removeClass('header--bg-dark');
        $('#pageHeader').removeClass('header--hide');
      }, 300);

      $(window).scrollTop(0);
      // if ($("div").hasClass("glightbox-container")) {
      //   $.lightbox.destroy();
      // }

      // временно здесь
      setTimeout(() => {
        $('body').removeClass('loading');
        afterAjaxLoaderAnimate();
        showFirstBlock();
      }, 1000);

      setTimeout(() => {
        $('.ajaxloader').remove();
        updateScroll();
      }, 2000);
    },
  },
  OnProgress: {
    duration: 300,
    render() {},
  },
  onAfter() {
    $('html').removeClass('has-scroll-smooth');
    reinitOnAfter();

    $('body').imagesLoaded().done(function () {
      jqSlick();

      setTimeout(function () {
        // if ($('body').hasClass('chrome')) {
        //     tmb_mediaHeight();
        // }

        $('body').removeClass('loading');
        afterAjaxLoaderAnimate();
        updateScroll();
      }, 500);

      setTimeout(function () {
        $('.ajaxloader').remove();
      }, 1000);
    });
  },
};
