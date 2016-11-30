/*
 * 遅延ロード
 */

export default class Lazyload {
  constructor($lazy) {
    this.$lazy = $lazy;
  }

  // イベントをセット
  setLazyload() {
    this.$lazy.lazyload({
      // effect: 'fadeIn',
      threshold: 300,
      // load: function(){
      //     $(this).children('.js-overlay').addClass('js-card__overlay');
      // }
    });
  }
}
