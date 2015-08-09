// 瀑布流布局
qianXun.directive('falls', function ($q, $timeout, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<ul class="mod_list_falls ng-transclude"></ul>',
        controller: function ($scope, $element, $attrs) {
            $rootScope.setFalls = function (id) {

                var deferred = $q.defer(),
                    promise = deferred.promise;

                // deferred.notify(); //处理中，显示loading样式

                $timeout(function () {

                    var $el = $element;

                    if (id) { //取对应ID的falls
                        $el = angular.element(document.getElementById(id));
                    }

                    if ($el.find('li').length == 0) {
                        deferred.reject(); //如果没有li则终止任务
                        return;
                    }

                    var obj = {
                        'x': 10, //--左边总高度
                        'y': 10 //--右边总高度
                    };

                    var p = (document.body.clientWidth - 10) / 400; //取可视区域作等比运算

                    angular.forEach($el.find('li'), function (v, k) {

                        angular.element(v).find('img').eq(0).css({
                            'height': v.dataset.y * p + 'px'
                        });

                        var h = v.offsetHeight;

                        if (obj.x <= obj.y) {

                            v.style.cssText = 'left:0;top:' + obj.x + 'px';
                            obj.x = obj.x + 10 + h;

                        } else {

                            v.style.cssText = 'right:0;top:' + obj.y + 'px';
                            obj.y = obj.y + 10 + h;

                        }

                    });

                    if (obj.x <= obj.y) {
                        $el.css('height', obj.y + 'px');
                    } else {
                        $el.css('height', obj.x + 'px');
                    }

                    deferred.resolve($el); //处理完成执行回调

                }, 0);

                promise.then(function success($el) { //显示内容
                        $el.find('li').addClass('active');
                    },
                    function error(error) {},
                    function notification(notification) {});


            };

        }
    };
});