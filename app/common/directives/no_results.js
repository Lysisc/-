'use strict';

qianXun
	.directive('noResults', function ($state, $stateParams) {
		return {
			restrict: 'AE',
			templateUrl: 'scripts/qianxun/components/no-results/no-results.html',
			link: function (scope, element, attr) {

				scope.noResultsText = attr.text ? attr.text : '抱歉，查询无结果';

				if (attr.glass) {
					scope.hasGlass = true;
				}
			}
		};
	});