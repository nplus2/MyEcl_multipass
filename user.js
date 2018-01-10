"use strict";
//module permettant d'obtenir des informations sur les utilisateurs

var connexion = require('connexion');
var parametres =require('parametres');
var mysql = require('mysql');
//donnees de test
var data = [{id : 1, prenom : "Michel", nom : "Blanc"},
		{id : 2, prenom : "John", nom : "Doe"}];


//renvoie l'utilisateur actuel
module.exports.current = function(callback){
	module.exports.get(parametres.user_current,callback);
};


//renvoie le user ayant l'identifiant donné
module.exports.get = function(id,callback){
	connexion.query("SELECT * FROM user WHERE id = " + mysql.escape(id) + " ;" ,function(err,results,fields){
		if (err){
			throw err;
		}
		else if(results.length == 0){
			callback({erreur : "L'utilisateur n'a pas été trouvé"});
		}
		else{
			callback(results[0]);
		}
	});
};

module.exports.getAsso = function(id, callback){
	connexion.query("SELECT a.id,a.nom FROM multipass.user_asso INNER JOIN asso AS a ON a.id=id_asso WHERE id_user = "+  mysql.escape(id) + " ;",function(err,results,fields){
		if (err){
			throw err;
		}
		else{
			callback(results);
		}
		
	})
		
};

