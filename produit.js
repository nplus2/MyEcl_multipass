"use strict"; 
var connexion = require('connexion');
var mysql = require('mysql');

module.exports.get = function(idProduit,callback){
	connexion.query("SELECT * FROM produit WHERE id = " + mysql.escape(idProduit) + " ;" ,function(err,results,fields){
		if (err){
			throw err;
		}
		else if(results.length == 0){
			callback({erreur : "Le Produit n'a pas été trouvé"});
		}
		else{
			callback(results[0]);
		}
	});
};

module.exports.getAsso = function(idProduit,callback){
	connexion.query("SELECT idAsso FROM produit AS p INNER JOIN magasin AS m ON m.id=idMagasin WHERE p.id=" + mysql.escape(idProduit) + ";",function(err,results,fields){
		if (err){
			console.log("erreur : node_modules/produit.js");
			throw err;
		}
		else if(results.length == 0){
			callback({erreur : "Le Produit ou le Magasin n'a pas été trouvé"});
		}
		else{
			callback(results[0]);
		}
	});
};

module.exports.prixPanier = function(panier,callback){

	// Promise.all() Permet d'executer une fonction sur un tableau de maniere asynchrone :
	// On effectue une requete pour chacun des elements du tableau panier
	// On traite les info une fois qu'on a toutes les informations
	var listePromesse = [];
	panier.forEach(function(vente){
		listePromesse.push(new Promise(function(resolve,reject){
			connexion.query("SELECT prix FROM produit WHERE id = + " + mysql.escape(vente.id),function(err,results,fields){
				if(err){
					throw err;
				}else if(results.length == 0){
					reject("Le produit n'a pas été trouvé");
				}else{
					resolve(results[0].prix*vente.quantite);
				}
			});
		}));
	});
	Promise.all(listePromesse).then(function(valeurs){
		var somme = (a,b)=>a+b;
		callback(valeurs.reduce(somme)); // permet de faire la somme de tous les élements du tableau
	},function(reason){
		console.log(reason);
	})
}