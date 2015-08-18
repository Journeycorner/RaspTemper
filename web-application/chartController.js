var app = angular.module('myApp', []);
app.controller('formCtrl', function ($scope, $http, $filter) {
    $scope.getCustomers = function () {
        $http.get('http://localhost:8081/get').
            success(function (data, status, headers, config) {
                $scope.coordinates = {};

                var data2 = {
                    labels: [], //["January", "February", "March", "April", "May", "June", "July"];
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [] //[28, 48, 40, 19, 86, 27, 90];
                        }
                    ]
                };

                for (var i in data) {
                    var date = $filter('date')(data[i].timestamp,'HH mm');
                    data2.labels.push(date);
                    data2.datasets[0].data.push(data[i].temperature);
                }

                var options = {

                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines : true,

                    //String - Colour of the grid lines
                    scaleGridLineColor : "rgba(0,0,0,.05)",

                    //Number - Width of the grid lines
                    scaleGridLineWidth : 1,

                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,

                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines: true,

                    //Boolean - Whether the line is curved between points
                    bezierCurve : true,

                    //Number - Tension of the bezier curve between points
                    bezierCurveTension : 0.4,

                    //Boolean - Whether to show a dot for each point
                    pointDot : true,

                    //Number - Radius of each point dot in pixels
                    pointDotRadius : 4,

                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth : 1,

                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius : 20,

                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke : true,

                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth : 2,

                    //Boolean - Whether to fill the dataset with a colour
                    datasetFill : true,

                    //String - A legend template
                    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

                };



                // Get the context of the canvas element we want to select
                var ctx = document.getElementById("myChart").getContext("2d");
                var myLineChart = new Chart(ctx).Line(data2, options);
            }).
            error(function (data, status, headers, config) {
                window.alert("Error...");
            });
    };
});
