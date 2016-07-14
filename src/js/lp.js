/*
 * 実行
 */
var Lazyload = require('./module/Lazyload');
var UserAgent = require('./module/UserAgent');
var OverflowScroll = require('./module/OverflowScroll');
var GeoSearch = require('./module/GeoSearch');
var ViewAll = require('./module/ViewAll');
var Accordion = require('./module/Accordion');

(function() {

  var lazyload = new Lazyload();
  var userAgent = new UserAgent();
  var overflowScroll = new OverflowScroll();
  var geoSearch = new GeoSearch();
  var viewAll = new ViewAll();
  var accordion = new Accordion();

  // 遅延ロード
  lazyload.setLazyload();

  var os = userAgent.getOS();

  if (os === 'iPhone') { // iPhoneだったら

    // 現在地取得
    geoSearch.setGeoSearch();

    if (userAgent.getIOSVer() < 500) { // iOS5より古かったら
      // JSで横スクロール
      overflowScroll.setOverflowScroll();
    }

  } else if (os === 'Android') {

    // 現在地周辺ボタンをトルツメ
    geoSearch.hiddenGeoSearch();

    if (userAgent.getAndroidVer() < 4) { // Android4より古かったら
      // JSで横スクロール
      overflowScroll.setOverflowScroll();
    }

  } else {
    // 現在地周辺ボタンをトルツメ
    geoSearch.hiddenGeoSearch();
  }

  // もっと見る
  viewAll.setViewAll();

  // アコーディオン
  accordion.setAccordion();

})();