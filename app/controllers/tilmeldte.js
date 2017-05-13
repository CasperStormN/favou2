// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Collections.instance("NodesTilmeldte");
Alloy.Collections.instance("NodesTilmeldte").fetch();

function transform(model) {
	//convert the model to a JSON object
	var nodeObject = model.toJSON();
	var output = {
		"title" : nodeObject.title,
		"id" : nodeObject.nid,
		"cid" : model.cid,
		"dato": nodeObject.dato,
		"author": nodeObject.author_realname,
		"author_image": nodeObject.author_image,
		"address": nodeObject.adresse
	};
	
	var dato = moment(output.dato);
	output.dato = dato.format("DD.MM.YY");
		
	return output;
}

var buttonSwiped = 0;

function showDelete() {
	if(buttonSwiped == 0) {
		$.deletebtn.animate({
			right:0,
			duration:250
		});
		buttonSwiped++;
	} else {
		$.deletebtn.animate({
			right:"-30%",
			duration:250
		});
		buttonSwiped--;
	}
}

$.table.addEventListener('click', function(_event) {
	//get the correct approach
	//
	// The properties synch adapter that is provided by appcelerator does not set the model.id so get
	// will never work. See the appcelerator documentation on Backbone Sync Adapters
	var model = Alloy.Collections.Nodes.getByCid(_event.rowData.modelId);
	
	Alloy.Globals.id = _event.rowData.nodeId;

	var url = "http://drupal.casper-storm.dk/node/" + Alloy.Globals.id + "?_format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
		onload : function(e) {
			var response = JSON.parse(this.responseText);
			response = {"title": response.title[0].value, 
			"dato": response.field_dato[0].value, 
			"kategori": response.field_kategori[0].value, 
			"adresse": response.field_adresse[0].value,
			"person": response.field_person_behov[0].value,
			"beskrivelse": response.field_beskrivelse_af_opgave[0].value,
			"author_realname": response.field_user_realname[0].value,
			"author_image": response.field_user_image[0].value };
			//alert(response);
			
			//create the controller and pass the model to it
			var detailController = Alloy.createController("opgavedetaljer", {
				data : response
			}).getView();
			
			//get view returns to root view when no view ID is provided
			detailController.open();
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
	

});