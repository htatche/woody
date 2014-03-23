var Woody = function() {};

Woody.prototype.Forest 		  = [];
Woody.prototype.Beaks 			= {};

Woody.prototype.addToForest = function(woodpeecker) {
	var parent = this;

	woodpeecker.patterns.forEach(function(pattern) {
		pattern.parent = woodpeecker.name;
		parent.Forest.push(pattern);
	});
}

Woody.prototype.add = function(woodpeecker) {
	var parent = this;

	parent.Beaks[woodpeecker.name] = woodpeecker;
	parent.addToForest(woodpeecker);
}

Woody.prototype.match = function(str) {
	var parent = this;

	var matches = parent.Forest.filter(function(pattern) {
		return str.match(pattern.regxp);
	});

	return matches[0]
}

Woody.prototype.react = function(pattern) {
	var parent = this;

	var result = parent.Beaks[pattern.parent][pattern.action]();

	if (pattern.outcome) {
		return result;
	}
}

Woody.prototype.authenticate = function() {
	var parent = this;

	new parent.Auth();
	parent.auth.create();

	return parent;
}

Woody.prototype.listen = function() {
	var parent = this;

	if (parent.auth == undefined)
		throw new Error("You must authenticate first");

	var url = "https://userstream.twitter.com/1.1/user.json";
  var req = parent.auth.oauth.get(
  					url,
					  parent.auth.access_token,
					  parent.auth.secret_access_token
					  );  

  req.addListener("response", function (res) {

    res.setEncoding("utf8");

    res.addListener("data", function (data) {
    	console.log(data);
    	
    	var event = parent.detectEvent(data);

    	if (event != undefined) {
    		var json = JSON.parse(data);
    		parent[event](json);
    	}

    });

    res.addListener("end", function () {
      throw new Error("I stopped listening.");
    });

  }).end();		

  return parent;
}

module.exports = Woody;