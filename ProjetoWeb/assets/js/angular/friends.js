var myApp = angular.module('inicial');

//Service
myApp.controller('friends', ['$scope', 'inicialService', function($scope, inicialService) {
	Search = function(){
		var looking = document.getElementById("search").value;

		location.href = "http://localhost:1337/search:id=" + id + ":search=" + looking;
	};

	var id;
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

	document.getElementById("home").href = document.getElementById("home").href + ":id=" + id;
	document.getElementById("profile").href = document.getElementById("profile").href + ":id=" + id;
	document.getElementById("friends").href = document.getElementById("friends").href + ":id=" + id;
	document.getElementById("groups").href = document.getElementById("groups").href + ":id=" + id;
	document.getElementById("about").href = document.getElementById("about").href + ":id=" + id;
	document.getElementById("contact").href = document.getElementById("contact").href + ":id=" + id;

	inicialService.getFriends({follower: id}).then(
		function(response){
			console.log(response.data);
			groups = response.data;
			var node;
			var title = document.getElementsByTagName("ugroups")[0];
			var groupList = document.getElementById("divGroups");
			var cName = title.className;
			for(i = 0; i < groups.length; ++i){
				if(i % 2 == 0){
					node = document.createElement("divg");
				}else{
					node = document.createElement("divg2");
				}

				node.className = cName;
				var name = document.createElement("h4");
				var date = groups[i].createdAt.split("T");
				var textname = document.createTextNode("@" + groups[i].nome + "   " + date[0] + " " + date[1]);

				name.appendChild(textname);
				node.appendChild(name);
				groupList.appendChild(node);
			}
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});
}]);