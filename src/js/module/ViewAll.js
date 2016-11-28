/*
 * もっと見る
 */

export default class ViewAll {
  // イベントをセット
  setViewAll() {
    $('.js-viewAll').on('click', (e) => {
      const $this = $(e.currentTarget);

      $this.siblings('.js-viewItem').fadeIn();
      $this.addClass('is-hidden');
    });
  }
}
