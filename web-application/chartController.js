var app = angular.module('myApp', []);
app.controller('formCtrl', function ($scope, $http) {
    $scope.getCustomers = function () {
        $http.get('http://localhost:8081/get').
            success(function (data, status, headers, config) {
                // $scope.sensorData = data;
            }).
            error(function (data, status, headers, config) {
                window.alert("Error...");
            });
    };
});
