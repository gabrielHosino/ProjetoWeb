
var myApp = angular.module('inicial', ['ngRoute']);

myApp.config(['$routeProvider',
	   function($routeProvider){
	      $routeProvider.when('/',{
		     templateUrl: '/templates/inicial.html',
			 controller: 'btns'
		  }).when('/home:id=*', {
		  	 templateUrl: '/templates/home.html',
		  	 controller: 'posts'
		  }).when('/profile:id=*', {
		  	 templateUrl: '/templates/profile.html',
		  	 controller: 'profile'
		  }).when('/friends:id=*', {
		  	 templateUrl: '/templates/friends.html',
		  	 controller: 'friends'
		  }).when('/groups:id=*', {
		  	 templateUrl: '/templates/groups.html',
		  	 controller: 'groups'
		  }).when('/about:id=*', {
		  	 templateUrl: '/templates/about.html',
		  	 controller: 'about'
		  }).when('/contact:id=*', {
		  	 templateUrl: '/templates/contact.html',
		  	 controller: 'contact'
		  }).when('/search:id=*:search=*', {
		  	 templateUrl: '/templates/search.hmtl',
		  	 controller: 'search'
		  }).otherwise({
		     redirectTo: '/'

		  })
	   }
	   ]);

myApp.factory('inicialService', function ($http) {
	var user;
	var myPosts = [];

	return {
			'searchByFN': function(search){
				return $http.get('/Inicial/searchByFN', {params: {search: search}});
			},
			'searchByLN': function(search){
				return $http.get('/Inicial/searchByLN', {params: {search: search}});
			},
			'searchByNick': function(search){
				return $http.get('/Inicial/searchByNick', {params: {search: search}});
			},
			'setUser': function(newuser){
				user = newuser;
			},
			'getUser': function(){
				return user;
			},
			'saveMyPost': function(data){
				myPosts = data;
			},
			'readMyPost' : function(){
				return myPosts;
			},
			'save': function(newClient){
			    return $http.post('/Inicial/save',newClient);
			},
			'login': function(loginvar){
				return $http.get('/Inicial/login', {params: {email: loginvar.email, senha: loginvar.senha}});
			},
			'user': function(userid){
				return $http.get('/Inicial/user', {params: {id: userid}});
			},
			'updateBio': function(userbio){
				return $http.post('/Inicial/updateBio', {id: userbio.id, newbio: userbio.newbio});
			},
			'updateFirstname': function(userfn){
				return $http.post('/Inicial/updateFirstname', {id: userfn.id, newfn: userfn.newfn});
			},
			'updateLastname': function(userln){
				return $http.post('/Inicial/updateLastname', {id: userln.id, newln: userln.newln});
			},
			'updateBirth': function(userbirth){
				return $http.post('/Inicial/updateBirth', {id: userbirth.id, newbirth: userbirth.newbirth});
			},
			'createGroup': function(newgroup){
				return $http.post('Inicial/createGroup', newgroup);
			},
			'getGroup': function(group){
				return $http.get('/Inicial/getGroup', {params: {id: group.id, nome: group.nome}});
			},
			'getGroups': function(group){
				return $http.get('/Inicial/getGroups', {params: {id: group.id}});
			},
			'newPost': function(newPost){
			    return $http.post('/Inicial/newpost',newPost);
			},
			'getYourPosts': function(userid){
				return $http.get('/Inicial/yourposts', {params: {id: userid}}); 
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
						console.log(response.data[0]);
						inicialService.setUser(response.data[0]);
						location.href  = 'http://localhost:1337/home:id=' + response.data[0].id;
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

}]);




