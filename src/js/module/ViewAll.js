/*
 * もっと見る
 */

export default class ViewAll {
  constructor($viewAll) {
    this.$viewAll = $viewAll;
  }

  // イベントをセット
  setViewAll() {
    this.$viewAll.on('click', (e) => {
      const $this = $(e.currentTarget);

      $this.siblings('.js-viewItem').fadeIn();
      $this.addClass('is-hidden');
    });
  }
}
