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
	}
}