"use strict";

var app = angular.module('myApp',[]);
app.controller('MenuController',['$http','$scope',function($http,$scope){
	$scope.user = {};
	$scope.assos = [];


	function chargementAssos(){
		$http.get('/api/user/'+$scope.user.id+'/assos')
		.then(function(response){
			$scope.assos = response.data;
		},function(response){
			alert(response.data);
		});
	}

	function chargementUser(){
		$http.get('/api/user/current')
		.then(function(response){
			$scope.user = response.data;
			chargementAssos();
		},function(response){
			alert(response.data);
		});
	}

	chargementUser();
}]);