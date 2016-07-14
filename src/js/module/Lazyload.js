/*
 * 遅延ロード
 */
module.exports = (function() {

  function Lazyload() {
  }

  // イベントをセット
  Lazyload.prototype.setLazyload = function() {
    $('.js-lazy').lazyload({
      // effect: 'fadeIn',
      threshold: 300
      // load: function(){
      //     $(this).children('.js-overlay').addClass('js-card__overlay');
      // }
    });
  };

  return Lazyload;

})();