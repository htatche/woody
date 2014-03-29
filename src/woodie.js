var Q 				= require("q");

var Auth 	 		= require("./auth.js");
var Status 		= require("./status.js");

var Woody = function() {
	var parent = this;

	parent.Auth = Auth;
	parent.Auth.prototype.parent = parent;	

	parent.Status = Status;
	parent.Status.prototype.parent = parent;		
};

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
	
	return result;
}

Woody.prototype.authenticate = function(keys) {
	var parent = this;

	parent.auth = new parent.Auth();
	parent.auth.create(keys);

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

  var callback = function (res) {
    

  };

  req.addListener("response", parent.read.bind(parent)).end();

  return parent;
}

Woody.prototype.read = function(res) {
	var parent = this;

  res.setEncoding("utf8");

  res.addListener("data", function (data) {

		var json, status;

    try {
    	json = JSON.parse(data);
    } catch (e) { return undefined; }  

		if (!json.hasOwnProperty("text"))
			return undefined;

		var status = new Status({"body": json});    	
		var pattern = parent.match(status.text);
		var result  = parent.react(pattern);

		if (pattern.outcome == "reply") {
			status.reply(result);
		}

  });

  res.addListener("end", function () {
    throw new Error("I stopped listening.");
  });

}

Woody.prototype.Auth = Auth;
Woody.prototype.Status = Status;

module.exports = Woody;
