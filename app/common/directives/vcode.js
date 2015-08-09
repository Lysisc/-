// 获取验证码
qianXun.directive('getVcode', function ($rootScope, $timeout, widget) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            // widget.initUser(scope);

            if ($rootScope.vEnable) { //初始化，如果之前的倒计时未结束，则继续倒计时

                $timeout.cancel($rootScope.vTimer);

                countdown();

            } else {

                $rootScope.vColdDown = 0;
                $rootScope.vBtnText = '发送验证码';

            }

            function countdown() {
                $rootScope.vEnable = true;
                $rootScope.vTimer = $timeout(function () {
                    $rootScope.vColdDown--;
                    if ($rootScope.vColdDown <= 0) {
                        $rootScope.vEnable = false;
                        $rootScope.vBtnText = "重新发送验证码";
                        return;
                    }
                    $rootScope.vBtnText = "重新发送(" + $rootScope.vColdDown + ")";

                    countdown();
                }, 1000);
            }

            element.bind('click', function (e) {

                var status = widget.checkPhone(scope.cInput.phone);

                if (status) return;

                if ($rootScope.vColdDown !== 0) {
                    return;
                } else {
                    $rootScope.vColdDown = 60;
                    $rootScope.vBtnText = "重新发送(" + $rootScope.vColdDown + ")";
                    countdown(); //开始倒计时
                }

                widget.ajaxRequest({
                    url: 'setSendPhone',
                    data: {
                        Phone: scope.cInput.phone
                    },
                    success: function (data) {
                        widget.msgToast('验证码已发送到' + scope.cInput.phone + '手机上');
                    }
                });

            });


            // var defer = $q.defer();
            // var promise = defer.promise;

            // promise.then(function success(data) {
            //     console.log(data);

            //     var anotherDeferred = $q.defer();

            //     $timeout(function () {
            //         anotherDeferred.resolve('bar');
            //     }, 1000);

            //     return anotherDeferred.promise;

            // }, function error(data) {
            //     console.log(data);
            // }).then(function success(data) {
            //     console.log(data);
            // });

            // defer.notify(3);
            // defer.resolve(1);
            // defer.reject(2);

            // $q.all({
            //     first: $http.get('http://127.0.0.1:9999/api/getClubHotUser.json'),
            //     second: $http.get('http://127.0.0.1:9999/api/getClubHotUser.json')
            // }).then(function (arr) {
            //     console.log(arr);
            // });

            // $q.all([
            //     $http.get('http://127.0.0.1:9999/api/getClubHotUser.json'),
            //     $http.get('http://127.0.0.1:9999/api/getClubHotUser.json')
            // ]).then(function (data) {
            //     console.log(data);
            // });

            // function getJson(arg) {
            //     var deferred = $q.defer();
            //     var url = 'http://127.0.0.1:9999/api/' + arg + '.json';

            //     $http.get(url).success(function (d) {
            //         console.log(d);
            //         deferred.resolve(d);
            //     });

            //     return deferred.promise;
            // }

            // getJson('getClubHotUser')
            //     .then(getJson('getClubHotUser'))
            //     .then(getJson('getClubHotUser'))
            //     .then(getJson('getClubHotUser'))
            //     .then(function (data) {
            //         console.log(data);
            //     });

        }
    };
});