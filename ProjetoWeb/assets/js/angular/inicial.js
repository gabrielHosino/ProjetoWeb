
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

myApp.factory('inicialService', function ($http) {
		
		return {
				'save': function(newClient){
				    return $http.post('/Inicial/save',newClient);
				},
				'login': function(loginvar){
        			console.log(loginvar);
					return $http.get('/Inicial/login', {params: {email: loginvar.email, senha: loginvar.senha}});
				}
		}
	});

myApp.controller('btns', ['$scope', 'inicialService', function($scope, inicialService) {
    $scope.newClient;
    $scope.nome;
    $scope.sobrenome;
    $scope.apelido;
    $scope.email;
    $scope.senha;
    $scope.loginvar;

    $scope.login = function() {
        $scope.email = document.getElementById("email1").value;
        $scope.senha = document.getElementById("senha1").value;

        loginvar = {email: $scope.email, senha: $scope.senha};
        console.log("email:")
        console.log($scope.email);
        inicialService.login(loginvar).then(
				//success
				function(response){
					console.log('Encontrei.');
					console.log(response.data);
				},
				//Error
				function(response){
					console.log('Erro: Email ou senha errados.');
				});	

    };

    $scope.signin = function() {
        $scope.nome = document.getElementById("nome").value;
        $scope.sobrenome = document.getElementById("sobrenome").value;
        $scope.apelido = document.getElementById("apelido").value;
        $scope.email = document.getElementById("email2").value;
        $scope.senha = document.getElementById("senha2").value;
        newClient = {firstname: $scope.nome , lastname: $scope.sobrenome, 
        			nickname: $scope.apelido, email: $scope.email, password: $scope.senha};
        inicialService.save(newClient).then(
				//success
				function(response){
					console.log('Ok ao Salvar a Lista.');
				},
				//Error
				function(response){
					console.log('Erro ao Salvar a Lista.');
				});			
    };


}]);
