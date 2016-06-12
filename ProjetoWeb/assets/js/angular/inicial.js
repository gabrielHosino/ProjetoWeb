
var myApp = angular.module('inicial', ['ngRoute']);

myApp.config(['$routeProvider',
	   function($routeProvider){
	      $routeProvider.when('/',{
		     templateUrl: '/templates/inicial.html',
			 controller: 'btns'
		  }).when('/home', {

		  }).otherwise({
		     redirectTo: '/'

		  })
	   }
	   ]);

myApp.factory('inicialService', function ($http) {
	var user;


	return {
			'setUser': function(newuser){
				user = newuser;
			},
			'getUser': function(){
				return user;
			},
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
    $scope.born;
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
					if(response.data == ''){
						console.log('ERRO: Email ou senha errados.');
						document.getElementById("senha1").value = '';
						document.getElementById("email1").value = '';
						document.getElementById("error").innerHTML = "E-mail ou senha errados.Tente novamente.";
					}
					else{
						inicialService.setUser(response.data[0]);
						location.href  = 'http://localhost:1337/home';
					}
				},
				//Error
				function(response){
					console.log('Erro: Problema no acesso ao banco de dados.');
				});	

    };

    $scope.signin = function() {
        $scope.nome = document.getElementById("nome").value;
        $scope.sobrenome = document.getElementById("sobrenome").value;
        $scope.apelido = document.getElementById("apelido").value;
        $scope.email = document.getElementById("email2").value;
        $scope.senha = document.getElementById("senha2").value;
        $scope.born = document.getElementById("date").value;
        newClient = {firstname: $scope.nome , lastname: $scope.sobrenome, 
        			nickname: $scope.apelido, email: $scope.email, password: $scope.senha, birth: $scope.born};
        console.log(newClient);
        if($scope.nome == '' || $scope.sobrenome == '' || $scope.apelido == '' || 
           $scope.email == '' || $scope.senha == ''){
        	document.getElementById("error").innerHTML = "Erro ao cadastrar novo cliente. Não deixe nenhum espaço em branco!";
        }else{
        	inicialService.save(newClient).then(
				//success
				function(response){
					console.log('Cliente Cadastrado.');
					//colocar cliente cadastrado na proxima pagina
				},
				//Error
				function(response){
					console.log('ERRO: Cliente não pode ser cadastrado.');
				});
        }			
        

		document.getElementById("nome").value = '';
		document.getElementById("sobrenome").value = '';
		document.getElementById("apelido").value = '';
		document.getElementById("email2").value = '';
		document.getElementById("senha2").value = '';
		document.getElementById("date").value = '';					
    };

    myApp.controller('NavController', ['$scope', 'inicialService', function($scope, inicialService) {}]);

	myApp.controller('posts', ['$scope', 'inicialService', function($scope, inicialService) {
		$scope.user;

	    $scope.loadInfo = function() {
	    	console.log("ON THIS CONTROLLER INDEED");
	    	$scope.user = inicialService.getUser();
	    	var name = document.getElementById("uname");
	    	name.innerHTML = $scope.user.firstname;
	    }

	}]);
}]);
