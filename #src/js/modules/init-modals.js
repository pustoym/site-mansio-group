import {setupModal} from '../utils/modal';

const modals = document.querySelectorAll('.modal');
const modalDiscuss = document.querySelector('.modal--discuss');
const modalDiscussBtns = document.querySelectorAll('[data-modal="discuss"]');
// const modalSuccess = document.querySelector('.modal--success');
// const modalSuccessBtns = document.querySelectorAll('[data-modal="success"]');

// аргументы setupModal(modal, closeCallback, modalBtns, openCallback, noPrevDefault, preventScrollLock)
// возможна инициализация только с первыми аргументом,
// если вам нужно открывать модалку в другом месте под какими-нибудь условиями
const initModals = () => {
  // фикс для редких случаев, когда модалка появляется при загрузке страницы
  window.addEventListener('load', () => {
    if (modals.length) {
      modals.forEach((el) => {
        setTimeout(() => {
          el.classList.remove('modal--preload');
        }, 100);
      });
    }
  });

  if (modalDiscuss && modalDiscussBtns.length) {
    setupModal(modalDiscuss, false, modalDiscussBtns, false, false);
  }
  // if (modalSuccess && modalSuccessBtns.length) {
  //   setupModal(modalSuccess, false, modalSuccessBtns);
  // }
};

export {initModals};
