export const showSideMenu = () => {
  const menuBtn = document.getElementById('menuBtn');
  const pageMenu = document.getElementById('pageMenuWrapper');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu--active');
    pageMenu.classList.toggle('header__inner--active');
  });
};
