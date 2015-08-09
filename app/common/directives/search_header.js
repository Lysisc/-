/*
 * header search 搜索顶部
 */

qianXun.directive('searchHeader', function ($state, $ionicViewSwitcher, widget, cachePool) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/search_header.html',
        // controller: function ($scope, $element, $attrs) {
        // },
        // compile: function (element, attrs, transclude) {
        //  return {
        //      pre: function preLink(scope, element, attrs, controller) {},
        //      post: function postLink(scope, element, attrs, controller) {}
        //  }
        // },
        link: function (scope, element, attrs) {
            //--搜索文本
            scope.keyword = "";

            scope.toSearch = function () {
                if (scope.keyword) {

                    var key = cachePool.pull('Keyword') || [];

                    angular.forEach(key, function (v, k) {
                        if (scope.keyword == v) {
                            key.splice(k, 1);
                        }
                    });

                    key.splice(0, 0, scope.keyword);

                    cachePool.push('Keyword', key);

                    $ionicViewSwitcher.nextDirection('forward');
                    $state.go('forum.search-result', {
                        keyword: encodeURIComponent(scope.keyword)
                    });

                } else {

                    if ($state.is('forum.search')) {

                        widget.msgToast('请输入关键字！');

                    } else {

                        $ionicViewSwitcher.nextDirection('forward');
                        $state.go('forum.search');

                    }
                }
            };
        }
    };
});