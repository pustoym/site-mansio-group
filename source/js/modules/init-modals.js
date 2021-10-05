import {setupModal} from '../utils/modal';

// аргументы setupModal(modal, closeCallback, modalBtns, openCallback, noPrevDefault, preventScrollLock)
// возможна инициализация только с первыми аргументом,
// если вам нужно открывать модалку в другом месте под какими-нибудь условиями
const initModals = () => {
  const modals = document.querySelectorAll('.modal');

  const modalDiscuss = document.querySelector('.modal--discuss');
  const modalDiscussBtns = document.querySelectorAll('[data-modal="discuss"]');

  const modalRefForVie = document.querySelector('.modal--registration-for-viewing');
  const modalRefForVieBtns = document.querySelectorAll('[data-modal="registration-for-viewing"]');

  const modalAlreadyHave = document.querySelector('.modal--already-have');
  const modalAlreadyHaveBtns = document.querySelectorAll('[data-modal="already-have"]');

  const modalBackCall = document.querySelector('.modal--back-call');
  const modalBackCallBtns = document.querySelectorAll('[data-modal="back-call"]');

  const modalvacancyResponse = document.querySelector('.modal--vacancyResponse');
  const modalvacancyResponseBtns = document.querySelectorAll('[data-modal="vacancyResponse"]');

  const modalVacancy1 = document.querySelector('.modal--vacancy1');
  const modalVacancy1Btns = document.querySelectorAll('[data-modal="vacancy1"]');

  const modalVacancy2 = document.querySelector('.modal--vacancy2');
  const modalVacancy2Btns = document.querySelectorAll('[data-modal="vacancy2"]');

  const modalVacancy3 = document.querySelector('.modal--vacancy3');
  const modalVacancy3Btns = document.querySelectorAll('[data-modal="vacancy3"]');

  const modalVacancy4 = document.querySelector('.modal--vacancy4');
  const modalVacancy4Btns = document.querySelectorAll('[data-modal="vacancy4"]');

  const modalVacancy5 = document.querySelector('.modal--vacancy5');
  const modalVacancy5Btns = document.querySelectorAll('[data-modal="vacancy5"]');

  const modalMemberET = document.querySelector('.modal--memberET');
  const modalMemberETBtns = document.querySelectorAll('[data-modal="memberET"]');

  const modalMemberED = document.querySelector('.modal--memberED');
  const modalMemberEDBtns = document.querySelectorAll('[data-modal="memberED"]');

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
  if (modalRefForVie && modalRefForVieBtns.length) {
    setupModal(modalRefForVie, false, modalRefForVieBtns, false, false);
  }
  if (modalAlreadyHave && modalAlreadyHaveBtns.length) {
    setupModal(modalAlreadyHave, false, modalAlreadyHaveBtns, false, false);
  }
  if (modalBackCall && modalBackCallBtns.length) {
    setupModal(modalBackCall, false, modalBackCallBtns, false, false);
  }
  if (modalvacancyResponse && modalvacancyResponseBtns.length) {
    setupModal(modalvacancyResponse, false, modalvacancyResponseBtns, false, false);
  }
  if (modalVacancy1 && modalVacancy1Btns.length) {
    setupModal(modalVacancy1, false, modalVacancy1Btns, false, false);
  }
  if (modalVacancy2 && modalVacancy2Btns.length) {
    setupModal(modalVacancy2, false, modalVacancy2Btns, false, false);
  }

  if (modalVacancy3 && modalVacancy3Btns.length) {
    setupModal(modalVacancy3, false, modalVacancy3Btns, false, false);
  }

  if (modalVacancy4 && modalVacancy4Btns.length) {
    setupModal(modalVacancy4, false, modalVacancy4Btns, false, false);
  }

  if (modalVacancy5 && modalVacancy5Btns.length) {
    setupModal(modalVacancy5, false, modalVacancy5Btns, false, false);
  }

  if (modalMemberET && modalMemberETBtns.length) {
    setupModal(modalMemberET, false, modalMemberETBtns, false, false);
  }

  if (modalMemberED && modalMemberEDBtns.length) {
    setupModal(modalMemberED, false, modalMemberEDBtns, false, false);
  }
};

export {initModals};
