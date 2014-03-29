var Woody         = require("./src/woodie.js");
var bitcoin_beak  = require("./beaks/bitcoin.beak.js");

var woodie = new Woody();
woodie.add(bitcoin_beak);

var auth_params = {
	consumer_key:         			"48APF9VXEOVWqCrMT8Uxw",
	consumer_secret_key:  			"USHQTBSGLqHCcSiRSTyPjNY03Ihis35VrD0trXlLHE",  
	access_token:          			"2322506394-13iittX2Cy7kH8R6wyM12v1DmbDcVg1d4gM7iqn",
	secret_access_token:  			"aOdMwNhMs2n0J2GxOipvMg1af85CvflfG3IgOIxgsqdp8"
}

woodie.authenticate(auth_params).listen();