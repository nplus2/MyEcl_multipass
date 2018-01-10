"use strict";

var app = angular.module('myApp',[]);

app.controller('AssoController',['$http','$scope',function($http,$scope){
	$scope.autorisations = {
		rechargement : false,
		administration : false,
		vente : false
	};
	$scope.asso = {};
	function chargementAsso(){
		// l'identifiant de l'asso à été enregistré auparavant sous le nom de idAsso
		$http.get('/api/asso/'+idAsso).then(function(response){
			$scope.asso = response.data;
		},function(response){
			alert(JSON.stringify(response.data));
		})
	};
	function chargementAutorisations(){
		// l'identifiant de l'asso à été enregistré auparavant sous le nom de idAsso
		$http.get('/api/asso/'+idAsso+'/autorisations').then(function(response){
			$scope.autorisations = response.data;
		},function(response){
			alert(JSON.stringify(response.data));
		})	
	}
	chargementAsso();
	chargementAutorisations();
}]);