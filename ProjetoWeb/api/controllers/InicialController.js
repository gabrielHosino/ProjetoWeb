/**
 * InicialController
 *
 * @description :: Server-side logic for managing inicials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function(req,res){
		//var value = req.param('Teste');
		var value = req.body;
		console.log(value);
		loginsigninService.save(value, function(result){
			return res.json(result);
		});
	},
	login: function(req,res){
		var value = {email: req.param('email'), senha: req.param('senha')};
		console.log("login");
		console.log(value);
		loginsigninService.read(value, function(client){
			return res.json(client);
		});
	},
	user: function(req,res){
		var value = req.param('id');
		console.log("user");
		console.log(value);
		loginsigninService.readUser(value, function(client){
			return res.json(client);
		});
	},
	newpost: function(req,res){
		//var value = req.param('Teste');
		var value = req.body;
		console.log(value);
		postsService.save(value, function(result){
			return res.json(result);
		});
	},
	yourposts: function(req,res){
		var value = req.param('id');
		console.log("user");
		console.log(value);
		postsService.getyourposts(value, function(posts){
			return res.json(posts);
		});
	}
};