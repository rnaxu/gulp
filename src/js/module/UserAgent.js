/*
 * UserAgent取得
 */
module.exports = (function() {

  function UserAgent() {
    this.ua = navigator.userAgent;
  }

  // iPhoneかAndoroidか取得
  UserAgent.prototype.getOS = function() {
    if (this.ua.indexOf('iPhone') > 0) { // iPhoneだったら
      return 'iPhone';
    } else if (this.ua.indexOf('Android') > 0) { // Androidだったら
      return 'Android';
    }
  };

  // iOSのバージョンを取得
  UserAgent.prototype.getIOSVer = function() {
    this.ua.match(/iPhone OS (\w+){1,3}/g);
    var iVersion = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
    return iVersion;
  };

  // Androidのバージョンを取得
  UserAgent.prototype.getAndroidVer = function() {
    var Aversion = parseFloat(this.ua.slice(this.ua.indexOf('Android') + 8));
    return Aversion;
  };

  return UserAgent;

})();