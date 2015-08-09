qianXun.directive('footerBar', function ($state, cachePool, ENV) {

    var uid = 0,
        UserInfo = cachePool.pull('UserInfo') || '';

    if (UserInfo) {
        uid = UserInfo.UserId;
    }

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/footer_bar.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {


            // 拿取消息状态
            widget.ajaxRequest({
                scope: $scope,
                url: 'getMsgNews',
                data: {},
                success: function (data) {
                    if (data.Response && data.Response.Ack == "Success") {
                        $scope.msgStatus = {
                            isPraise: data.isPraise,
                            isComment: data.isComment,
                            isNotice: data.isNotice,
                            isTalk: data.isTalk
                        }

                        if (data.isPraise || data.isComment || data.isNotice || data.isTalk) {
                            $scope.isMessage = true;
                        }
                    }
                }
            });

            $rootScope.addPhoto = function () {

                if (ENV.isHybrid) {
                    var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
                        el = document.querySelector('.js_mod_camera');

                    if (el) {
                        el.style.display = "block";
                    } else {
                        // $element.after(toastTpl($scope));
                        angular.element(document.querySelector('.pane')).after(toastTpl($scope));
                    }

                    $scope.noScroll = {
                        'overflow-y': 'hidden'
                    };
                } else {
                    widget.msgToast('请下载APP吧！');
                }

                return;

            };


            // var currentUrl = $state.current.url.replace(/^\//g, '');
            var current = $scope.footerTab;

            $scope.menuChange = function (e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var direction = 'left',
                        id = $that.attr('data-id');

                    $scope.footerTab = id;

                    // if ((id == 3 || id== 4 || id == 5) && !uid) {
                    //     routerRedirect.toJump({
                    //         url: ['entry/#/login.htm?from='+ currentUrl]
                    //     });
                    //     return;
                    // }

                    if (id == 3) {

                        if (ENV.isHybrid) {
                            var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
                                el = document.querySelector('.js_mod_camera');

                            if (el) {
                                el.style.display = "block";
                            } else {
                                $element.after(toastTpl($scope));
                            }

                            $scope.noScroll = {
                                'overflow-y': 'hidden'
                            };
                        } else {
                            widget.msgToast('请下载APP吧！');
                        }

                        return;
                    }

                    if (id < current) {
                        direction = 'right';
                    }

                    $that.addClass('current');

                    $state.go(SiteUrl[id - 1].route, SiteUrl[id - 1].options || {});
                }
            };

            $scope.hideCamera = function (e) {
                var $that = angular.element(e.delegationTarget);

                $that.parent().css('display', 'none');

                $scope.noScroll = {
                    'overflow-y': 'auto'
                };
            };
        }
    };
});


// .directive('addPhoto', function (
//     $state,
//     $parse, 
//     $timeout,
//     $compile,
//     $ionicViewSwitcher,
//     widget,
//     ENV
// ) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {

//             element.on("click", function () {

//                 widget.initUser(scope);

//                 if (!scope.Deploy.isLogin) {
//                     scope.showLogin();

//                     return;
//                 };

//                 if (ENV.isHybrid) {
//                     var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
//                         el = document.querySelector('.js_mod_camera');

//                     if (el) {
//                         el.style.display = "block";
//                     } else {
//                         // $element.after(toastTpl($scope));
//                         angular.element(document.querySelector('.pane')).after(toastTpl(scope));
//                     }

//                     scope.noScroll = {
//                         'overflow-y': 'hidden'
//                     };
//                 } else {
//                 //     widget.msgToast('请下载APP吧！');
//                     $ionicViewSwitcher.nextDirection("forward");
//                     $state.go("forum.photo-title");
//                 }

//             });


//             scope.hideCamera = function (e) {
//                 var $that = angular.element(e.delegationTarget);

//                 $that.parent().css('display', 'none');

//                 scope.noScroll = {
//                     'overflow-y': 'auto'
//                 };
//             };

