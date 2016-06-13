module.exports = {
	follow: function(newfollow, callback){
		var Obj = newfollow;

		Friend.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	getFriend: function(value, callback){
		Group.find({follower: value.follower, follows: value.follows}).exec(function(err, friends){
			if(err){
				throw err;
			}
			callback(friends);
		});
	},	

	getFriends: function(value, callback){
		Group.find({follower: value.follower}).exec(function(err, friends){
			if(err){
				throw err;
			}
			callback(friends);
		});
	}
}