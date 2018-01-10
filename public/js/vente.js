"use strict";

var app = angular.module('myApp',[]);

app.controller('VenteController',['$http','$scope',function($http,$scope){
	$scope.asso = {};
	$scope.magasins = [];
	function chargementAsso(){
		// l'identifiant de l'asso à été enregistré auparavant sous le nom de idAsso
		$http.get('/api/asso/'+idAsso).then(function(response){
			$scope.asso = response.data;
		},function(response){
			alert(JSON.stringify(response.data));
		})
	}
	function chargementMagasin(){
		$http.get('/api/asso/'+idAsso+'/magasins').then(function(response){
			$scope.magasins = response.data;
		},function(response){
			alert(JSON.stringify(response.data));
		});
	}
	function vente(){
		var data = {
			mode : 'code',
			code : '1234',
			panier : [{id : 1, quantite : 3},
						{id : 2, quantite : 1}],
		};
		$http.post('/api/vente',data).then(function(response){
			$scope.data = response.data;
		},function(response){
			alert(JSON.stringify(response.data));
		})
	}
	chargementAsso();
	chargementMagasin();
	vente();
}]);