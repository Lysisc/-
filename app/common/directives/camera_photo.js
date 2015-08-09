// 上传图片
qianXun.directive('appFilereader', function (
    $q,
    widget
) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function () {
                    // alert(2);
                };

                element.bind('change', function (e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function (values) {
                            if (!values || values.length == 0) {
                                return;
                            };

                            if (element.multiple) {

                                angular.forEach(values, function (v, k) {
                                    pushImages(v);
                                });

                            } else {

                                pushImages(values[0]);

                            }

                            widget.cacheData("CameraImages", scope.CameraImages);
                        });

                    function readFile(file) {
                        var deferred = $q.defer(),
                            reader = new FileReader();

                        reader.onload = function (e) {
                            deferred.resolve(e.target.result);
                        };

                        reader.onerror = function (e) {
                            deferred.reject(e);
                        };

                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                    function pushImages(imageData) {
                        var canvas = angular.element(document.querySelector('#tmp'))[0],
                            ctx = canvas.getContext("2d"),
                            image = new Image();

                        image.onload = function () {
                            ctx.drawImage(image, 0, 0);

                            var mpImg = new MegaPixImage(image);

                            mpImg.render(canvas, {
                                maxWidth: 640
                            }, function () {
                                var data = canvas.toDataURL("image/jpeg");

                                ngModel.$setViewValue(data);
                            });
                        };

                        image.src = imageData;
                    }

                }); //change

            } //link
    }; //return
})


.directive('addPhoto', function (
    $state,
    $parse,
    $timeout,
    $compile,
    $ionicViewSwitcher,
    widget,
    ENV
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on("click", function () {

                widget.initUser(scope);

                if (!scope.Deploy.isLogin) {
                    scope.showLogin();

                    return;
                };

                if (ENV.isHybrid) {
                    var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
                        el = document.querySelector('.js_mod_camera');

                    if (el) {
                        el.style.display = "block";
                    } else {
                        // $element.after(toastTpl($scope));
                        angular.element(document.querySelector('.pane')).after(toastTpl(scope));
                    }

                    scope.noScroll = {
                        'overflow-y': 'hidden'
                    };
                } else {
                    //     widget.msgToast('请下载APP吧！');
                    $ionicViewSwitcher.nextDirection("forward");
                    $state.go("forum.photo-title");
                }

            });


            scope.hideCamera = function (e) {
                var $that = angular.element(e.delegationTarget);

                $that.parent().css('display', 'none');

                scope.noScroll = {
                    'overflow-y': 'auto'
                };
            };

        }
    };
})


.directive('ngPhoto', function (
    $parse,
    $timeout
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on('click', function () {
                // alert(1);
                // document.addEventListener("deviceready", onDeviceReady, false);

                // function onDeviceReady() {
                //     alert(2);
                window.navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 100,
                    // destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });
                // }
            });

            function onSuccess(imageData) {
                console.log("获取图片成功！");

                sessionStorage.setItem('imageData', encodeURIComponent(imageData));

                // .toJump({
                //     'url': ['forum/#/photo/edit.htm']
                // });
            }

            function onFail(message) {
                console.log("获取图片失败！");
            }

        }
    };
})


.directive('ngCamera', function (
    $parse,
    $timeout,
    widget
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on('click', function () {

                widget.initUser(scope);

                if (!scope.Deploy.isLogin) {
                    scope.showLogin();

                    return;
                };



                document.addEventListener("deviceready", onDeviceReady, false);

                function onDeviceReady() {
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 50,
                        // destinationType: Camera.DestinationType.DATA_URL,
                        destinationType: Camera.DestinationType.FILE_URI,
                        // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        sourceType: Camera.PictureSourceType.CAMERA
                    });
                }
            });

            function onSuccess(imageData) {
                // alert(imageData);
                // var image = document.getElementById('myImage');
                // image.src = "data:image/jpeg;base64," + imageData;
                // var div = angular.element(document.getElementById('abc'));
                // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
                // $rootScope.imageData = imageData;
                console.log("获取图片成功！");


                sessionStorage.setItem('imageData', encodeURIComponent(imageData));

                // routerRedirect.toJump({
                //     'url': ['forum/#/photo/edit.htm']
                // });
            }

            function onFail(message) {
                console.log("获取图片失败！");
            }

        }
    };
});