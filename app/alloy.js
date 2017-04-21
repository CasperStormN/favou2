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
Alloy.Globals.Facebook.permissions = ['public_profile', 'email', 'user_birthday', 'user_location', 'picture'];
Alloy.Globals.Facebook.initialize();
Alloy.Globals.Facebook.authorize();

var moment = require('alloy/moment');
require('alloy/moment/lang/da');

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