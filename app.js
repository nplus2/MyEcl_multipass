/*

***** TO DO *****

-> Enregistrer une transaction (une vente)
	-> LogsVente
	-> Modification des soldes User et Asso
-> Associer des User avec des Cartes
	-> Payer avec la carte
-> Voir son profil
	-> historique
	-> Solde
-> Profil de l'asso + Modifier ses Magasins + Configurer son Asso
	-> Logs des Modifs
	-> voir les logs dans le profil ...
-> Rechargement des comptes
-> Partie Administrateur


*/
"use strict";

var express = require('express');
var app = express();
var securite = require('securite');
var bodyParser = require('body-parser');
var assoModule = require('asso');

const hostname = '127.0.0.1';
const port = 3000;

//informations pour la connection à la base de données



// on définit le gestionnaire de templates
app.set('view engine','ejs');

// This will allow us to grab information from the POST.
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//le dossier public est accessible pour tout le monde depuis l'url /assets
app.use('/assets',express.static(__dirname + '/public'));

var vente = require('./controleur/vente');
var asso = require('./controleur/asso');
var menu = require('./controleur/menu');
var api = require('./api/routeur');

app.use('/vente',vente);
app.use('/asso',asso);
app.get('/menu',menu); // on utilise .get et non .use parce que c'est juste une fonction et pas un routeur
app.use('/api',api);



app.get('/', function(req, res){
	
  	res.send('hello world');
	  
});

app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);

/*assoModule.updateSolde(1,1000,function(reponse){console.log(reponse);});*/