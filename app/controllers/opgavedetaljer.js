//this is how we accept arguments passed to the controller (usually from another controller)
var args = arguments[0] || {};

//instance variable use in data binding to the model
//we do this here to trigger the events
//that will cause the data to be rendered

$.Nodes.set(args.data);

var  dato = moment($.dato.text);
dato = dato.format("DD.MM.YY");
$.dato.text = dato;

var tilmeldte;
var tilmeldteuid = [];

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
	if(t) {
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
					tilmeldteuid.push(response.uid);
					//alert(response.uid);
					/*var image = Ti.UI.createImageView({
					  	left: "20dp",
						bottom: "10dp",
						width: "80",
					    height: "80",
					    borderRadius: "40",
					    image: response.picture
					});
					$.deltagerene.add(image);*/
					
					setImage(response.picture);
					
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
	} else {

	};
}

function setImage(img) {
	var image = Ti.UI.createImageView({
	  	left: "20dp",
		bottom: "10dp",
		width: "70dp",
	    height: "70dp",
	    borderRadius: "40",
	    image: img
	});
	$.deltagerene.add(image);
}

function tilmeldOpgave() {
	//alert(JSON.stringify(tilmeldteuid));
	var data;
	var url = "http://drupal.casper-storm.dk/node/" + Alloy.Globals.id + "?_format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
		onload : function(e) {
			Alloy.Collections.instance("Nodes");
			Alloy.Collections.instance("Nodes").fetch();
			alert('Du er nu tilmeldt opgaven');
			getImages(Alloy.Globals.User.fbid);
			Alloy.Collections.instance("NodesTilmeldte");
			Alloy.Collections.instance("NodesTilmeldte").fetch();
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('General Error: ' + e.error + '. Error message: ' + this.responseText);
		},
		timeout : 5000  // in milliseconds
	 });
	 
	  // Prepare the connection.
	 client.open("PATCH", url);
	 
	 client.setRequestHeader('Content-Type','application/json');
	 
		if(tilmeldteuid.length){
		
			// Tjekker om den nuværende bruger er tilmeldt opgaven		
			if(tilmeldteuid.indexOf(Alloy.Globals.User.uid) > -1) {
				//alert('Er tilmeldt');
				alert('Du er allerede tilmeldt denne opgave!');
				return;
				
			} else {
				//alert('Ikke tilmeldt');
				tilmeldteuid.push(Alloy.Globals.User.uid);
				
				data = {
					"type": [{
						"target_id": "favour"
					}],
					"field_users": tilmeldteuid
				};
			};
		} else {
			//alert('Tom');
			
			data = {
				"type": [{
					"target_id": "favour"
				}],
				"field_users": Alloy.Globals.User.uid
			};
		};

	 // Send the request.
	 client.send(JSON.stringify(data));
}

