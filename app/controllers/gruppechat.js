// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
var data = args[0] || [];
 
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
 
var myTemplate = {
    childTemplates: [
        {                          
            type: 'Ti.UI.ImageView',
            bindId: 'pic',          
            properties: {            
                width: '50dp', height: '50dp', borderRadius: 100, borderWidth: 1, borderColor: "#59D3CA"
            }
        },
        {                            
            type: 'Ti.UI.View',    
            bindId: 'view',          
            properties: {            
                backgroundColor: "white", width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderRadius: 8, borderWidth: 1, borderColor: "#aeaeae"
            },
        childTemplates: [
            {                            
                type: 'Ti.UI.Label',    
                bindId: 'right',        
                properties: {            
                    color: 'black',
                    font: { fontFamily:'Arial', fontSize: '12dp' },
                    top: 10, left: 10, right: 10, bottom: 10
                   
                }
            },
            {                          
                type: 'Ti.UI.Label',    
                bindId: 'left',          
                properties: {            
                    color: 'black',
                    font: { fontFamily:'Arial', fontSize: '12dp' },
                    top: 10, left: 10, right: 10, bottom: 10
                 
                }
             }
        ]
       	}
    ]
};
 
 
 
var listView = Ti.UI.createListView({
    templates: { 'template': myTemplate },
    defaultItemTemplate: 'template',
    backgroundColor: "#192935",
    separatorColor: "#192935",
    separatorHeight: "10dp",
    width: "85%"
});
 
WS.addEventListener('message', function (ev) {
    var msg = JSON.stringify(ev);
    Ti.API.log(msg);
    var chatSection = Ti.UI.createListSection({height: Ti.UI.SIZE});
    var chatDataSet = [
        { pic: {image: '/images/profile_pic1.png', left: 0}, left: {text: ev.data}, view: {left: '75dp'}}
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
    var chatSection = Ti.UI.createListSection();
    var chatDataSet = [
    { right: {text: message}, pic: {image: '/images/profile_pic1.png', right: 0}, view: {right: '75dp'}}
    ];
   
    chatSection.setItems(chatDataSet);
    listView.appendSection(chatSection);
});

$.scrollChat.add(listView);

