var myApp = angular.module('inicial');

//Service
myApp.factory('homeService', function($window){
	

});


myApp.controller('NavController', ['$scope', 'inicialService', function($scope, inicialService) {}]);

myApp.controller('posts', ['$scope', 'inicialService', function($scope, inicialService) {
		$scope.user;

	    $scope.loadInfo = function() {
	    	console.log("ON THIS CONTROLLER INDEED");
	    	$scope.user = inicialService.getUser();
	    	var name = document.getElementById("uname");
	    	name.innerHTML = $scope.user.firstname;
	    };

}]);