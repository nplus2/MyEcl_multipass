"use strict";

var express = require('express');
var routeur = express.Router();
var securite = require('securite');

routeur.use('/:id',function(req,res){
	if(isNaN(req.params.id)){
		res.send("l'identifiant n'est pas un nombre !");
	}
	else{
		var idAsso = parseInt(req.params.id);
		function acces(){
			res.render("vente",{idAsso:idAsso});
		}
		function refus(){
			res.send("Accès Refusé");
		}
		securite.estMembre(idAsso,acces,refus);
	}
});
module.exports = routeur;