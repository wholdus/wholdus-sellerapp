(function() {
    "use strict";
    sellerapp.directive('psaHeader', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/directives/psaHeader.html',
            link: function(scope, element, attributes) {
            },
            controller: [
                '$scope',
                '$log',
                '$rootScope',
                'LoginService',
                '$location',
                '$mdDialog',
                '$mdMedia',
                function($scope, $log, $rootScope, LoginService, $location, $mdDialog, $mdMedia) {
                    var listeners = [];

                    $scope.loggedIn = false;

                    function loginState() {
                        if(LoginService.checkLoggedIn()) {
                            $scope.loggedIn = true;
                            if($location.url().indexOf('sell') >= 0) {
                                $location.url('/my-profile');
                            }
                        } else {
                            $scope.loggedIn = false;
                            $location.url('/sell');
                        }
                    }
                    loginState();

                    $scope.logout = function() {
                        LoginService.logout();
                        $scope.loggedIn = false;
                        $location.url('/sell');
                    };

                    $scope.showLoginPrompt = function(event) {
                        var useFullScreen = $mdMedia('xs');
                        $mdDialog.show({
                            controller: 'LoginPopupController',
                            templateUrl: 'views/partials/login.html',
                            parent: angular.element(document.body),
                            targetEvent: event,
                            clickOutsideToClose:true,
                            fullscreen: useFullScreen
                        })
                        .then(function(status) {
                            //hide callback
                            if(status) {
                                $scope.loggedIn = true;
                                $location.url('/my-profile');
                            }
                        }, function() {
                            // cancel callback
                            loginState();
                        });
                    };

                    $scope.toggleSidenav = function() {
                        $rootScope.$broadcast('toggleSidenav');
                    };

                    var hideHamListener = $rootScope.$on('hideHam', function(event, data) {
                        $scope.hideHam = true;
                    });
                    listeners.push(hideHamListener);

                    var locationChangeListener = $rootScope.$on('$locationChangeSuccess', function(event, data) {
                        loginState();
                    });
                    listeners.push(locationChangeListener);
                    
                    $scope.$on('$destroy', function() {
                        angular.forEach(listeners, function(value, key) {
                            if(value) value();
                        });
                    });
                }
            ]
        };
    });
})();
