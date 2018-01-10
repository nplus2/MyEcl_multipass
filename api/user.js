var express = require('express');
var routeur = express.Router();


//module permettant d'obtenir des informations sur les utilisateurs
var user = require('user');



// renvoie l'utilisateur actuel
routeur.get('/current',function(req,res){
	user.current(function(reponse){

		res.json({id : reponse.id, nom : reponse.nom, prenom : reponse.prenom, login : reponse.login});
	});

})

// permet d'obtenir des infos sur un utilisateur
//ce ne sont que des infos basiques donc pas besoin d'autentification
routeur.get('/:id',function(req,res){
	if(isNaN(req.params.id)){
		res.json({erreur :"l'identifiant n'est pas un nombre !"});
	}
	else{
		id = parseInt(req.params.id);
		user.get(id,function(reponse){
			res.json({id : reponse.id, nom : reponse.nom, prenom : reponse.prenom, login : reponse.login});
		});
	}

});

// permet d'obtenir la liste des assos d'un utilisateur
routeur.get('/:id/assos',function(req,res){
	if(isNaN(req.params.id)){
		res.json({erreur :"l'identifiant n'est pas un nombre !"});
	}
	else{
		id = parseInt(req.params.id);
		user.getAsso(id,function(reponse){
			res.json(reponse);
		});
	}
});



module.exports = routeur;