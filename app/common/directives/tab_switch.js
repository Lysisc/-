// tab切换
qianXun.directive('tabSwitch', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var $tab = element.find('a'),
                $tabCont = element.find('div'),
                $backDrop = element.next('div');

            angular.forEach($tab, function (v, k) {
                angular.element(v).attr('data-index', k);
            });

            $tab.bind('click', function (e) {

                var $this = angular.element(e.currentTarget),
                    index = $this.attr('data-index'),
                    $thisCont = $tabCont.eq(index);

                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                    $tabCont.addClass('ng-hide');
                    $backDrop.removeClass('active');
                } else {
                    $tab.removeClass('active');
                    $tabCont.addClass('ng-hide');

                    $this.addClass('active');
                    $thisCont.removeClass('ng-hide');
                    $backDrop.addClass('active');
                }

            });

            $backDrop.bind('click', function (e) {

                if (angular.element(e.target).hasClass('tab_back_drop')) {
                    $tab.removeClass('active');
                    $tabCont.addClass('ng-hide');
                    $backDrop.removeClass('active');
                }

            });

        }
    };
});
