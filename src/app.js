(function (angular) {
    'use strict';
    // http://currencies.apps.grandtrunk.net/getrate/2013-11-15/usd/kzt
    var path = "http://currencies.apps.grandtrunk.net/getrate/"
    angular.module('currencyDemo', [])
    .controller('MainController', ['$scope', '$http',
        function($scope, $http) {
            $scope.currencyHistory = [];
            $scope.isLoading = false;
            $scope.data = {
                amount: 1,
                fromCode: "USD",
                toCode: "KZT",
                date: new Date(),
                result: ""
            };

            $scope.submitForm = function() {
                console.log("posting data....");
                console.log($scope.data);
                var url = path +
                    formatDate($scope.data.date) +
                    "/" + $scope.data.fromCode +
                    "/" + $scope.data.toCode;
                $http.get(url)
                    .then(function(response) {
                        $scope.data.result = response.data;
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