
var myApp = angular.module('inicial', ['ngRoute']);

myApp.config(['$routeProvider',
	   function($routeProvider){
	      $routeProvider.when('/',{
		     templateUrl: '/templates/inicial.html',
			 controller: 'btns'
		  }).otherwise({
		     redirectTo: '/'
		  })
	   }
	   ]);

myApp.controller('btns', ['$scope', function($scope) {
    $scope.email;

    $scope.login = function() {
        $scope.email = document.getElementById("email1").value;
        document.getElementById('change').innerHTML = $scope.email;

    };
}]);
