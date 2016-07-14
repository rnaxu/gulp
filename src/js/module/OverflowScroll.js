/*
 * 横スクロール レガシー対応
 */
module.exports = (function() {

  function OverflowScroll() {
    this.$target = $('.js-overflowScroll');
    this.touchStartX = 0;
    this.touchX = 0;
    this.scrollEndX = 0;
  }

  // イベントをセット
  OverflowScroll.prototype.setOverflowScroll = function() {
    var _this = this;

    this.$target.on('touchstart', function(event) {
      var touch = event.originalEvent.changedTouches[0];
      _this.touchStartX = touch.pageX;
    });

    this.$target.on('touchmove', function(event) {
      event.preventDefault();
      var touch = event.originalEvent.changedTouches[0];
      _this.touchX = touch.pageX;
      $(this).scrollLeft(_this.scrollEndX + (_this.touchStartX - _this.touchX));
    });

    this.$target.on('touchend', function() {
      _this.scrollEndX = $(this).scrollLeft();
    });
  };

  return OverflowScroll;

})();