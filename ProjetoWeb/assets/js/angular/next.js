(function(angular) {
  'use strict';
var myApp = angular.module('nextbt', []);

//Service
myApp.factory('sharedParameter', function($window){
	var param;
	var KEY;

	var addData = function(newObj){
		var myData = $window.sessionStorage.getItem(KEY);

		if(myData){	myData = JSON.parse(myData);	}
		else{	myData = [];	}

		myData.push(newObj);
		$window.sessionStorage.setItem(KEY, JSON.stringify(myData));
	};

	var getData = function(){
		var myData = $window.sessionStorage.getItem(KEY);

		if(myData){	myData = JSON.parse(myData);	}

		return myData;

	};

	return{
		getKey: function(){
			return KEY;
		},

		setKey: function(key){
			KEY = key;
		},

		getParam: function(){
			return param;
		},
		setParam: function(value){
			param = value;
			sharedParameter.addData();
		},
		addData: addData,
		getData: getData
	};

});


myApp.controller('submit', ['$scope', 'sharedParameter', function($scope, sharedParameter) {
	var param;

	$scope.writeParameters = function(){
		param = document.getElementById('DATA').value;
		sharedParameter.setKey(param);
		sharedParameter.addData(param);
	};
}]);

//Tem dois botões na pagina, Load Posts e Next Post. Clicar no Load primeiro e depois no Next para conseguir ver o Service funcionando.
myApp.controller('tabs', ['$scope', 'sharedParameter', function($scope, sharedParameter) {
	var param = 'Posts da Leticia';

	$scope.writeParameter = function(){
		console.log(param);
		sharedParameter.setKey(param);
		sharedParameter.addData(param);
	};
}]);

myApp.controller('posts', ['$scope', 'inicialServi', function($scope, sharedParameter) {
	$scope.readParameter = function(){
		return sharedParameter.getData();
	};

	$scope.actpost;
    $scope.posts = ['Primeira mensagem: dia de trabalho.', 'Segunda mensagem: Dia de Folga.Tranquilo.Favoravel'];
    $scope.i = -1;

    $scope.nextpost = function() {
    	if ($scope.i == -1) {
    		$scope.actpost = $scope.readParameter();
    		$scope.i = ($scope.i) + 1;
    	}else{
        	$scope.actpost = $scope.posts[$scope.i];
        	$scope.i = ($scope.i) + 1;
        }
    };
}]);
})(window.angular);
