var myApp = angular.module('inicial');

myApp.controller('search', ['$scope', 'inicialService', function($scope, inicialService) {
	var id;
	var search;

	Search = function(){
		var looking = document.getElementById("search").value;

		location.href = "http://localhost:1337/search:id=" + id + ":search=" + looking;
	};

	joinGroup = function(event){
		var parent = event.path[1].firstChild.innerHTML;
		var elem = parent.split('	');
		elem = elem[0].split('@');
		var groupName = elem[1];

		console.log("JOIN");
		console.log(groupName);

		inicialService.getGroupByName(groupName).then(
		function(response){
			var ownerid = response.data[0].ownerid;
			var nome = response.data[0].nome;
			var newjoin = {id: parseInt(id), nome: nome, ownerid: ownerid};

			console.log("NEW JOIN");
			console.log(newjoin);

			inicialService.joinGroup(newjoin).then(
				function(response2){
					console.log("NAILED IT");			
				},
				function(response2){
					console.log('Erro: Problema no acesso ao banco de dados.');
				});
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		});
	};

	followUser = function(event){
		var parent = event.path[1].firstChild.innerHTML;
		var elem = parent.split('	');
		elem = elem[0].split('@');
		var nick = elem[1];

		inicialService.userByNick(nick).then(
		function(response){
			var follows = response.data[0].id;
			var newfollow = {follower: parseInt(id), follows: follows};

			inicialService.follow(newfollow).then(
				function(response2){
					console.log("NAILED IT");			
				},
				function(response2){
					console.log('Erro: Problema no acesso ao banco de dados.');
				});
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		});
	}

	console.log("THIS controller");

	var splitHref = location.href.split('=');
	var idsplit = splitHref[1].split(':');
	id = idsplit[0];
	search = splitHref[2];
	console.log("SPLIT");
	console.log(id + " " + search);
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

	console.log("GERE");
	document.getElementById("home").href = document.getElementById("home").href + ":id=" + id;
	document.getElementById("profile").href = document.getElementById("profile").href + ":id=" + id;
	document.getElementById("friends").href = document.getElementById("friends").href + ":id=" + id;
	document.getElementById("groups").href = document.getElementById("groups").href + ":id=" + id;
	document.getElementById("about").href = document.getElementById("about").href + ":id=" + id;
	document.getElementById("contact").href = document.getElementById("contact").href + ":id=" + id;
	console.log("GERE");

	inicialService.searchByFN(search).then(
		function(response){
			console.log("firstname");
			console.log(response.data);

			var results = document.getElementsByTagName("usearch")[0];
			var append = document.getElementById("divSearch");
			var cName = results.className;
			for(i = 0; i < response.data.length; ++i){
				if(i % 2 == 0){
					node = document.createElement("divs");
				}else{
					node = document.createElement("divs2");
				}

				node.className = cName;
				var name = document.createElement("h4");
				var textname = document.createTextNode("@" + response.data[i].nickname + "	" + response.data[i].firstname + " " + response.data[i].lastname);
				var button = document.createElement("BUTTON");
				
				button.appendChild(document.createTextNode("Follow"));
				button.style.float = "right";
				button.addEventListener("click", followUser);

				name.appendChild(textname);
				node.appendChild(name);
				node.appendChild(button);
				append.appendChild(node);
			}
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);
	inicialService.searchByLN(search).then(
		function(response){
			console.log("lastname");
			console.log(response.data);

			var results = document.getElementsByTagName("usearch")[0];
			var append = document.getElementById("divSearch");
			var cName = results.className;
			for(i = 0; i < response.data.length; ++i){
				if(i % 2 == 0){
					node = document.createElement("divs");
				}else{
					node = document.createElement("divs2");
				}

				node.className = cName;
				var name = document.createElement("h4");
				var textname = document.createTextNode("@" + response.data[i].nickname + "	" + response.data[i].firstname + " " + response.data[i].lastname);
				var button = document.createElement("BUTTON");
				
				button.appendChild(document.createTextNode("Follow"));
				button.style.float = "right";
				button.addEventListener("click", followUser);

				name.appendChild(textname);
				node.appendChild(name);
				node.appendChild(button);
				append.appendChild(node);
			}
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);
	inicialService.searchByNick(search).then(
		function(response){
			console.log("nickname");
			console.log(response.data);

			var results = document.getElementsByTagName("usearch")[0];
			var append = document.getElementById("divSearch");
			var cName = results.className;
			for(i = 0; i < response.data.length; ++i){
				if(i % 2 == 0){
					node = document.createElement("divs");
				}else{
					node = document.createElement("divs2");
				}

				node.className = cName;
				var name = document.createElement("h4");
				var textname = document.createTextNode("@" + response.data[i].nickname + "	" + response.data[i].firstname + " " + response.data[i].lastname);
				var button = document.createElement("BUTTON");
				
				button.appendChild(document.createTextNode("Follow"));
				button.style.float = "right";
				button.addEventListener("click", followUser);

				name.appendChild(textname);
				node.appendChild(name);
				node.appendChild(button);
				append.appendChild(node);
			}
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);
	inicialService.getGroupByName(search).then(
		function(response){
			console.log("group");
			console.log(response.data);

			var results = document.getElementsByTagName("usearch")[0];
			var append = document.getElementById("divSearch");
			var cName = results.className;
			for(i = 0; i < response.data.length; ++i){
				if(i % 2 == 0){
					node = document.createElement("divs");
				}else{
					node = document.createElement("divs2");
				}

				node.className = cName;
				var name = document.createElement("h4");
				var textname = document.createTextNode("@" + response.data[i].nome);
				var button = document.createElement("BUTTON");
				
				button.appendChild(document.createTextNode("Join"));
				button.style.float = "right";
				button.addEventListener("click", joinGroup);

				name.appendChild(textname);
				node.appendChild(name);
				node.appendChild(button);
				append.appendChild(node);
			}
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);
}]);