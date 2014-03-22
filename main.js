var WoodyWoodPeecker = require("./woodiewoodpicker.js");

var status = 'What is the price of the Bitcoin';

var beak = {
	name: "Bitcoin",
	patterns: [
		{
			"regxp": 		/price|value/i,
			"params": 	[/'at'/, /'in'/],
			"action": 	'getBitcoinPrice',
			"outcome": 	'direct message'
		}
	],

	getBitcoinPrice: function(_at, _in) {
		console.log("BTC price is 450€");
	}
};

var woodie = new WoodyWoodPeecker();

woodie.add(beak);

var pattern = woodie.match(status);

woodie.react(pattern);

debugger