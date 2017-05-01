// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.Facebook = require('facebook');
Alloy.Globals.Facebook.permissions = ['public_profile', 'email', 'user_birthday', 'user_location'];
Alloy.Globals.Facebook.initialize();
Alloy.Globals.Facebook.authorize();

Alloy.Collections.instance("Users");

Alloy.Globals.User;

var OldWin;

var moment = require('alloy/moment');
require('alloy/moment/lang/da');

function toOpdag() {
	oldWin();
	var page = Alloy.createController('opdag').getView();
	OldWin = page;
	page.open();
}

function oldWin() {
	if(OldWin) {
		OldWin.close();
	}
}

function toIndstillinger() {
	oldWin();
	var page = Alloy.createController('indstillinger').getView();
	OldWin = page;
	page.open();
}

function toGruppechat() {
	oldWin();
	var page = Alloy.createController('gruppechat').getView();
	OldWin = page;
	page.open();
}

function toOpret() {
	oldWin();
	var page = Alloy.createController('opret').getView();
	OldWin = page;
	page.open();
}

function toOpgavedetaljer() {
	oldWin();
	var page = Alloy.createController('opgavedetaljer').getView();
	OldWin = page;
	page.open();
}
function toProfil() {
	oldWin();
	var page = Alloy.createController('profil').getView();
	OldWin = page;
	page.open();
}
function toTilmeldte() {
	oldWin();
	var page = Alloy.createController('tilmeldte').getView();
	OldWin = page;
	page.open();
}

/*
var lib = require('routing');
lib.toOpdag();
lib.toIndstillinger();
lib.toGruppechat();
lib.toOpret();
lib.toOpgavedetaljer();
lib.toProfil();
lib.toTilmeldte();
*/