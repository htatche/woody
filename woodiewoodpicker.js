var WoodyWoodPeecker = function() {};

WoodyWoodPeecker.prototype.Forest 		= [];
WoodyWoodPeecker.prototype.Beaks 			= {};

WoodyWoodPeecker.prototype.addToForest = function(woodpeecker) {
	var parent = this;

	woodpeecker.patterns.forEach(function(pattern) {
		pattern.parent = woodpeecker.name;
		parent.Forest.push(pattern);
	});
}

WoodyWoodPeecker.prototype.add = function(woodpeecker) {
	var parent = this;

	parent.Beaks[woodpeecker.name] = woodpeecker;
	parent.addToForest(woodpeecker);
}

WoodyWoodPeecker.prototype.match = function(str) {
	var parent = this;

	var matches = parent.Forest.filter(function(pattern) {
		return str.match(pattern.regxp);
	});

	return matches[0];
}

WoodyWoodPeecker.prototype.react = function(pattern) {
	var parent = this;

	var result = parent.Beaks[pattern.parent][pattern.action]();

	if (pattern.outcome) {
		return result;
	}
}

module.exports = WoodyWoodPeecker;