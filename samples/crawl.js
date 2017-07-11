function crawl(d, l, fn){
	function dimension(n, acc) {
		for (var i = 0; i <l; i++){
			acc[n] = i;
			if(n === d-1){
				fn(acc);
			} else {
				dimension(n+1, acc);
			}
		}
	}
	return dimension(0,[]);
}

function dot(T, V, d ,l, get,set, RES) {
	var t0 = performance.now();
	crawl(d,l, function(i){
		set(RES, i.slice(0, -1), get(RES, i.slice(0,-1)) + (get(V, i.slice(0,-1))*get(T, i)));
	});
	return performance.now() - t0;
}

function tuple(arr) { return arr.join('-');}

var p = 100;
var depth = 3;

var arrT = [];

crawl(depth,p, function(d){
	if(!arrT[d[0]]){
		arrT[d[0]] = [];
	}
	if(!arrT[d[0]][d[1]]){
		arrT[d[0]][d[1]] = [];
	}
	arrT[d[0]][d[1]][d[2]] = 2;
});

var arrV = [];

crawl(depth - 1,p, function(d){
	if(!arrV[d[0]]){
		arrV[d[0]] = [];
	}
	arrV[d[0]][d[1]] = 2;
});

var arrRES = [];

crawl(depth - 1,p , function(d){
	if(!arrRES[d[0]]){
		arrRES[d[0]] = [];
	}
	arrRES[d[0]][d[1]] = 0;
});

var picanteT = new Map();

crawl(depth,p, function(d){
	picanteT.set(tuple(d), 2);
});

var picanteV = new Map();

crawl(depth - 1,p, function(d){
	picanteV.set(tuple(d), 2);
});

var picanteRES = new Map();

crawl(depth - 1,p, function(d){
	picanteRES.set(tuple(d), 0);
});

var picante2T = {};

crawl(depth,p, function(d){
	picante2T[tuple(d)] = 2;
});

var picante2V = {};

crawl(depth - 1,p, function(d){
	picante2V[tuple(d)] = 2;
});

var picante2RES = {};

crawl(depth - 1 ,p, function(d){
	picante2RES[tuple(d)] = 0;
});



var timeARR = dot(arrT,arrV, depth, p,function(V, i){
	if(i.length == 2) {
		return V[i[0]][i[1]];
	} else {
		return V[i[0]][i[1]][i[2]];
	}
}, function(V,i,val){
  	V[i[0]][i[1]] = val;
}, arrRES);

var timePICANTE = dot(picanteT,picanteV, depth, p,function(T, i){
	return T.get(tuple(i));
}, function(V,i,val){
  	V.set(tuple(i), val);
}, picanteRES);

var timePICANTE2 = dot(picante2T,picante2V, depth, p,function(T, i){
	return T[tuple(i)];
}, function(V,i,val){
  	V[tuple(i)] = val;
}, picante2RES);
