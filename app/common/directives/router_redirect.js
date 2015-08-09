'use strict';

qianXun.directive('pageBack', function ($window, $state, $rootScope, $stateParams, $ionicHistory, $ionicViewSwitcher) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function () {

                // if (attrs.pageBack) {

                //     var params = scope.$eval(attrs.pageBack);

                //     console.log(params);

                // } else if (false) { //特殊情况处理

                //     console.log(1);

                // } else { // 默认执行浏览器后退

                $ionicViewSwitcher.nextDirection('back'); //forward
                $window.history.back();
                // }

                // $ionicHistory.goBack();

                // $rootScope.$ionicGoBack();
            });
        }
    };
})


.directive('pageJump', function ($window, $state, $rootScope, $stateParams, $ionicHistory, $ionicViewSwitcher) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function (event) {
                var direction = "forward";

                if (attrs.pageJump == "none") {
                    direction = "none";
                    // scope.$destroy();
                    scope.loadMore = {};
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                }

                var router = attrs.router,
                    options = attrs.options ? scope.$eval(attrs.options) : {};

                $ionicViewSwitcher.nextDirection(direction);

                // $ionicHistory.nextViewOptions({
                //     disableAnimate: true,
                //     disableBack: true
                // });

                $state.go(router, options, {
                    inherit: false
                });

            });
        }
    };
});