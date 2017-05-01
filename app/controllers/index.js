// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Collections.instance("Nodes");
Alloy.Collections.instance("Nodes").fetch();
Alloy.Collections.instance("Users");
Alloy.Collections.instance("Users").fetch();
	
var page = Alloy.createController('login').getView();
page.open();