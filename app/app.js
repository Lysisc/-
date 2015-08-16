window.qianXun = angular.module('qianXun', ['ionic', 'DelegateEvents']);

qianXun.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('qianxun', { //父级路由---所有自路由都在qianxun下
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/qianxun'
            // templateUrl: 'source/tp/main.html'
        })
        .state('qianxun.list', { //门店列表页
            url: '/list',
            templateUrl: 'source/tp/list.html',
            controller: 'shopListCtrl'
        })
        .state('qianxun.detail', { //门店列表页
            url: '/detail/:id',
            templateUrl: 'source/tp/detail.html',
            controller: 'shopDetailCtrl'
        });

    // $urlRouterProvider.when(' ', '/qianxun/shop-list.htm');

    $urlRouterProvider.otherwise('/qianxun/list');

});