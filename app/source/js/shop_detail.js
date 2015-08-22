qianXun.controller('shopDetailCtrl', function ($scope, $stateParams, widget) {

    $scope.itemClick = function (e) {
        var $that = angular.element(e.delegationTarget),
            $thatP = $that.find('p');

        if ($thatP.hasClass('ng-hide')) {
            $thatP.removeClass('ng-hide');
        } else {
            $thatP.addClass('ng-hide');
        }

    };

});
