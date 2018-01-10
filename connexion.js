var parametres = require('parametres');

var mysql      = require('mysql');

var connexion = mysql.createConnection({
	host : parametres.mysql_host,
	user : parametres.mysql_user,
	password : parametres.mysql_password,
	database : parametres.mysql_database
});

connexion.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

module.exports = connexion;