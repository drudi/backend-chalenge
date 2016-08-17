(function(){
    var app = angular.module('vehicles', []);

    app.controller('VehicleSearchController', ['$http', function($http){
        var ctrl = this;
        ctrl.vehicles = [];
        ctrl.params = {};

        this.buildQuery = function(params) {
            var query = {};
            for (var key in params) {
                if (params.hasOwnProperty(key) && params[key] != '') {
                    if (key === 'vehicle_type') {
                        query.vehicle_type = params[key];
                    }else if (key === 'manufacturer') {
                        query.manufacturer = params[key];
                    } else if (key === 'model') {
                        query.model = params[key];
                    } else if (key === 'color') {
                        query.color = params[key];
                    } else if (key === 'kms') {
                        if (params.hasOwnProperty('km_oper')) {
                            var oper = params['km_oper'];
                            if (oper === '=') {
                                query.kmslte = query.kmsgte = params[key];
                            } else if (oper === '>=') {
                                query.kmsgte = params[key];
                            } else if (oper === '<=') {
                                query.kmslte = params[key];
                            }
                        }
                    } else if (key === 'engine') {
                        if (params.hasOwnProperty('engine_oper')) {
                            var oper = params['engine_oper'];
                            if (oper === '=') {
                                query.enginelte = query.enginegte = params[key];
                            } else if (oper === '>=') {
                                query.enginegte = params[key];
                            } else if (oper === '<=') {
                                query.enginelet = params[key];
                            }
                        }
                    }
                }
            }
            return query;
        };

        this.returnAll = function() {
            $http.get('http://127.0.0.1:8000/vehicles').success(function(data){
                ctrl.vehicles = data;
            });
        };

        this.formSubmit = function() {
            var query = this.buildQuery(ctrl.params);
            $http.get('http://127.0.0.1:8000/vehicles/search', {params: query}).success(function(data){
                ctrl.vehicles = data;
            });
        };

        this.returnAll();
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

    app.controller('EditFormController', ['$http', function($http){
        //var form = this;
        //form.data = {};

        var teste = "Olá, olha eu aqui!";
        var submitForm = function(formData){
            alert(JSON.stringify({
                id: formData.id,
                dado: formData.kmd
            }));
        };



    } ]);

    app.directive('kmsEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'kms-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {kms: form.kms})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });

                };
            }],
            controllerAs: 'editKmsCtrl',
        };
    });

    app.directive('montadoraEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'montadora-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {manufacturer: form.manufacturer})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'editMontadoraCtrl',
        };
    });

    app.directive('engineEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'engine-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {engine: form.engine})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'editEngineCtrl',
        };
    });

    app.directive('colorEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'cor-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {color: form.color})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'editColorCtrl',
        };
    });

    app.directive('typeEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'tipo-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {vehicle_type: form.vehicle_type})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'editTypeCtrl',
        };
    });

    app.directive('modeloEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'modelo-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/vehicles/'+form.id,
                            {model: form.model})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'editModelCtrl',
        };
    });

    app.directive('vehicleDelete', function() {
        return {
            restrict: 'E',
            templateUrl: 'vehicle-delete.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.vehicle = scrope.$eval(attrs.vehicle);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.delete('http://127.0.0.1:8000/vehicles/'+form.id)
                        .success(function(data){
                            $('#veiculo_'+form.id).hide();
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });

                };
            }],
            controllerAs: 'vehicleDeleteCtrl',
        };
    });

    app.directive('manufacturerForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/manufacturer/manufacturer-form.html',
            controller: ['$http', function($http){
                var ctrl = this;
                ctrl.manufacturer = {};
                ctrl.all = [];
                this.submitForm = function() {

                    $http.post('http://127.0.0.1:8000/manufacturers', ctrl.manufacturer)
                        .success(function(data){
                            ctrl.all.push(data);
                            ctrl.manufacturer = {};
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });

                };

                this.listAll = function() {
                    $http.get('http://127.0.0.1:8000/manufacturers')
                        .success(function(data){
                            ctrl.all = data;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                };

                this.listAll();
            }],
            controllerAs: 'manufacturerCtrl',
        };
    });

    app.directive('manufacturerEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/manufacturer/manufacturer-edit.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.manuf = scrope.$eval(attrs.manuf);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.patch('http://127.0.0.1:8000/manufacturers/'+form.id,
                            {manufacturer_name: form.manufacturer_name})
                        .success(function(data){
                            ctrl.editing = false;
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });
                    this.editing = false;

                };
            }],
            controllerAs: 'manufEditCtrl',
        };
    });

    app.directive('manufacturerDelete', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/manufacturer/delete.html',
            link: function (scope, element, attrs) {
               if(attrs.vehicle){
                    scope.manuf = scrope.$eval(attrs.manuf);
                }
            },
            controller: ['$http', function($http){
                var ctrl = this;
                this.submitForm = function(form) {
                    $http.delete('http://127.0.0.1:8000/manufacturers/'+form.id)
                        .success(function(data){
                            $('#manufacturer_'+form.id).hide();
                        })
                        .error(function(data){
                            alert(JSON.stringify(data));
                        });

                };
            }],
            controllerAs: 'manufDeleteCtrl',
        };
    });


})();
