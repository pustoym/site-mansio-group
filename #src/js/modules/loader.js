function createLoader() {
  let loader = document.createElement("div");
  loader.className = "loader";
  document.body.append(loader);
}
const loading = document.getElementById("pageBody");
if (loading.classList.contains("loading") === true) {
  createLoader();
}

function loadrAnimate() {
  $(".loader").addClass("startanimate");
  $(".wrapper").addClass("wrapper--page-loaded");
  setTimeout(function () {
    $(".loader").remove();
    $("body").removeClass("loading");
  }, 1000);
}

const createOnAjaxLoader = () => {
  let loader = document.createElement("div");
  loader.className = "ajaxloader";
  document.body.append(loader);
  setTimeout(function () {
    $(".ajaxloader").addClass("startanimate");
  }, 100);
};
function afterAjaxLoaderAnimate() {
  $(".ajaxloader").addClass("processanimate");
  $(".wrapper").addClass("wrapper--page-loaded");
}

function hideFirstBlock() {
  $(
    ".intro__title, .intro__subtitle, .btn, .intro-item__icon, .intro-item__title, .intro-item__subtitle, .first-screen__inner"
  ).addClass("hideFb animFb");
}

function showFirstBlock() {
  setTimeout(function () {
    $(".animFb").each(function (i) {
      var _elFb = $(this),
        _cntFb = ++i * 250;
      setTimeout(function () {
        _elFb.removeClass("hideFb");
      }, _cntFb);
    });
  }, 1500);
}
