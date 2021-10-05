export const showFilter = () => {
  const btnShowFilter = document.getElementById("filterShow");
  const btnHideFilter = document.getElementById("filterHide");
  const filterInner = document.getElementById("filterContent");

  if (btnShowFilter && btnHideFilter && filterInner) {
    [btnShowFilter, btnHideFilter].forEach((btn) => {
      btn.addEventListener("click", () => {
        filterInner.classList.toggle("filter__inner--active");
      });
    });
  }
};
