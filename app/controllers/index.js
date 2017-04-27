$.login.open();
var fb = Alloy.Globals.Facebook;
fb.addEventListener('login', function(e) {
    if (e.success == true) {
    	/* Gets the permissions - good to check if the permissions is right
    	var permis = fb.getPermissions();
    	permis = JSON.stringify(permis);
    	alert(permis);
    	*/
    	/*fb.requestNewReadPermissions(['public_profile', 'email', 'user_birthday', 'user_location'], function(e) {
    		if (e.success) {

    		}
    	});*/
    	fb.requestWithGraphPath('me', {fields: 'id, name, email, location, picture, birthday'}, 'GET', function(e) {
        if (e.success) {                 
            Ti.API.log('arrow.js : getFBEvents - result ' + e.result);
            r = e.result;
            alert('ID: ' + JSON.parse(r).id + ' Name: ' + JSON.parse(r).name + ' Email: ' + JSON.parse(r).email + ' Location: ' + JSON.parse(r).location.name + ' The rest: ' + r);
        } else {
        	Ti.API.log('Failed');
        }
		});
    	
		var newUser = Alloy.createModel('PostUser');
		var params = {
			"name":
				{
					"value": e.uid
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
		  	"value": JSON.parse(e.data).name
		  },
		  "status": "1"
		};
		
		newUser.save(params, {
			success: function(model, response) {
				alert('login from uid: '+e.uid+', name: '+ JSON.parse(e.data).name);
				//toOpdag();
			},
			error: function(err, response) {
				err = JSON.stringify(err);
				response = JSON.stringify(response.message);
				id = JSON.stringify(e.uid);
				name = JSON.parse(e.data).name;
				
				if(response = "User already exists") {
					//toOpdag();
					Alloy.Globals.user = {"id":id, "name": name};
					//alert("Fejl i oprettelse. Response: " + response + ' UID: ' + id);
				} else {
					alert("Test. Response: " + response + ' UID: ' + id);
				}
				
				
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

fb.addEventListener('logout', function(e) {
    alert('Logged out');
});

if (Ti.Platform.name === 'android') {
    $.login.fbProxy = fb.createActivityWorker({lifecycleContainer: $.login});
}

function toOpdag() {
	Alloy.Collections.instance("Nodes");
	Alloy.Collections.instance("Nodes").fetch();
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
