var connexion = require('connexion');
var mysql = require('mysql');

var produit = require('produit');
module.exports.vente = function(logvente,callback){
	/*
	l'objet logvente est attendu de la forme
	{
		
		idUser : 1,
		panier : [{id : 1, quantite : 3},
					{id : 2, quantite : 1}],
		mode : 'code'
	}
	
	*/
	console.log(logvente);

	logvente.panier.forEach(function(vente){

		var idProduit = mysql.escape(vente.id);
		var nomProduit = "";
		var prixProduit = 0;
		var quantite = mysql.escape(vente.quantite);
		var idUser = mysql.escape(logvente.idUser);
		var mode = mysql.escape(logvente.mode);
		var idAsso = 0;
		
		function enregistrementVente(asso){
			idAsso = mysql.escape(asso.idAsso);
			var parametres = "("+idProduit+","+nomProduit+","+prixProduit+","+quantite+","+idUser+","+mode+","+idAsso+");";
			var requete = "INSERT INTO logVente(idProduit,nomProduit,prixProduit,quantite,idUser,mode,idAsso) VALUES" + parametres;
			console.log(requete);
			connexion.query(requete ,function(err,results,fields){
				if (err){
					throw err;
				}
				else{
					callback({reponse : "la vente à bien été enregistrée"});
				}
			});
		}
		function chargementProduit(reponse){
			if(reponse.erreur != undefined){
				callback(reponse);
			}else{
				
				nomProduit = mysql.escape(reponse.nom);
				prixProduit = mysql.escape(reponse.prix);
				produit.getAsso(idProduit,enregistrementVente);
			}
			
		}
		console.log('vente',vente);
		produit.get(idProduit,chargementProduit);
	});
	
	
	

};

/*
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
*/