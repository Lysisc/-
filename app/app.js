window.qianXun = angular.module('qianXun', ['ionic', 'DelegateEvents']);

qianXun.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('qianxun', { //父级路由---所有自路由都在qianxun下
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/qianxun'
                // templateUrl: 'source/tp/main.html'
        })
        .state('qianxun.shop-list', { //门店列表页
            url: '/shop-list',
            templateUrl: 'source/tp/shop_list.html',
            controller: 'shopListCtrl'
        })
        .state('qianxun.shop-detail', { //门店列表页
            url: '/shop-detail/:id',
            templateUrl: 'source/tp/shop_detail.html',
            controller: 'shopDetailCtrl'
        })
        .state('qianxun.worker-list', { //求职者列表页
            url: '/worker-list',
            templateUrl: 'source/tp/worker_list.html',
            controller: 'workerListCtrl'
        })
        .state('qianxun.worker-detail', { //求职者详情页
            url: '/worker-detail',
            templateUrl: 'source/tp/worker_detail.html',
            controller: 'workerDetailCtrl'
        })
        .state('qianxun.feedback', { //意见反馈页
            url: '/feedback/:type',
            templateUrl: 'source/tp/feedback.html',
            controller: 'feedbackCtrl'
        });

    // $urlRouterProvider.when(' ', '/qianxun/shop-list.htm');

    $urlRouterProvider.otherwise('/qianxun/shop-list');

});
