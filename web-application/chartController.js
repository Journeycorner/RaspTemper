var app = angular.module('myApp', []);
app.controller('formCtrl', function ($scope, $http, $filter) {
    $scope.getData = function () {
        $http.get('http://www.medhelfer.de/get').
            success(function (data, status, headers, config) {
                var chartData = {
                    labels: [],
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: []
                        }
                    ]
                };

                for (var i in data) {
                    var date = $filter('date')(data[i].timestamp, 'HH:mm', '+0200');
                    chartData.labels.push(date);
                    chartData.datasets[0].data.push(data[i].temperature);
                }

                $scope.chartData = chartData;
            }).
            error(function (data, status, headers, config) {
                window.alert("Error...");
            });
    };
});
