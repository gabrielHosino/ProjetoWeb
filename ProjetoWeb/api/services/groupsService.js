module.exports = {
	create: function(newgroup, callback){
		var Obj = newgroup;
		Group.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	joinGroup: function(newjoin, callback){
		var Obj = newjoin;
		Group.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	getGroupByName: function(value, callback){
		Group.find({nome: value.nome}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	},

	getGroup: function(value, callback){
		Group.find({id: value.id, nome: value.nome}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	},	

	getGroups: function(value, callback){
		Group.find({id: value.id}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	}
}