$.login.open();
var fb = Alloy.Globals.Facebook;

fb.addEventListener('login', function(e) {
    if (e.success == true) {
        alert('login from uid: '+e.uid+', name: '+ JSON.parse(e.data).name);
		toOpdag();
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

