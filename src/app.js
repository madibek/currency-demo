(function (angular) {
    'use strict';
    angular.module('currencyDemo', [])
    .controller('MainController', ['$scope', '$http',
        function($scope, $http) {

            $scope.isLoading = false;
            $scope.data = {
                numberVal: 1,
                fromCode: "USD",
                toCode: "KZT",
                date: new Date(),
                result: ""
            };

            $scope.submitForm = function() {
                console.log("posting data....");
                $scope.data.result = "success!!!";
                console.log($scope.data);
            };

        }]);
}(angular));