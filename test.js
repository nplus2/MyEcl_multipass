function f1(resolve,reject){
	x = Math.random()*4000 + 1000;
	setTimeout(function(){resolve(x)},x);	
}
p1 = new Promise(f1);
p2 = new Promise(f1);
p3 = new Promise(f1);
p1.then(function(x1){console.log(1,x1)}); 
p2.then(function(x2){console.log(2,x2)});
p3.then(function(x3){console.log(3,x3)});
Promise.all([p1,p2,p3]).then(function(){console.log("c'est fini")});
