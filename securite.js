"use strict";

/*
	Administrateur : peut gérer toutes les assos et a acces aux outils d'administration
	Membre : peut gérer les assos dont il est membre

*/

var connexion = require('connexion');
var user = require('user');
var mysql = require('mysql');
//fonction permettant de savoir si un utilisateur est Administrateur
module.exports.isAdmin = function(idUser){
	return idUser == 1;
};

//permet de savoir si un utilisateur est membre d'une assos

//demande deux fonctions de callback 
// une a appeler si l'utilisateur a acces au contenu
// une a appeler si l'utilisateur est refusé
module.exports.estMembre = function(idAsso,acces,refus){
	user.current(function(reponse){
		var idUser = reponse.id;

		connexion.query("SELECT * FROM user_asso WHERE id_user = " + mysql.escape(idUser) + " AND id_asso = " + mysql.escape(idAsso),function(err,results,fields){
			if(err){
				throw err;
			}
			else if(results.length == 0){
				refus(); //signifie qu'on a pas trouvé de lien entre le user et l'asso
			}
			else{
				acces();
			}
		});
	});
};

module.exports.autentificationCode = function(code,acces,refus){
	user.current(function(reponse){
		if(code == reponse.code){
			acces();
		}else{
			refus();
		}
	})
}
