qianXun.controller('shopListCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, $ionicScrollDelegate, widget) {

    // $scope.Deploy = {
    //     cateId: $stateParams.id,
    //     currentTab: 1,
    //     pageIndex: 0,
    //     pageSize: 5,
    //     isLoading: false,
    //     isMore: true,
    //     cateClass: "forum_cate_two_list"
    // };

    // $scope.DataList = {
    //     ArticleList: []
    // };

    // $scope.$watch('Deploy.currentTab', function () {
    //     if ($scope.Deploy.currentTab == 1) {
    //         $scope.setFalls();
    //     }
    // });

    // $scope.loadCate = function (type) {
    //     widget.ajaxRequest({
    //         scope: $scope,
    //         url: 'getListCategory',
    //         data: {
    //             CateId: $scope.Deploy.cateId
    //         },
    //         success: function (data) {
    //             if (type && type == "refresh") {
    //                 $scope.DataList.CurrentCate = "";
    //                 $scope.DataList.CategoryList = "";
    //             }

    //             if (data.CategoryList.length % 3 == 0) {
    //                 $scope.Deploy.cateClass = "forum_cate_three_list";
    //             }

    //             $scope.DataList.CurrentCate = data.CurrentCate;
    //             $scope.DataList.CategoryList = data.CategoryList;

    //             // $ionicNavBarDelegate.title($scope.DataList.CurrentCate.CateName);
    //             $scope.Page.Title = data.CurrentCate.CateName;
    //         }
    //     });
    // };

    // $scope.loadMore = function (type) {
    //     widget.ajaxRequest({
    //         scope: $scope,
    //         showPage: true,
    //         url: 'getListArticle',
    //         data: {
    //             CateId: $scope.Deploy.cateId
    //         },
    //         success: function (data) {
    //             if (data.ArticleList && data.ArticleList.length > 0) {

    //                 if (type && type == "refresh") {
    //                     $scope.DataList.ArticleList = [];
    //                 }
    //                 $scope.Deploy.pageTotal = data.Total || 0;
    //                 $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);
    //                 $scope.setFalls();
    //                 $scope.Deploy.isLoading = false;
    //                 $scope.$broadcast('scroll.infiniteScrollComplete');

    //             } else {

    //                 $scope.Deploy.isLoading = true;
    //                 $scope.Deploy.isMore = false;

    //             }
    //         }
    //     });
    // };

    // $scope.refreshView = function (id) {
    //     angular.extend($scope.Deploy, {
    //         cateId: id,
    //         currentTab: 1,
    //         pageIndex: 0,
    //         isLoading: false,
    //         isMore: true,
    //         pageTotal: 0
    //     });

    //     // $scope.DataList = {
    //     //     ArticleList: []
    //     // };

    //     $scope.loadCate("refresh");
    //     $scope.loadMore("refresh");
    // };

    // $scope.loadCate();
    // $scope.loadMore();

    // $scope.headerScroll = function () {
    //     widget.changeOpacity();
    // };

});
