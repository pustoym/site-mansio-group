export const createLoader = () => {
  let loader = document.createElement('div');
  loader.className = 'loader';
  document.body.append(loader);
};

export const loading = document.getElementById('pageBody');
if (loading.classList.contains('loading') === true) {
  createLoader();
}

export const loadrAnimate = () => {
  $('.loader').addClass('startanimate');
  $('.wrapper').addClass('wrapper--page-loaded');
  setTimeout(() => {
    $('.loader').remove();
    $('body').removeClass('loading');
  }, 1000);
};

export const createOnAjaxLoader = () => {
  let loader = document.createElement('div');
  loader.className = 'ajaxloader';
  document.body.append(loader);
  setTimeout(() => {
    $('.ajaxloader').addClass('startanimate');
  }, 100);
};

export const afterAjaxLoaderAnimate = () => {
  $('.ajaxloader').addClass('processanimate');
  $('.wrapper').addClass('wrapper--page-loaded');
};