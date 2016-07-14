/*
 * アコーディオン
 */
module.exports = (function() {

  function Accordion() {
  }

  // イベントをセット
  Accordion.prototype.setAccordion = function() {
    $('.js-listHeader').on('click', function() {
      $(this)
        .siblings('.js-listGroup').slideToggle() // アコーディオンの中身を表示・非表示
        .end()
        .toggleClass('list__inner--close list__inner--open'); // 矢印の向きを変える
    });
  };

  return Accordion;

})();