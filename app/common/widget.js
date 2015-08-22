qianXun.factory('widget', function ($http, $cacheFactory, $rootScope, $compile, $timeout, $location, $ionicLoading, $ionicBackdrop, $ionicHistory, $ionicScrollDelegate, cachePool, ENV) {

    var toastTimer = null,
        dataPool = $cacheFactory('dataPool');

    var tPackage = {
        /**
         * toast提示层
         * @param msg, time
         */
        msgToast: function (msg, time) {
            var toastDom = angular.element(document.querySelector('.notifier'));

            if (!toastDom.length) {
                var toastTpl = $compile('<div class="notifier" ng-click="notification=null" ng-show="notification"><span>{{notification}}</span></div>');
                angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($rootScope));
            }

            $timeout(function () {
                $rootScope.notification = msg;
            }, 0);

            $timeout.cancel(toastTimer);

            toastTimer = $timeout(function () {
                $rootScope.notification = '';
            }, time || 2000);

        },

        /**
         * 数据缓存 所有缓存都在数据池里操作
         * @param key
         * @param data 如果data不存在，则为取缓存，如果存在，则重写key的值
         */
        cacheData: function (key, data) {

            if (!angular.isString(key)) {
                return false;
            }

            var tmpCache = dataPool.get(key);

            if (data) {
                dataPool.put(key, data); //缓存数据
            } else {
                return tmpCache ? tmpCache : false;
            }
        },

        /**
         * ajax请求
         */
        ajaxRequest: function (params) {
            var self = this;

            if (!params) return;

            //--数据改造加用户信息start
            //-------------ToDo
            var user = {
                'UserId': 22,
                'Auth': 'asdfasdf',

                'Phone': 13596858474,
                'UserName': '测试账号昵称',
                'Sex': 1,
                'City': 2,
                'CityName': '上海',
                'Job': 1,
                'JobName': '园长'
            };

            cachePool.push('UserInfo', user, 48 / 24); //此处之后移动到登录页面
            //-------------ToDo

            var $scope = params.scope || '',
                postOpt = params.data || {},
                obj = {
                    Header: {
                        UserId: '',
                        Auth: ''
                    }
                },
                UserInfo = cachePool.pull('UserInfo');

            if (UserInfo) {
                obj.Header.UserId = UserInfo.UserId;
                obj.Header.Auth = UserInfo.Auth;
            }

            postOpt = angular.extend({}, postOpt, obj);
            //--数据改造加用户信息end

            if (params.showPage) {

                if ($scope.Deploy.isLoading) return;

                $scope.Deploy.isLoading = true;
                $scope.Deploy.pageIndex++;

                angular.extend(postOpt, {
                    PageIndex: $scope.Deploy.pageIndex,
                    PageSize: $scope.Deploy.pageSize
                });
            }

            var options = {
                    success: function () {}, //--成功回调
                    error: function () {}, //----错误回调
                    showPage: false, //---------是否启用分页功能
                    showLoading: true, //-------是否显示loading
                    isLogin: false, //----------判断是否需要登录
                    // isPopup: false, //-------请求结果是否有popup
                },
                ajaxConfig = { //-----------------ajax请求配置
                    method: 'POST',
                    url: ENV.apiSocket + params.url || '',

                    // method: 'GET',
                    // url: ENV.apiSocket + params.url + '.json' || '',

                    data: postOpt,
                    timeout: 15000
                },
                effect = function () {
                    if (options.showLoading) {
                        $ionicLoading.hide();
                    }
                    // if (options.isPopup) {
                    //     $ionicBackdrop.release();
                    // }
                };

            for (var i in params) options[i] = params[i];

            if (options.showLoading) {
                if (!options.showPage || (options.showPage && $scope.Deploy.pageIndex < 2)) {
                    $ionicLoading.show({
                        templateUrl: 'common/directives/mod_loading.html'
                    });
                }
            }

            $http(ajaxConfig).success(function (data) {

                data.Response = {
                    "Ack": "Success",
                    "State": true
                };

                // if (data.Response && data.Response.Ack == "Success") { toDo
                if (data.Response) {

                    if ($scope) {
                        if (!$scope.Deploy) {
                            $scope.Deploy = {};
                        };

                        if (data.Response.State) {
                            $scope.Deploy.isLogin = true;
                        } else {
                            $scope.Deploy.isLogin = false;
                            $scope.Deploy.uId = 0;
                            cachePool.remove("UserInfo");
                        }
                    }

                    if (typeof options.success === 'function') {
                        options.success(data);
                    }

                    if (params.showPage) { //如果Total大于Index*Size，则isMore = false;

                        $scope.Deploy.isLoading = false;
                        $scope.Deploy.pageTotal = data.Total || 0;

                        if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize) >= $scope.Deploy.pageTotal) {
                            $scope.Deploy.isMore = false;
                        } else {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    }

                } else {

                    self.msgToast('数据请求错误！');

                }

                effect();

            }).error(function (data) {

                if (typeof options.error === 'function') {
                    options.error(data);
                } else {
                    self.msgToast('请检查你的网络！');
                }

                if (options.showPage) {
                    $scope.Deploy.isLoading = false;
                }

                effect();

            });

        },

        /**
         * native StatusBar 显示
         *
         */
        showStatusBar: function () {

            if (ENV.isHybrid) {
                document.addEventListener("deviceready", onDeviceReady, false);

                function onDeviceReady() {
                    StatusBar.show();
                }
            }

        },

        /**
         * 清除历史记录
         *
         */
        clearHistory: function () {
            $ionicHistory.clearHistory();
        },

        changeOpacity: function () {
            var top = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top,
                opacity = 0;

            if (top > 30) {
                opacity = ((top - 30) / 100).toFixed(1);
            } else {
                opacity = 0;
            }

            if (opacity > 1) {
                opacity = 1;
            }

            angular.element(document.querySelector('.js_op_header .js_op_change')).css({
                "opacity": opacity
            });
        },

        /**
         * 初始化用户登录信息
         */
        initUser: function (scope) {
            var userInfo = cachePool.pull('UserInfo');

            if (!scope.Deploy) {
                scope.Deploy = {};
            }

            if (userInfo && userInfo.UserId) {
                scope.UserInfo = angular.extend({}, userInfo);
                scope.Deploy.uId = userInfo.UserId;
                scope.Deploy.isLogin = true;
            } else {
                scope.UserInfo = {};
                scope.Deploy.isLogin = false;
                scope.Deploy.uId = 0;
            }
        },

        /**
         * 注销用户登录信息
         */
        cleanLogin: function (scope) {
            scope.Deploy.uId = 0;
            scope.Deploy.isLogin = false;
            cachePool.remove("UserInfo");
        },

        /**
         * 检查手机号
         */
        checkPhone: function (phone) {
            var self = this,
                status = false;

            if (!phone) {
                self.msgToast('请输入手机号码');

                status = true;
            }

            if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone)) {
                self.msgToast('手机号码格式不合法');

                status = true;
            }

            return status;
        }

    };

    /**
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var paramObj = function (obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    return tPackage;
});
