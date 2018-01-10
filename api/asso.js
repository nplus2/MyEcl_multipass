var express = require('express');
var routeur = express.Router();


//module permettant d'obtenir des informations sur les assos
var asso = require('asso');




// permet d'obtenir des infos basiques sur une asso
routeur.get('/:id',function(req,res){
	if(isNaN(req.params.id)){
		res.json({erreur :"l'identifiant n'est pas un nombre !"});
	}
	else{
		id = parseInt(req.params.id);
		asso.get(id,function(reponse){
			res.json(reponse);
		});
	}

});

// permet d'obtenir la liste des autorisations d'une asso
// information réservée aux membres de l'asso et aux administrateurs
routeur.get('/:id/autorisations',function(req,res){
	if(isNaN(req.params.id)){
		res.json({erreur :"l'identifiant n'est pas un nombre !"});
	}
	else{
		id = parseInt(req.params.id);
		asso.autorisations(id,function(reponse){
			res.json(reponse);
		});
	}
});

// permet d'obtenir la liste des magasins d'une asso
// information réservée aux membres de l'asso et aux administrateurs
routeur.get('/:id/magasins',function(req,res){
	if(isNaN(req.params.id)){
		res.json({erreur :"l'identifiant n'est pas un nombre !"});
	}
	else{
		id = parseInt(req.params.id);
		asso.magasins(id,function(reponse){
			res.json(reponse);
		});
	}
});

module.exports = routeur;