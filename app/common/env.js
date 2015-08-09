qianXun.factory('ENV', function ($rootScope, $location) {

    var ua = navigator.userAgent.toLowerCase();

    var ENV = {
        apiSocket: 'http://m.tjoys.net/api/',
        // apiSocket: '/api/',

        isHybrid: false, //-----是否APP环境
        isWeixin: false, //-----是否微信环境
        isApple: false, //------是否苹果环境
        isAndroid: false, //----是否Android环境
        appVersion: '1.0.1' //--APP版本号
    };

    //--是APP环境
    // if (/appuewireless/.test(ua)) {
    //     ENV.isHybrid = true;
    // }
    if (window.isHybridCreateqianxun) {
        ENV.isHybrid = true;
    }

    //--是否Android环境
    if (ENV.isHybrid && /android/.test(ua)) {
        ENV.isAndroid = true;
    }

    //--是否苹果环境
    if (ENV.isHybrid && /iphone|ipad|ipod/.test(ua)) {
        ENV.isApple = true;
        // document.getElementById('js_view').className = 'is_ios';
    }

    //--是否微信环境
    if (/micromessenger/.test(ua)) {
        ENV.isWeixin = true;
    }

    // if (ENV.isHybrid) {
    //     var url = $location.$$absUrl;
    //     ENV.apiSocket = url.replace(/www\/.*/gi, 'www') + ENV.apiSocket;
    // }

    return ENV;

});