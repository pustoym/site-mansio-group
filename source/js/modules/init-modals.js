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

  // Vacancy modals
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

  // Team members modals
  const ModalMember1 = document.querySelector('.modal--memberAdminDA');
  const ModalBtnsMember1 = document.querySelectorAll('[data-modal="memberAdminDA"]');

  const ModalMember2 = document.querySelector('.modal--memberET');
  const ModalBtnsMember2 = document.querySelectorAll('[data-modal="memberET"]');

  const ModalMember3 = document.querySelector('.modal--memberED');
  const ModalBtnsMember3 = document.querySelectorAll('[data-modal="memberED"]');

  const ModalMember4 = document.querySelector('.modal--memberArchitectPA');
  const ModalBtnsMember4 = document.querySelectorAll('[data-modal="memberArchitectPA"]');

  const ModalMember5 = document.querySelector('.modal--memberConstructorSB');
  const ModalBtnsMember5 = document.querySelectorAll('[data-modal="memberConstructorSB"]');

  const ModalMember6 = document.querySelector('.modal--memberConstructorIA');
  const ModalBtnsMember6 = document.querySelectorAll('[data-modal="memberConstructorIA"]');

  const ModalMember7 = document.querySelector('.modal--memberBuilderVK');
  const ModalBtnsMember7 = document.querySelectorAll('[data-modal="memberBuilderVK"]');


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

  if (ModalMember1 && ModalBtnsMember1.length) {
    setupModal(ModalMember1, false, ModalBtnsMember1, false, false);
  }

  if (ModalMember2 && ModalBtnsMember2.length) {
    setupModal(ModalMember2, false, ModalBtnsMember2, false, false);
  }

  if (ModalMember3 && ModalBtnsMember3.length) {
    setupModal(ModalMember3, false, ModalBtnsMember3, false, false);
  }

  if (ModalMember4 && ModalBtnsMember4.length) {
    setupModal(ModalMember4, false, ModalBtnsMember4, false, false);
  }

  if (ModalMember5 && ModalBtnsMember5.length) {
    setupModal(ModalMember5, false, ModalBtnsMember5, false, false);
  }

  if (ModalMember6 && ModalBtnsMember6.length) {
    setupModal(ModalMember6, false, ModalBtnsMember6, false, false);
  }

  if (ModalMember7 && ModalBtnsMember7.length) {
    setupModal(ModalMember7, false, ModalBtnsMember7, false, false);
  }
};

export {initModals};
