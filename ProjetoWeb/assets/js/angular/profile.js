var myApp = angular.module('inicial');

//Service
myApp.controller('profile', ['$scope', 'inicialService', function($scope, inicialService) {
	var id;
	var splitHref = location.href.split('=');
	id = splitHref[1];
	var user;
	$scope.myPosts = [];
	inicialService.user(id).then(
		function(response){
			inicialService.setUser(response.data[0]);
			user = inicialService.getUser();
			document.getElementsByTagName("uname")[0].innerHTML = user.firstname + " " + user.lastname;
			console.log("BIRTH " + user.birth);
			var date = user.birth.split("T");
			document.getElementsByTagName("ubirth2")[0].innerHTML = date[0];
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	inicialService.getYourPosts(id).then(
		function(response){
			console.log('Retornei os posts!');
			inicialService.saveMyPost(response.data);
			$scope.myPosts = inicialService.readMyPost();
			console.log($scope.myPosts[0]);
			var div = document.getElementById("divPosts");
			var title = document.getElementById("titlepost");
			var cName = title.className;
			for(i = 0; i < $scope.myPosts.length; i++){
				if(i % 2 == 0){
					var node = document.createElement("divp");
				}else{
					var node = document.createElement("divp2");
				}
				
				node.className = cName;
				var name = document.createElement("h4");
				var text = document.createElement("p");
				var date = $scope.myPosts[i].createdAt.split("T");
				var textname = document.createTextNode("@" + $scope.myPosts[i].user.nickname + "   " + date[0] + " " + date[1]);
				var texttext = document.createTextNode($scope.myPosts[i].text);

				name.appendChild(textname);
				text.appendChild(texttext);
				node.appendChild(name);
				node.appendChild(text);
				div.appendChild(node);
			}
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

	editProfilePic = function(){
		console.log("Editado");
	};

	updateBio = function(){
		var newdesc = document.getElementById("newbio");

		console.log(newdesc);
	};

	editProfile = function(){
		var bio = document.getElementsByTagName("udesc")[0];
		var newbio = document.createElement("INPUT");
		var confirm = document.createElement("BUTTON");

		confirm.id = "confirmEdit";
		confirm.style.float = "right";
		confirm.appendChild(document.createTextNode("confirm"));
		confirm.addEventListener("click", updateBio);

		newbio.id = "newbio";
		bio.appendChild(newbio);
		bio.appendChild(confirm);
	};

	showEdit = function(){
		if(document.getElementById("editButton") == null){
			var eprof = document.getElementsByTagName("divu")[0];
			var edit = document.createElement("BUTTON");

			edit.id = "editButton";
			edit.style.float = "right";
			edit.addEventListener("click", editProfile);
			edit.appendChild(document.createTextNode("edit"));

			eprof.appendChild(edit);
		}
	};

	unshowEdit = function(){
		var eprof = document.getElementsByTagName("divu")[0];
		var redit = document.getElementById("editButton");

		eprof.removeChild(redit);
	};

	unblurPPic = function(){
		document.getElementById("profPic").style.WebkitFilter = "blur(0)";
	};

	blurPPic = function(){
		document.getElementById("profPic").style.WebkitFilter = "blur(2px)";
	};
}]);