var myApp = angular.module('inicial');

//Service
myApp.controller('groups', ['$scope', 'inicialService', function($scope, inicialService) {

	addtoBd = function(){
		var newgroup = document.getElementsByTagName("divng")[0];
		var namegroup = document.getElementById("groupname")
		var confirm = document.getElementById("confirm");

		if(namegroup.value != ""){
			console.log(id + " " + namegroup.value);
			inicialService.createGroup({id: id, nome: namegroup.value});
		}

		newgroup.removeChild(namegroup);
		newgroup.removeChild(confirm);
	}

	createGroup = function(){
		var newgroup = document.getElementsByTagName("divng")[0];
		var namegroup = document.createElement("INPUT");
		var confirm = document.createElement("BUTTON");

		namegroup.id = "groupname";
		confirm.id = "confirm";
		confirm.appendChild(document.createTextNode("create"));
		confirm.addEventListener("click", addtoBd);

		newgroup.appendChild(namegroup);
		newgroup.appendChild(confirm);
	}

	var id;
	var groups;
	var splitHref = location.href.split('=');
	id = splitHref[1];
	var user;
	inicialService.user(id).then(
		function(response){
			inicialService.setUser(response.data[0]);
			user = inicialService.getUser();
			document.getElementsByTagName("uname")[0].innerHTML = user.firstname + " " + user.lastname;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	inicialService.getGroups({id: id}).then(
		function(response){
			console.log(response.data);
			groups = response.data;
			
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	document.getElementById("home").href = document.getElementById("home").href + ":id=" + id;
	document.getElementById("profile").href = document.getElementById("profile").href + ":id=" + id;
	document.getElementById("friends").href = document.getElementById("friends").href + ":id=" + id;
	document.getElementById("groups").href = document.getElementById("groups").href + ":id=" + id;
	document.getElementById("about").href = document.getElementById("about").href + ":id=" + id;
	document.getElementById("contact").href = document.getElementById("contact").href + ":id=" + id;
}]);