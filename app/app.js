window.qianXun = angular.module('qianXun', ['ionic', 'DelegateEvents']);

qianXun.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('qianxun', { //父级路由---所有自路由都在qianxun下
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/qianxun',
            templateUrl: 'source/tp/main.html'
        })
        .state('qianxun.shop-list', { //门店列表页
            url: '/shop-list.htm',
            templateUrl: 'source/tp/shop_list.html',
            controller: 'shopListCtrl'
        });

    // $urlRouterProvider.when(' ', '/qianxun/shop-list.htm');

    $urlRouterProvider.otherwise('/qianxun/shop-list.htm');

});