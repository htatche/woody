// var _ = require("underscore");

var beak = {
	_: require("underscore"),

	name: "Bitcoin",
	patterns: [
		{
			"regxp": 		/price|value/i,
			"params": 	[/'at'/, /'in'/],
			"action": 	'getBitcoinPrice',
			"outcome": 	'reply'
		}
	],

	getBitcoinPrice: function(_at, _in) {
		debugger
		return "Hey ! BTC price is 450€";
	}
};

module.exports = beak;