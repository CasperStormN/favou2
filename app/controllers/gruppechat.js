// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var uri = 'ws://185.134.30.46:8080'; 
var WS = require('net.iamyellow.tiws').createWS();

WS.addEventListener('open', function () {
	Ti.API.debug('websocket opened');
});

WS.addEventListener('close', function (ev) {
	var msg = JSON.stringify(ev);
	Ti.API.info(msg);
});

WS.addEventListener('error', function (ev) {
	var msg = JSON.stringify(ev);
	Ti.API.error(msg);
});

WS.addEventListener('message', function (ev) {
	var msg = JSON.stringify(ev);
	Ti.API.log(msg);
	var listView = $.listChat;
	var chatSection = Ti.UI.createListSection();
	var chatDataSet = [
	    {properties: { 
	    	title: ev.data, 
	    	backgroundColor: "white", 
	    	width: Ti.UI.SIZE, 
	    	height: Ti.UI.SIZE, 
	    	left:"50dp",
	    	top:"10dp",
	    	color: "black", 
	    	border:"1dp", 
	    	borderColor:"red", 
	    	borderRadius:"5dp"}}
	];
	chatSection.setItems(chatDataSet);
	listView.appendSection(chatSection);
});

WS.open(uri);

$.chatSend.addEventListener('click', function (ev) {
	var message = $.chatInput.getValue();
	if(message.length == 0) return;
    WS.send(message);
    $.chatInput.setValue('');
    var listView = $.listChat;
	var chatSection = Ti.UI.createListSection();
	var chatDataSet = [
	{properties: { 
	    	title: '', 
	    	backgroundImage: "/images/arrow_teal.png", 
	    	width: "30dp", 
	    	height: "30dp",
	    	top:"10dp", 
	    	right:"0"
	    	}},
	    {properties: { 
	    	title: message, 
	    	backgroundColor: "white", 
	    	width: Ti.UI.SIZE, 
	    	height:Ti.UI.SIZE, 
	    	right:"50dp",
	    	
	    	color: "black", 
	    	border:"1dp", 
	    	borderColor:"red", 
	    	borderRadius:"5dp"}}
	];
	
	chatSection.setItems(chatDataSet);
	listView.appendSection(chatSection);
});