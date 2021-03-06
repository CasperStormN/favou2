
var fb = Alloy.Globals.Facebook;
fb.requestWithGraphPath('me', {fields: 'id'}, 'GET', function(e) {
	if (e.success) {
		var r = e.result;
		r = JSON.parse(r);
		getUserData(r.id);
	} else {
		
	}
});

$.login.open();
fb.addEventListener('login', function(e) {
    if (e.success == true) {
    	fb.requestNewReadPermissions(['public_profile', 'email', 'user_birthday', 'user_location'], function(e) {
    		if (e.success) {
				fb.requestWithGraphPath('me', {fields: 'id, name, email, location, picture.type(large), birthday'}, 'GET', function(e) {
		        if (e.success) {
		            var r = e.result;
		            r = JSON.parse(r);
		            var loca = r.location.name;
		            loca = loca.replace(/,[^,]+$/, "");
		            
		            var age = moment(r.birthday);
		            
					var bd = age.format('YYYY-MM-DD');
		            
		            var newUser = Alloy.createModel('PostUser');
					var params = {
					"name":
					{
						"value": r.id
					},
					"pass":"password",
					"field_kategori": [
				    {
					  "value": "Musik"
					},
					{
					  "value": "Dyr"
					},
					{
					  "value": "Madlavning"
					},
					{
					  "value": "Kunst"
					},
					{
					  "value": "Håndarbejde"
					},
					{
					  "value": "Havearbejde"
					},
					{
					  "value": "Mekanik"
					},
					{
					  "value": "Sport"
					},
					{
					  "value": "Underholdning"
					},
					{
					  "value": "Socialt arbejde"
					},
					{
					  "value": "Natur"
					},
					{
					  "value": "Mode"
					}
					],
					"field_name": {
					"value": r.name
					},
					"status": "1",
					"field_birthday": r.birthday,
					"field_email": r.email,
					"field_location": loca,
					"field_picture": r.picture.data.url
					};
					
					newUser.save(params, {
						success: function(model, response) {
							
							getUserData(r.id);
						},
						error: function(err, response) {
							// Used to debug the error
							/* err = JSON.stringify(err);
							response = JSON.stringify(response);
							id = JSON.stringify(e.uid);
							name = JSON.parse(e.data).name;*/
							
							if(response = "User already exists") {
								
								getUserData(r.id); 
								
							} else {
								alert("Fejl i oprettelse. Response: " + response);
							}
						}
					});
		        } else {
		        	Ti.API.log('Failed');
		        }
				});
    		}
    	});
    	
    }
    else if (e.cancelled) {
        // user cancelled
        alert('cancelled');
    }
    else {
        alert(e.error);
    }
});

function getUserData(id) {
	 // Titanium's way of XHR/AJAX request
	 var url = "http://drupal.casper-storm.dk/rest/views/users/" + id;
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
	         //alert(userdata);
	         Alloy.Globals.User = userdata;
	         Alloy.Globals.kategori = kr;

			Alloy.Collections.instance("NodesTilmeldte");
			Alloy.Collections.instance("NodesTilmeldte").fetch();
			Alloy.Collections.instance("Users");
			Alloy.Collections.instance("Users").fetch();
			Alloy.Collections.instance("Nodes");
			Alloy.Collections.instance("Nodes").fetch({
				success: function() {
					toOpdag();
				}
			});
	                  
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

fb.addEventListener('logout', function(e) {
    alert('Logged out');
});

if (Ti.Platform.name === 'android') {
    $.login.fbProxy = fb.createActivityWorker({lifecycleContainer: $.login});
}

function toOpdag() {
	var page = Alloy.createController('opdag').getView();
	page.open();
}

function toIndstillinger() {
	var page = Alloy.createController('indstillinger').getView();
	page.open();
}

function toGruppechat() {
	var page = Alloy.createController('gruppechat').getView();
	page.open();
}

function toOpret() {
	var page = Alloy.createController('opret').getView();
	page.open();
}

function toOpgavedetaljer() {
	var page = Alloy.createController('opgavedetaljer').getView();
	page.open();
}
function toProfil() {
	var page = Alloy.createController('profil').getView();
	page.open();
}
function toTilmeldte() {
	var page = Alloy.createController('tilmeldte').getView();
	page.open();
}
