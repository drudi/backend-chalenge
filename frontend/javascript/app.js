(function(){
    var app = angular.module('vehicles', []);

    app.controller('VehicleSearchController', ['$http', function($http){
        var results = this;
        results.vehicles = [];
        //var searchFunction = function(params){
            $http.get('http://127.0.0.1:8000/vehicles').success(function(data){
                results.vehicles = data;
            });
        //}

    } ]);

    app.controller('VehiclesAddController', ['$http', function($http){
        var addv = this;
        addv.vehicle = {};

        this.addVehicle = function(){
            //alert(addv.vehicle.model);
            $http.post('http://127.0.0.1:8000/vehicles', addv.vehicle)
                .success(function(data){
                    addv.vehicle = data;
                })
                .error(function(data){
                    alert(JSON.stringify(data));
                });
        };

    } ]);


})();
