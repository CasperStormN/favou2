// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if(Alloy.Globals.User.kategori) {
	var kat = Alloy.Globals.User.kategori.split(", ");
} else {
	var kat = [];
}

if(kat.indexOf('Musik') > -1) {
	$.Musik.setValue(true);
}

if (kat.indexOf('Dyr') > -1) {
	$.Dyr.setValue(true);
} 

if (kat.indexOf('Madlavning') > -1) {
	$.Madlavning.setValue(true);
}

if (kat.indexOf('Kunst') > -1) {
	$.Kunst.setValue(true);
}

if (kat.indexOf('Håndarbejde') > -1) {
	$.Håndarbejde.setValue(true);
}

if (kat.indexOf('Havearbejde') > -1) {
	$.Havearbejde.setValue(true);
}

if (kat.indexOf('Mekanik') > -1) {
	$.Mekanik.setValue(true);
}

if (kat.indexOf('Sport') > -1) {
	$.Sport.setValue(true);
}

if (kat.indexOf('Underholdning') > -1) {
	$.Underholdning.setValue(true);
}

if (kat.indexOf('Socialt arbejde') > -1) {
	$.Socialtarbejde.setValue(true);
}

if (kat.indexOf('Natur') > -1) {
	$.Natur.setValue(true);
}

if (kat.indexOf('Mode') > -1) {
	$.Mode.setValue(true);
}

function updateCat (e) {
	var id = e.source.id;
	var status = e.source.value;
	
	if(status) {
		if(id == 'Socialtarbejde') {
			id = 'Socialt arbejde';
		} else {}
		kat.push(id);
		addCat(kat);
	} else {
		if(id == 'Socialtarbejde') {
			id = 'Socialt arbejde';
		} else {}
		var index = kat.indexOf(id);
		if (index > -1) {
		    kat.splice(index, 1);
		}
		addCat(kat);
	}
}

function updateGlobal() {
	 var url = "http://drupal.casper-storm.dk/rest/views/users/" + Alloy.Globals.User.fbid;
	 var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	 var ud = JSON.parse(this.responseText);
	     	 ud = ud[0];
	         Ti.API.info("Received text: " + ud);
	         
	         // Calc age
	         var bd = moment(ud.birthday);
			 var age = bd.format('YYYY-MM-DD');
			 var ye = moment().diff(age, 'years');
			 ye = ye + ' år';
			 
			 var kr = ud.kategori;
			 kr = kr.replace(/, /g, "+");
			 kr = kr.replace(' ', '');
			 
	         var userdata = {"uid":ud.uid, "kat": kr, "age": ye, "fbid": ud.name, "name": ud.realname, "birthday": ud.birthday, "picture": ud.picture, "email": ud.email, "kategori": ud.kategori, "location": ud.location};
	         Alloy.Globals.User = userdata;
	         Alloy.Globals.kategori = kr;             
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

function addCat(cat) {
	var data;
	var url = "http://drupal.casper-storm.dk/user/" + Alloy.Globals.User.uid + "?_format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
		onload : function(e) {
			updateGlobal();
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

	data = {
			"field_kategori": cat
	};

	 // Send the request.
	 client.send(JSON.stringify(data));
}
