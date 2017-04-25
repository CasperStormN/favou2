$.login.open();
var fb = Alloy.Globals.Facebook;

fb.addEventListener('login', function(e) {
    if (e.success == true) {
    	
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
				toOpdag();
			},
			error: function(err, response) {
				err = JSON.stringify(err);
				response = JSON.stringify(response);
				
				alert("Fejl i oprettelse " + err + response.message);

				/*for(i = 0; i < err.length; i++){
					Ti.API.error('Error is here!!!!!');
					Ti.API.error(err);
				}*/
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
