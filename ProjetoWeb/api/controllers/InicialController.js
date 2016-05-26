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
		var value = req.body;
		console.log(value);
		loginsigninService.read(value,function(client){
			return res.send(client);
		});
	}
};