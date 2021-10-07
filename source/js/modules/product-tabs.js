export const tabs = () => {
  const tabsBtns = document.querySelectorAll('.product__btn');

  tabsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

      let tabBtnActive = document.querySelector('.product__btn--active');
      let tabActive = document.querySelector('.product__content--active');

      tabBtnActive.classList.remove('product__btn--active');
      btn.classList.add('product__btn--active');

      let btnId = btn.getAttribute('data-product');
      let tabId = document.querySelector(
          `.product__content[data-product="${btnId}"`
      );

      tabActive.classList.remove('product__content--active');
      tabId.classList.add('product__content--active');
    });
  });
};
