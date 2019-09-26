(function (angular) {
    'use strict';
    // http://currencies.apps.grandtrunk.net/getrate/2013-11-15/usd/kzt
    var path = "http://currencies.apps.grandtrunk.net/getrate/"
    angular.module('currencyDemo', [])
    .controller('MainController', ['$scope', '$http',
        function($scope, $http) {

            $scope.currencies = [
                {
                    name: "Теңге",
                    code: "KZT"
                },
                {
                    name: "Доллар",
                    code: "USD"
                },
                {
                    name: "Рубль",
                    code: "RUB"
                }
            ];
            $scope.fromCode = $scope.currencies[1];
            $scope.toCode = $scope.currencies[0];
            $scope.currencyHistory = [];
            $scope.isLoading = false;
            $scope.data = {
                amount: 1,
                fromCode: $scope.fromCode.code,
                toCode: $scope.toCode.code,
                date: new Date()
            };

            $scope.update = function() {
                $scope.data.fromCode = $scope.fromCode.code;
                $scope.data.toCode = $scope.toCode.code;
            };

            $scope.submitForm = function() {
                var url = path +
                    formatDate($scope.data.date) +
                    "/" + $scope.data.fromCode +
                    "/" + $scope.data.toCode;
                $http.get(url)
                    .then(function(response) {
                        $scope.data.result = response.data * $scope.data.amount;
                        var historyData = Object.assign({}, $scope.data);
                        $scope.currencyHistory.push(historyData);
                    });
            };

        }]);
}(angular));

function formatDate(dateObj) {
    if (dateObj == undefined) {
        return "";
    }
    var date = new Date(dateObj);
    var dateStr = date.toISOString(); // format "2019-09-26T14:39:01.233Z"
    return dateStr.substr(0, 10);
}