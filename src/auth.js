var OAuth = require('OAuth');

var Auth = function() {   

	this.create = function(keys) {

		var request_token_url    		= 'https://api.twitter.com/oauth/request_token',
		    access_token_url     		= 'https://api.twitter.com/oauth/access_token';
		
		this.access_token 					= keys['access_token'];
		this.secret_access_token  	= keys['secret_access_token'];

		this.oauth = new OAuth.OAuth(
		  request_token_url,
		  access_token_url,
		  keys['consumer_key'],
		  keys['consumer_secret_key'],
		  '1.0A',
		  null,
		  'HMAC-SHA1'
		); 
	}

}

module.exports = Auth;