//         }
//     };
// })


// .directive('ngPhoto', function (
//     $parse, 
//     $timeout
// ) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {

//             element.on('click', function () {
//                 // alert(1);
//                 // document.addEventListener("deviceready", onDeviceReady, false);

//                 // function onDeviceReady() {
//                 //     alert(2);
//                     window.navigator.camera.getPicture(onSuccess, onFail, { 
//                         quality: 100,
//                         // destinationType: Camera.DestinationType.DATA_URL,
//                         destinationType: Camera.DestinationType.FILE_URI,
//                         sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//                     });
//                 // }
//             });

//             function onSuccess(imageData) {
//                 console.log("获取图片成功！");

//                 sessionStorage.setItem('imageData', encodeURIComponent(imageData));

//                 // .toJump({
//                 //     'url': ['forum/#/photo/edit.htm']
//                 // });
//             }

//             function onFail(message) {
//                 console.log("获取图片失败！");
//             }

//         }
//     };
// })

// .directive('ngCamera', function (
//     $parse, 
//     $timeout,
//     widget
// ) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {

//             element.on('click', function () {

//                 widget.initUser(scope);

//                 if (!scope.Deploy.isLogin) {
//                     scope.showLogin();

//                     return;
//                 };



//                 document.addEventListener("deviceready", onDeviceReady, false);

//                 function onDeviceReady() {
//                     navigator.camera.getPicture(onSuccess, onFail, { 
//                         quality: 50,
//                         // destinationType: Camera.DestinationType.DATA_URL,
//                         destinationType: Camera.DestinationType.FILE_URI,
//                         // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//                         sourceType: Camera.PictureSourceType.CAMERA
//                     });
//                 }
//             });

//             function onSuccess(imageData) {
//                 // alert(imageData);
//                 // var image = document.getElementById('myImage');
//                 // image.src = "data:image/jpeg;base64," + imageData;
//                 // var div = angular.element(document.getElementById('abc'));
//                 // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
//                 // $rootScope.imageData = imageData;
//                 console.log("获取图片成功！");


//                 sessionStorage.setItem('imageData', encodeURIComponent(imageData));

//                 // routerRedirect.toJump({
//                 //     'url': ['forum/#/photo/edit.htm']
//                 // });
//             }

//             function onFail(message) {
//                 console.log("获取图片失败！");
//             }

//         }
//     };
// });

// // 上传图片
// .directive('appFilereader', function(
//     $q,
//     widget
// ) {
//     var slice = Array.prototype.slice;

//     return {
//         restrict: 'A',
//         require: '?ngModel',
//         link: function(scope, element, attrs, ngModel) {
//                 if (!ngModel) return;

//                 ngModel.$render = function() {
//                     // alert(2);
//                 };

//                 element.bind('change', function(e) {
//                     var element = e.target;

//                     $q.all(slice.call(element.files, 0).map(readFile))
//                         .then(function(values) {
//                             if (!scope.CameraImages) {
//                                 scope.CameraImages = {
//                                     Images: []
//                                 };
//                             }

//                             if (element.multiple) {
//                                 angular.forEach(values, function (v, k) {
//                                     scope.CameraImages.Images.push(
//                                         {
//                                             ImageUrl: v
//                                         }
//                                     );
//                                 });
//                             } else {
//                                 scope.CameraImages.Images.push(
//                                     {
//                                         ImageUrl: values[0]
//                                     }
//                                 );
//                             }

//                             widget.cacheData("CameraImages", scope.CameraImages);
//                         });

//                     function readFile(file) {
//                         console.log(file);
//                         var deferred = $q.defer();

//                         var reader = new FileReader();
//                         reader.onload = function(e) {
//                             deferred.resolve(e.target.result);
//                         };
//                         reader.onerror = function(e) {
//                             deferred.reject(e);
//                         };
//                         reader.readAsDataURL(file);

//                         return deferred.promise;
//                     }

//                 }); //change

//             } //link
//     }; //return
// });