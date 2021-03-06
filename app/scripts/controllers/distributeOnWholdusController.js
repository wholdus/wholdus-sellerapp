(function() {
    sellerapp.controller('DistributeOnWholdusController', [
        '$scope',
        '$log',
        'ToastService',
        'APIService',
        '$location',
        'FormValidationService',
        
        function($scope, $log, ToastService, APIService, $location, FormValidationService) {

           

           
                $scope.formValidation=FormValidationService;
           
                $scope.register = function() {

                if($scope.email && $scope.mobile_number && $scope.name) {
                    var mobStr=$scope.mobile_number.toString();
                    var mobNum=Number(mobStr.substr(mobStr.length-10,10));             
                    var url = "/register?email="+$scope.email+"&mobile_number="+
                    mobNum+"&company_name="+$scope.name;
                    
                    var data = {
                        email: $scope.email,
                        mobile_number: $scope.mobile_number,
                        company_name: $scope.name
                    };
                    APIService.apiCall("POST", APIService.getAPIUrl('sellerlead'), data)
                    .then(function(response) {
                    }, function(error) {
                    });
                     $location.url(url);
                } else {
                    ToastService.showSimpleToast("Please fill required details", 2000);
                }
            };
                // 
        }
    ]);
})();
