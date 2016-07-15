(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * アコーディオン
 */
module.exports = function () {

  function Accordion() {}

  // イベントをセット
  Accordion.prototype.setAccordion = function () {
    $('.js-listHeader').on('click', function () {
      $(this).siblings('.js-listGroup').slideToggle() // アコーディオンの中身を表示・非表示
      .end().toggleClass('list__inner--close list__inner--open'); // 矢印の向きを変える
    });
  };

  return Accordion;
}();

},{}],2:[function(require,module,exports){
'use strict';

/*
 * 位置情報取得
 */
module.exports = function () {

  function GeoSearch() {
    this.$geoSearch = $('.js-geoSearch');
  }

  // イベントをセット
  GeoSearch.prototype.setGeoSearch = function () {
    var _this = this;

    // 現在地周辺ボタンが押下されたら
    this.$geoSearch.on('click', function () {
      // GeolocationAPIに対応しているかチェック
      _this.checkGeoApi();
    });
  };

  // 現在地周辺ボタンをトルツメ
  GeoSearch.prototype.hiddenGeoSearch = function () {
    var $wrap = this.$geoSearch.parents('.js-geoSeachWrap');
    $wrap.addClass('is-hidden');
    $wrap.siblings('.js-slider').removeClass('slider--map');
  };

  // GeolocationAPIに対応しているかチェック
  GeoSearch.prototype.checkGeoApi = function () {
    if (navigator.geolocation) {
      // 位置情報取得可能
      this.getPosition();
    } else {
      // 位置情報取得不可能
      alert('ご利用の端末では位置情報を取得できません。');
    }
  };

  // 位置情報を取得
  GeoSearch.prototype.getPosition = function () {
    // オプション・オブジェクト
    var optionObj = {
      enableHighAccuracy: false, // trueを指定すると精度の高い情報を取得する
      timeout: 10000 // この秒数以上時間がかかった場合、タイムアウトでエラーに
      // maximumAge: 5000 // 次回再び現在位置を取得する時に、ここで指定した秒数だけ今回のデータをキャッシュする。デフォルトは0。
    };

    navigator.geolocation.getCurrentPosition(this.successFunc, this.errorFunc, optionObj);
  };

  // 位置情報の取得に成功した時に実行する関数
  GeoSearch.prototype.successFunc = function (position) {
    var latLng = {};
    latLng.lat = position.coords.latitude;
    latLng.lng = position.coords.longitude;

    var mapUrl = '';

    /* global mapBaseUrl:false */

    if (mapBaseUrl.indexOf('?') === -1) {
      // URLにGETパラメータが存在しない場合
      mapUrl = mapBaseUrl + '?cplt=' + latLng.lat + '&cpln=' + latLng.lng;
    } else {
      // URLにGETパラメータが存在する場合
      mapUrl = mapBaseUrl + '&cplt=' + latLng.lat + '&cpln=' + latLng.lng;
    }

    // 生成したURLに遷移させる
    location.href = mapUrl;
  };

  // 位置情報の取得に失敗した時に実行する関数
  GeoSearch.prototype.errorFunc = function (error) {
    // エラーコードのメッセージを定義
    var errorMessage = {
      0: '位置情報が取得できませんでした。', // 原因不明のエラー
      1: '位置情報が取得できませんでした。ご利用の端末の設定をご確認ください。', // 端末の設定で、もしくはこのページに対して、位置情報の取得が拒否されている
      2: '位置情報が取得できませんでした。電波状況やご利用の端末の設定をご確認ください。', // 電波または端末の設定の問題
      3: '位置情報が取得できませんでした。' // タイムアウト
    };

    // エラーコードに合わせたエラー内容をアラート表示
    alert(errorMessage[error.code]);
  };

  return GeoSearch;
}();

},{}],3:[function(require,module,exports){
'use strict';

/*
 * 遅延ロード
 */
module.exports = function () {

  function Lazyload() {}

  // イベントをセット
  Lazyload.prototype.setLazyload = function () {
    $('.js-lazy').lazyload({
      // effect: 'fadeIn',
      threshold: 300
      // load: function(){
      //     $(this).children('.js-overlay').addClass('js-card__overlay');
      // }
    });
  };

  return Lazyload;
}();

},{}],4:[function(require,module,exports){
'use strict';

/*
 * 横スクロール レガシー対応
 */
module.exports = function () {

  function OverflowScroll() {
    this.$target = $('.js-overflowScroll');
    this.touchStartX = 0;
    this.touchX = 0;
    this.scrollEndX = 0;
  }

  // イベントをセット
  OverflowScroll.prototype.setOverflowScroll = function () {
    var _this = this;

    this.$target.on('touchstart', function (event) {
      var touch = event.originalEvent.changedTouches[0];
      _this.touchStartX = touch.pageX;
    });

    this.$target.on('touchmove', function (event) {
      event.preventDefault();
      var touch = event.originalEvent.changedTouches[0];
      _this.touchX = touch.pageX;
      $(this).scrollLeft(_this.scrollEndX + (_this.touchStartX - _this.touchX));
    });

    this.$target.on('touchend', function () {
      _this.scrollEndX = $(this).scrollLeft();
    });
  };

  return OverflowScroll;
}();

},{}],5:[function(require,module,exports){
'use strict';

/*
 * UserAgent取得
 */
module.exports = function () {

  function UserAgent() {
    this.ua = navigator.userAgent;
  }

  // iPhoneかAndoroidか取得
  UserAgent.prototype.getOS = function () {
    if (this.ua.indexOf('iPhone') > 0) {
      // iPhoneだったら
      return 'iPhone';
    } else if (this.ua.indexOf('Android') > 0) {
      // Androidだったら
      return 'Android';
    }
  };

  // iOSのバージョンを取得
  UserAgent.prototype.getIOSVer = function () {
    this.ua.match(/iPhone OS (\w+){1,3}/g);
    var iVersion = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
    return iVersion;
  };

  // Androidのバージョンを取得
  UserAgent.prototype.getAndroidVer = function () {
    var Aversion = parseFloat(this.ua.slice(this.ua.indexOf('Android') + 8));
    return Aversion;
  };

  return UserAgent;
}();

},{}],6:[function(require,module,exports){
'use strict';

/*
 * もっと見る
 */
module.exports = function () {

  function ViewAll() {}

  // イベントをセット
  ViewAll.prototype.setViewAll = function () {
    $('.js-viewAll').on('click', function () {
      var $this = $(this);
      $this.siblings('.js-viewItem').fadeIn();
      $this.addClass('is-hidden');
    });
  };

  return ViewAll;
}();

},{}],7:[function(require,module,exports){
'use strict';

/*
 * 実行
 */
var Lazyload = require('./module/Lazyload');
var UserAgent = require('./module/UserAgent');
var OverflowScroll = require('./module/OverflowScroll');
var GeoSearch = require('./module/GeoSearch');
var ViewAll = require('./module/ViewAll');
var Accordion = require('./module/Accordion');

(function () {

  var lazyload = new Lazyload();
  var userAgent = new UserAgent();
  var overflowScroll = new OverflowScroll();
  var geoSearch = new GeoSearch();
  var viewAll = new ViewAll();
  var accordion = new Accordion();

  // 遅延ロード
  lazyload.setLazyload();

  var os = userAgent.getOS();

  if (os === 'iPhone') {
    // iPhoneだったら

    // 現在地取得
    geoSearch.setGeoSearch();

    if (userAgent.getIOSVer() < 500) {
      // iOS5より古かったら
      // JSで横スクロール
      overflowScroll.setOverflowScroll();
    }
  } else if (os === 'Android') {

    // 現在地周辺ボタンをトルツメ
    geoSearch.hiddenGeoSearch();

    if (userAgent.getAndroidVer() < 4) {
      // Android4より古かったら
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

},{"./module/Accordion":1,"./module/GeoSearch":2,"./module/Lazyload":3,"./module/OverflowScroll":4,"./module/UserAgent":5,"./module/ViewAll":6}]},{},[7]);
