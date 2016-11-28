/*
 * アコーディオン
 */

export default class Accordion {
  constructor($listHeader, listGroup) {
    this.$listHeader = $listHeader;
    this.listGroup = listGroup;
  }

  // イベントをセット
  setAccordion() {
    this.$listHeader.on('click', (e) => {
      $(e.currentTarget)
        .siblings(this.listGroup).slideToggle() // アコーディオンの中身を表示・非表示
        .end()
        .toggleClass('list__inner--close list__inner--open'); // 矢印の向きを変える
    });
  }
}
