module.exports = {
	save: function(newClient, callback){
		//var Obj = {value: tasks};
		var Obj = newClient;
		Clients.create(Obj).exec(function(err,result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},
	
	read: function(value,callback){
		Clients.find({email: value.email, password: value.senha}).exec(function(err, client){
			if (err){
				throw err;
			}
			callback(client);
		});
	},

	updateBio: function(newbio, callback){
		Clients.update({id: newbio.id}, {bio: newbio.newbio}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateFirstname: function(newfn, callback){
		Clients.update({id: newfn.id}, {firstname: newfn.newfn}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateLastname: function(newln, callback){
		Clients.update({id: newln.id}, {lastname: newln.newln}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateBirth: function(newbirth, callback){
		console.log("DATABASE");
		console.log(newbirth);
		Clients.update({id: newbirth.id}, {birth: newbirth.newbirth}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	readUser: function(value,callback){
		Clients.find({id: value}).exec(function(err, client){
			if (err){
				throw err;
			}
			callback(client);
		});
	}
}