/*
 * もっと見る
 */
module.exports = (function() {

  function ViewAll() {
  }

  // イベントをセット
  ViewAll.prototype.setViewAll = function() {
    $('.js-viewAll').on('click', function() {
      var $this = $(this);
      $this.siblings('.js-viewItem').fadeIn();
      $this.addClass('is-hidden');
    });
  };

  return ViewAll;

})();