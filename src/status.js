var Q = require("q");

var Status = function(args) {
  var parent = this;
  var args = args || {};

  parent.verifyArgs = function(args) {

	  if (args.hasOwnProperty("text") && args.hasOwnProperty("body"))
	  	throw new Error("Arguments list length wrong");

	  if (args.hasOwnProperty("text")) {
	  	if (typeof args.text == "string")
		  	parent.text = args.text;
		  else
		  	throw new Error("Text must be a String");
		}

	  if (args.hasOwnProperty("body")) {
	  	if (typeof args.body == "object")
		  	parent.setBodyParams(args);
		  else
		  	throw new Error("Body must be an Object");
		}		

  }

  parent.setBodyParams = function(args) {
  	parent.body = args.body;

  	parent.id 	= parent.body.id_str;
  	parent.text = parent.body.text;		  	
  	parent.user_id = parent.body.user.id_str;
  }

  parent.isQuestion = function() {
    return (parent.text.match(/.*(What|How much).*/i))
    ? true
    : false
  }

  parent.send = function(url, params) {
    var params = params || {"status": parent.text};
  	var deferred = Q.defer();
    var auth = parent.parent.auth;

	  auth.oauth.post(
      url,
      auth.access_token,
      auth.secret_access_token,
      params,
      function(e,data,res) { 
        if (e) {
          deferred.reject(e);         
        } else {
          deferred.resolve(data);
        }
      }
	  ); 

	  return deferred.promise;
  }

  parent.reply = function(answer) {
    var url = "https://api.twitter.com/1.1/statuses/update.json",
        params = {"in_reply_to_status_id": parent.id, "status": answer};
    
    parent.send(url, params).then(
      function(data) {
        var json = JSON.parse(data);
        console.log("Tweet #" + parent.id + " has been replied with " + json.text);
      },
      function(e) {
        console.error(e);
      }         
    );  

    return parent;
  }

  parent.verifyArgs(args);

  return parent;
}

module.exports = Status;