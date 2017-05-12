//this is how we accept arguments passed to the controller (usually from another controller)
var args = arguments[0] || {};

//instance variable use in data binding to the model
//we do this here to trigger the events
//that will cause the data to be rendered

alert(args.data);

$.Nodes.set(args.data);

var  dato = moment($.dato.text);
dato = dato.format("DD.MM.YY");
$.dato.text = dato;

var tilmeldte;

var url = "http://drupal.casper-storm.dk/rest/views/favours/" + Alloy.Globals.id;
var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
	onload : function(e) {
		var response = JSON.parse(this.responseText);
		response = response[0];
		tilmeldte = response.tilmeldte;   

		getImages(tilmeldte);
	},
	// function called when an error occurs, including a timeout
	onerror : function(e) {
		Ti.API.debug(e.error);
		alert('error' + e.error);
	},
	timeout : 5000  // in milliseconds
 });
 
 // Prepare the connection.
 client.open("GET", url);
 
 // Send the request.
 client.send();

function getImages(t) {
	var tilmeldte = t.split(",");
	
	var til = JSON.stringify(tilmeldte);
	var arrayLength = tilmeldte.length;
	//alert(til + arrayLength);
	for (var i = 0; i < arrayLength; i++) {
		tilmeldte[i] = tilmeldte[i].replace(/ /g,'');
		//alert(tilmeldte[i]);
		var url = "http://drupal.casper-storm.dk/rest/views/users/" + tilmeldte[i];
		var client = Ti.Network.createHTTPClient({
		    // function called when the response data is available
			onload : function(e) {
				var response = JSON.parse(this.responseText);
				response = response[0];
				//alert(response.picture);
				var image = Ti.UI.createImageView({
				  	left: "20dp",
					bottom: "10dp",
					width: "80",
				    height: "80",
				    borderRadius: "40",
				    image: response.picture
				});
				$.deltagerene.add(image);
				//$.deltager_pic.setImage(response.picture);
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('error' + e.error);
			},
			timeout : 5000  // in milliseconds
		 });
		 
		  // Prepare the connection.
		 client.open("GET", url);
		 
		 // Send the request.
		 client.send();
	}
	

}

