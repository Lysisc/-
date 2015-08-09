qianXun

/** 
 *  引用方法：
 *	<ANY location-popup></ANY>
 */
.directive('locationPopup', function (
	$ionicPopup,
	$http,
	widget,
	cachePool
) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			// var location = cachePool.pull('LocationData');

			// if (location) {
			// 	scope.CityList = location;
			// } else {
			// 	// widget.ajaxRequest({
			// 	// 	url: 'getCityList',
			// 	// 	success: function (data) {
			// 	// 		scope.cityList = data.CityList;
			// 	// 	}
			// 	// });
			// }

			// //todo...
			// scope.cityList = [{
			// 	Id: 1,
			// 	Name: '上海'
			// }, {
			// 	Id: 2,
			// 	Name: '北京'
			// }, {
			// 	Id: 3,
			// 	Name: '广州'
			// }, {
			// 	Id: 4,
			// 	Name: '厦门'
			// }];

			// scope.villageList = [{
			// 	Id: 11,
			// 	Name: '长宁区'
			// }, {
			// 	Id: 12,
			// 	Name: '徐汇徐'
			// }, {
			// 	Id: 23,
			// 	Name: '朝阳区'
			// }, {
			// 	Id: 14,
			// 	Name: '闸北区'
			// }];

			// //记录所选地区
			// scope.inputVal.city = scope.inputVal.city || scope.CityList[0];
			// scope.inputVal.village = scope.inputVal.village || scope.villageList[0];

			// //临时所选地区
			// scope.tmpCity = scope.inputVal.city;
			// scope.tmpVillage = scope.inputVal.village;

			// function getVillageData() { //取地区数据
			// 	scope.tmpVillage = scope.villageList[0];
			// }


			//---------------------还没写完，带完善 ToDo
			scope.tmpCity = 0;
			scope.tmpSubCity = 0;

			scope.chooseLocation = function (e) { //所在地选择
				var $that = angular.element(e.delegationTarget),
					mid = $that.attr('data-mid'),
					sid = $that.attr('data-sid');

				$that.parent('ul').find('li').removeClass('current');

				$that.addClass('current');

				if (mid) {
					scope.CitySubList = scope.CityList[mid].sub;
					scope.tmpCity = mid;
				}

				if (sid) {
					scope.tmpSubCity = sid;
				}

			};

			element.bind('click', function () { //呼出弹出层

				// widget.ajaxRequest({
				// 	url: 'CityList',
				// 	data: {},
				// 	success: function (data) {

				// 		scope.CityList = data;
				// 		scope.CitySubList = scope.CityList[0].sub;

				// 		$ionicPopup.confirm({
				// 			title: '选择位置',
				// 			cancelText: '取消',
				// 			cancelType: 'cancel',
				// 			okText: '确定',
				// 			okType: 'confirm',
				// 			scope: scope,
				// 			templateUrl: '../common/directives/location_popup.html'
				// 		}).then(function (res) {
				// 			if (res) { //确认所在地位置
				// 				scope.cInput.City = scope.tmpCity;
				// 				scope.cInput.CityName = scope.CityList[scope.tmpCity].name +" "+ scope.CitySubList[scope.tmpSubCity].name;
				// 			}
				// 		});
				// 	}
				// });

				$http({
					method: 'GET',
					url: 'api/CityList.json',
					timeout: 15000
				})
				.success(function (data) {
					scope.CityList = data;
					scope.CitySubList = scope.CityList[0].sub;

					$ionicPopup.confirm({
						title: '选择位置',
						cancelText: '取消',
						cancelType: 'cancel',
						okText: '确定',
						okType: 'confirm',
						scope: scope,
						templateUrl: 'common/directives/location_popup.html'
					}).then(function (res) {
						if (res) { //确认所在地位置
							scope.cInput.City = scope.tmpCity;
							scope.cInput.CityName = scope.CityList[scope.tmpCity].name +" "+ scope.CitySubList[scope.tmpSubCity].name;
							
							if (!scope.Page) {
								scope.Page = {};
							}
							scope.Page.isModify = true;
						}
					});
				})
				.error(function (data) {
					widget.msgToast('请检查你的网络！');
				});
			});

		}
	};
});