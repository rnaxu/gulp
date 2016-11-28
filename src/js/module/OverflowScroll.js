/*
 * 横スクロール レガシー対応
 */

export default class OverflowScroll {

  constructor() {
    this.$target = $('.js-overflowScroll');
    this.touchStartX = 0;
    this.touchX = 0;
    this.scrollEndX = 0;
  }

  // イベントをセット
  setOverflowScroll() {
    this.$target.on('touchstart', (e) => {
      const touch = e.originalEvent.changedTouches[0];
      this.touchStartX = touch.pageX;
    });

    this.$target.on('touchmove', (e) => {
      e.preventDefault();

      const touch = e.originalEvent.changedTouches[0];

      this.touchX = touch.pageX;

      $(e.currentTarget).scrollLeft(this.scrollEndX + (this.touchStartX - this.touchX));
    });

    this.$target.on('touchend', (e) => {
      this.scrollEndX = $(e.currentTarget).scrollLeft();
    });
  }

}
