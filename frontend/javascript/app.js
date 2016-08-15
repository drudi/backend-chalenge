(function(){
    var app = angular.module('vehicles', []);

    app.controller('VehicleSearchController', ['$http', function($http){
        var results = this;
        results.vehicles = [];
        $http.get('http://127.0.0.1:8000/vehicles').success(function(data){
            results.vehicles = data;
        });

    } ]);


})();
