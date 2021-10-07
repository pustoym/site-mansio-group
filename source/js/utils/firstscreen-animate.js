export const addHideClassToFirstScreen = () => {
  $(
      '.intro__title, .intro__subtitle, #pageFirstScreen .btn, .benefits-list__item-icon, .benefits-list__item-title, .benefits-list__item-subtitle, .first-screen__inner'
  ).addClass('hideFb animFb');
};

export const showFirstBlock = () => {
  setTimeout(function () {
    $('.animFb').each(function (i) {
      let _elFb = $(this);
      let _cntFb = ++i * 250;
      setTimeout(function () {
        _elFb.removeClass('hideFb');
      }, _cntFb);
    });
  }, 1500);
};