qianXun

/** 
 *  引用方法：
 *  <header-bar
 *      title="string"           //定义标题
 *      right="text|fn"          //定义取消按钮方法
 *      transparent              //定义是否透明
 *  </header-bar>
 */
    .directive('headerBar', function ($window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/header_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function (scope, element, attrs) {

            // scope.Page = {};
            if (!scope.Page) {
                scope.Page = {};
            }
            scope.Page.Title = scope.Page.Title || attrs.title || '';
            scope.Page.RightText = scope.Page.RightText || (attrs.right ? attrs.right.split('|')[0] : '');
            scope.Page.RightFun = scope.Page.RightFun || (attrs.right ? scope.$eval(attrs.right.split('|')[1]) : '');

            // if (attrs.transparent !== undefined) {
            //     scope.isTransparent = true;

            //     angular.element($window).on("scroll", function () {
            //         headerBy();
            //     });
            //     // angular.element($window).on("touchstart", function () {
            //     //     headerBy();
            //     // });
            //     angular.element($window).on("touchmove", function () {
            //         headerBy();
            //     });
            //     angular.element($window).on("touchend", function () {
            //         headerBy();
            //     });

            //     function headerBy() {
            //         var top = angular.element(document.querySelector('.scroll-content'))[0].scrollTop,
            //             op = 0;

            //         if (top > 30) {
            //             op = ((top - 30) / 100).toFixed(1);
            //         } else {
            //             op = 0;
            //         }

            //         scope.HeaderBg = {
            //             opacity: op
            //         }
            //     }
            // }

        }
    };
});
