// tab切换
qianXun.directive('tabSwitch', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // console.log($location.$$search);

            var $tab = element.find('a'),
                $tabCont = element.find('div'),
                $tabContSpan = element.find('span'),
                $backDrop = element.next('div');

            angular.forEach($tab, function (v, k) {
                $tab.eq(k).attr('data-index', k);
                $tabCont.eq(k).attr('data-index', k);
            });

            $tab.bind('click', function (e) {

                var $this = angular.element(e.target),
                    $thisCont = $tabCont.eq($this.attr('data-index'));

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

            $tabContSpan.bind('click', function (e) {

                var $this = angular.element(e.target),
                    $thisCont = $this.parent(),
                    $thisTab = $tab.eq($thisCont.attr('data-index'));

                $thisCont.addClass('ng-hide').find('span').removeClass('active');
                $thisTab.removeClass('active').html($this.text());
                $backDrop.removeClass('active');
                $this.addClass('active');

                var fn = scope.$eval(attrs.tabSwitch);
                if (angular.isFunction(fn)) {
                    fn($this.text());
                }

            });

        }
    };
});
