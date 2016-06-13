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

	inicialService.getFriends({follower: parseInt(id)}).then(
		function(response){
			console.log(response.data);
			friends = response.data;
			var node;
			var title = document.getElementsByTagName("ufriends")[0];
			var friendList = document.getElementById("divfriends");
			var cName = title.className;
			console.log("ALL FOLLOW");
			console.log(friends);
			for(i = 0; i < friends.length; ++i){
				console.log("FOR");
				console.log(friends[i].follows);
				inicialService.user(friends[i].follows).then(
					function(response2){
						if(i % 2 == 0){
							node = document.createElement("divf");
						}else{
							node = document.createElement("divf2");
						}

						node.className = cName;
						var name = document.createElement("h4");
						var textname = document.createTextNode("@" + response2.data[0].nickname + "   " + response2.data[0].firstname + " " + response2.data[0].lastname);

						name.appendChild(textname);
						node.appendChild(name);
						friendList.appendChild(node);
					},
					function(response2){	console.log('Erro: Problema no acesso ao banco de dados.');	}
				);
			}
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});
}]);