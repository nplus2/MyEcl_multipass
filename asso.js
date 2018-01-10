"use strict";
//module permettant d'obtenir des informations sur une asso


var securite = require('securite');
var connexion = require('connexion');
var mysql = require('mysql');
//renvoie les informations basiques sur une asso
module.exports.get = function(idAsso,callback){
	connexion.query("SELECT id,nom FROM asso WHERE id = " + mysql.escape(idAsso) + " ;" ,function(err,results,fields){
		if (err){
			throw err;
		}
		else if(results.length == 0){
			callback({erreur : "L'asso n'a pas été trouvé"});
		}
		else{
			callback(results[0]);
		}
	});
};

// les autorisation de l'association
// doit etre membre de l'association pour acceder a ce contenu
module.exports.autorisations = function(idAsso,callback){
	function acces(){
		connexion.query("SELECT rechargement,administration,vente FROM asso WHERE id = " + mysql.escape(idAsso) + " ;" ,function(err,results,fields){
			if (err){
				throw err;
			}
			else if(results.length == 0){
				callback({erreur : "L'asso n'a pas été trouvé"});
			}
			else{
				callback(results[0]);
			}
		});
	}
	function refus(){
		callback({erreur : "Vous n'avez pas accès à ce contenu"});
	}
	securite.estMembre(idAsso,acces,refus);
};
// les magasins de l'association
// doit etre membre de l'association pour acceder a ce contenu
module.exports.magasins = function(idAsso,callback){
	function acces(){
		connexion.query("SELECT m.id AS idMagasin, m.nom AS nomMagasin, p.* FROM magasin AS m INNER JOIN produit AS p ON p.idMagasin=m.id WHERE idAsso = " + mysql.escape(idAsso) + " ;" ,function(err,results,fields){
			if (err){
				throw err;
			}
			else{
				var magasins = []; 
				results.forEach(function(row){
					if(magasins[row.idMagasin] == undefined){
						magasins[row.idMagasin] = {id : row.idMagasin, nom : row.nomMagasin, produits : []};	
					}
					magasins[row.idMagasin].produits.push({id : row.id, nom : row.nom, prix : row.prix});
				});
				callback(magasins);
			}
		});

	}
	function refus(){
		callback({erreur : "Vous n'avez pas accès à ce contenu"});
	}
	securite.estMembre(idAsso,acces,refus);
};
module.exports.updateSolde = function(idAsso,changement,callback){
	var requete = "UPDATE asso SET solde = solde + "+mysql.escape(changement)+" WHERE id= " + mysql.escape(idAsso) + " ;";
	console.log(requete);
	connexion.query( requete,function(err,results,fields){
		if (err){
			throw err;
		}else{
			callback({reponse : "ok"});
		}
	});		
};











