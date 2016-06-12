var myApp = angular.module('inicial');

//Service
myApp.controller('profile', ['$scope', 'inicialService', function($scope, inicialService) {
	var id;
	var splitHref = location.href.split('=');
	id = splitHref[1];
	var user;
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
		var newdesc = document.getElementById("newbio").value;
		var newfirstname = document.getElementById("newfirstname").value;
		var newlastname = document.getElementById("newlastname").value;
		var newdate = document.getElementById("newdate").value;
		var confirm = document.getElementById("confirmEdit");
		var newbio = document.getElementById("newbio");
		var newfn = document.getElementById("newfirstname");
		var newln = document.getElementById("newlastname");
		var newdt = document.getElementById("newdate");
		var bio = document.getElementsByTagName("udesc")[0];
		var name = document.getElementsByTagName("uname")[0];
		var date = document.getElementsByTagName("ubirth2")[0];

		if(newdate != ""){
			var dates = newdate.split("T");
			date.innerHTML = dates[0];
			//inicialService.updateBirth(dates[0]);
		}else{
			date.removeChild(newdt);
		}

		console.log("ON CHANGE");
		console.log("NAME: " + newfirstname + " " + newlastname);
		console.log("DATE: " + newdate);
		console.log("DESC: " + newdesc);

		if(newdesc != ""){
			bio.innerHTML = newdesc;
			//inicialService.updateBio(newdesc);
		}
		else{
			bio.removeChild(confirm);
			bio.removeChild(newbio);
		}

		if(newfirstname != ""){
			name.innerHTML = newfirstname + " " + newlastname;
			//inicialService.updateFirstname(newfirstname);
			//inicialService.updateLastname(newlastname);
		}
		else{
			name.removeChild(newfn);
			name.removeChild(newln);
		}

		name.removeChild(newfn);
		name.removeChild(newln);
		date.removeChild(newdt);
		bio.removeChild(confirm);
		bio.removeChild(newbio);
	};

	editProfile = function(){
		var names = document.getElementsByTagName("uname")[0];
		var date = document.getElementsByTagName("ubirth2")[0];
		var bio = document.getElementsByTagName("udesc")[0];
		var newbio = document.createElement("INPUT");
		var newfirstname = document.createElement("INPUT");
		var newlastname = document.createElement("INPUT");
		var newdate = document.createElement("INPUT");
		newdate.setAttribute("type", "date");
		var confirm = document.createElement("BUTTON");

		confirm.id = "confirmEdit";
		confirm.style.float = "right";
		confirm.appendChild(document.createTextNode("confirm"));
		confirm.addEventListener("click", updateBio);

		newbio.id = "newbio";
		
		newfirstname.id = "newfirstname";
		newlastname.id = "newlastname";

		newdate.id = "newdate";

		bio.appendChild(newbio);
		bio.appendChild(confirm);
		date.appendChild(newdate);
		names.appendChild(newfirstname);
		names.appendChild(newlastname);

		
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