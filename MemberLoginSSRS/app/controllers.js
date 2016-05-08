'use strict';


app.controller('BookingController', ['$scope', 'backendHubProxy','bookingInfoService','toastr',
function ($scope, backendHubProxy, bookingInfoService,toastr) {

        $scope.save_layout = function() {
            var promisePost = bookingInfoService.postLayout(angular.toJson($scope.models.dropzones),false);
            promisePost.then(function (d) {
                toastr.success('Your layout has been saved.', 'Information');
            }, function (err) {
                toastr.error('Your layout has not been saved', 'Error');

            });
        };


        $scope.load_layout = function () {
            var promiseGet = bookingInfoService.getLayout();
            promiseGet.then(function (d) {
                $scope.models.dropzones = angular.fromJson(d.data);
                toastr.success('Your layout has been loaded.', 'Information');
            }, function (err) {
                toastr.error('Your layout has not been loaded', 'Error');
            });
        };

        $scope.load_layout();

        $scope.models = {
            selected: null,
            templates: [
                { type: "hbar", id: 2, img: 'content/img/hbar.jpg', name: 'Horizontal Bar Chart' },
                { type: "vbar", id: 3, img: 'content/img/vbar.jpg', name: '24h Chart' },
                { type: "pie", id: 7, img: 'content/img/pie.jpg', name: 'Pie Chart' },
                { type: "container", id: 1, img: 'content/img/box.jpg', columns: [[], []] }
            ],
            dropzones: {
                "A": [],
                "B": []
            }
        };

        $scope.$watch('models.dropzones', function (model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.pieoptions = {
            chart: {
                type: 'pieChart',
                height: 250,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: function (d) {
                    return d3.format(',.0f')(d);
                },
                showLabels: true,
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.ChartOptions = {
            scales: {
                xAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '24 hours'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'tickets count'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };


        $scope.currentdate = new Date();

        $scope.isToday = function() {
            return $scope.currentdate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2010, 1, 1),
            startingDay: 1
        };

        $scope.popup = {
            opened: false
        };

        $scope.open = function() {
            $scope.popup.opened = true;
        };
        
        function loadData(data) {
            $scope.piedata = [
                {
                    key: "Hello1",
                    y: data.Hello1Total
                },
                {
                    key: "Hello2",
                    y: data.Hello2Total
                },
                {
                    key: "Hello3",
                    y: data.Hello3Total
                },
                {
                    key: "Hello4",
                    y: data.Hello4Total
                }
            ];


            $scope.totaldata = [
                {
                    "key": "Clients",
                    "color": "#1f77b4",
                    "values": [
                        {
                            "label": "Hello1",
                            "value": data.Hello1Total
                        },
                        {
                            "label": "Hello2",
                            "value": data.Hello2Total
                        },
                        {
                            "label": "Hello3",
                            "value": data.Hello3Total
                        },
                        {
                            "label": "Hello4",
                            "value": data.Hello4Total
                        }
                    ]
                }
            ];

            $scope.HelloServerTime = data.CurrentServerTime;


            $scope.HelloLabels = $.map(data.HelloList, function(item) {
                return item.Hour + '';
            });
            $scope.HelloData = [
                $.map(data.HelloList, function(item) {
                    return item.Tickets;
                })
            ];

           
        };


        $scope.onchange = function (date) {
            var promisePost = bookingInfoService.postInfo({ date: date });
            promisePost.then(function(d) {
                loadData(d.data);
            }, function(err) {
                alert("Some Error Occured ");
            });
        };

        $scope.hbarchartoptions = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 250,
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showControls: false,
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.0f')(d);
                },
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Tickets',
                    tickFormat: function (d) {
                        return d3.format(',.0f')(d);
                    }
                }
            }
        };
        $scope.vbarchartoptions = {
            chart: {
                type: 'discreteBarChart',
                height: 250,
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showControls: false,
                showValues: false,
                duration: 500,
                xAxis: {
                    axisLabel: '24 hours',
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.format(',.0f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'tickets counts',
                    tickFormat: function (d) {
                        return d3.format(',.0f')(d);
                    }
                }
            }
        };

        $scope.totaldata = [];
        $scope.HelloServerTime = '';

        $scope.HelloData = [];
        $scope.HelloSeries = ['Hi'];
        $scope.HElloLabels = [];
       

        var bookingDataHub = backendHubProxy(backendHubProxy.defaultServer, 'performanceHub');
        // hub func
        bookingDataHub.on('broadcastBooking', function (data) {
            if ($scope.isToday()) {
                loadData(data);
            } 
        });
    }
]);


