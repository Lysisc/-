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
            url: '/shop-detail/:sid',
            templateUrl: 'source/tp/shop_detail.html',
            controller: 'shopDetailCtrl'
        })
        .state('qianxun.shop-input', { //门店信息填写页
            url: '/shop-input/:sid',
            templateUrl: 'source/tp/shop_input.html',
            controller: 'shopInputCtrl'
        })
        .state('qianxun.job-input', { //职位信息填写页
            url: '/job-input/:sid',
            templateUrl: 'source/tp/job_input.html',
            controller: 'jobInputCtrl'
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
        .state('qianxun.create-resume', { //创建简历页
            url: '/create-resume/:uid',
            templateUrl: 'source/tp/create_resume.html',
            controller: 'createResumeCtrl'
        })
        .state('qianxun.feedback', { //意见反馈页
            url: '/feedback/:type',
            templateUrl: 'source/tp/feedback.html',
            controller: 'feedbackCtrl'
        });

    // $urlRouterProvider.when(' ', '/qianxun/shop-list.htm');

    $urlRouterProvider.otherwise('/qianxun/shop-list');

});
