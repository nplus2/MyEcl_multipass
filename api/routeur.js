"use strict";

var express = require('express');
var routeur = express.Router();

var vente = require('./vente');
var user = require('./user');
var asso = require('./asso');

routeur.use('/vente',vente);
routeur.use('/user',user);
routeur.use('/asso',asso);
routeur.get('/',function(req,res){
	res.send('>> Api !')
});


module.exports = routeur;