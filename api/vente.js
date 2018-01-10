var express = require('express');
var routeur = express.Router();

var securite = require('securite');
var user = require('user');
var log = require('log');

//permet d'enregistrer une vente
routeur.post('/',function(req,res,next){
	/* 
	format des données attendues : 
	
	- id designe l'id du Produit
	- on ne demande pas le nom de l'utilisateur car on peut le récuperer grace au module user


	Si le paiment a été fait avec un code :
	{
		mode : 'code',
		code : '1234',
		panier : [{id : 1, quantite : 3},
					{id : 2, quantite : 1}],
	}
	Si le paiement a été fait avec la carte :
	{
		mode : 'carte',
		uid : '1ZDGYU2849B781BS',
		panier : [{id: 1, quantite : 3},
					{id : 2, quantite : 1}],
	}
	*/
	if(req.body.mode == 'code'){
		securite.autentificationCode(req.body.code,function(){
			user.current(function(reponse){
				//Si il n'y a pas d'erreur, l'objet reponse devrait contenir les info sur l'utilisateur courant
				if(reponse.erreur == undefined){
					if(reponse.solde )
					// on enregistre la vente dans les logs
					log.vente({
						idUser : reponse.id,
						panier : req.body.panier,
						mode : 'code'
					},function(reponse){
						console.log(reponse);
					});
				}else{
					res.json(reponse);
				}

			});
			res.json({reponse : "code accepte"});
		},function(){
			res.json({reponse : "code refuse"});
		});
	}else{
		res.json(req.body);
	}
  	
});

module.exports = routeur;