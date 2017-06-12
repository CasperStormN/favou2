// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Collections.instance("Nodes");
Alloy.Collections.instance("Nodes").fetch();

var mapmini = false;

$.opdagscroll.addEventListener('scroll', function(e){
	if(mapmini == false) {
		mapmini = true;
		$.canvas.animate({
			height: "25%",
			duration:200
		});	
	}
	
});

$.opdagscroll.addEventListener('swipe', function(e){
	if(e.direction == 'down' && mapmini == true){
		mapmini = false;
		$.canvas.animate({
			height: "40%",
			duration:200
		});
	}
});

setTimeout(function()
{
	//$.opdagscroll.scrollsTo(0, 0);
}, 300);

function transform(model) {
	//convert the model to a JSON object
	var nodeObject = model.toJSON();
	var output = {
		"title" : nodeObject.title,
		"id" : nodeObject.nid,
		"cid" : model.cid,
		"dato": nodeObject.dato,
		"author": nodeObject.author_realname,
		"author_image": nodeObject.author_image,
		"address": nodeObject.adresse
	};
	
	var dato = moment(output.dato);
	output.dato = dato.format("DD.MM.YY");

	var address = output.address;
	var title = output.title;
	
	Ti.Geolocation.forwardGeocoder(JSON.stringify(address), function(address) {
		var thelat = address.latitude;
		var thelong = address.longitude;
		addAnnotation(thelat, thelong, title, address);
	});
	
	return output;
}

$.table.addEventListener('click', function(_event) {
	var model = Alloy.Collections.Nodes.getByCid(_event.rowData.modelId);
		
	Alloy.Globals.id = _event.rowData.nodeId;
	
	//create the controller and pass the model to it
	var detailController = Alloy.createController("opgavedetaljer", {
		data : model
	}).getView();
	
	//get view returns to root view when no view ID is provided
	detailController.open();
});


function addAnnotation(thelat, thelong, title, address) {
  'use strict';
	
  var annotation = map.createAnnotation({
    title: title,
    latitude: thelat,
    longitude: thelong,
    draggable: false
  });

  $.map.addAnnotations([annotation]);
}

var map = require('ti.map');
var permissions = require('permissions');

// List of map types to traverse, and our initial index
var mapTypes = [map.NORMAL_TYPE, map.SATELLITE_TYPE, map.HYBRID_TYPE];
var mapType = 0;

// Android has a fourth map type. We use conditional code, which Alloy automatically
// strips as dead code when it builds for other platforms.
if (OS_ANDROID) {
  mapTypes.push(map.TERRAIN_TYPE);
}

/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function(args) {
  'use strict';
  $.opdag.open();

})(arguments[0] || {});

/**
 * Bound to the Window's open event via XML.
 * Gets our current position and then continues the same process as when you
 * longpress somewhere on the map, which is reverseGeocode().
 */

function setAnnotation(location) {
  'use strict';
  
  var annotation = map.createAnnotation({
    latitude: location.latitude,
    longitude: location.longitude,
    draggable: false
  });
  
  // replace previous annotation
  $.map.setAnnotations([annotation]);
}

function showCurrentPosition() {
  'use strict';

  // Use library to handle run-time permissions
  permissions.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {

    if (!e.success) {

      // In some cases the library will already have displayed a dialog, in other cases we receive a message to alert
      if (e.error) {
        alert(e.error);
      }

      return;
    }

    // Get our current position
    Ti.Geolocation.getCurrentPosition(function(e) {

      // FIXME: https://jira.appcelerator.org/browse/TIMOB-19071
      if (!e.success || e.error) {
        return alert(e.error || 'Could not find your position.');
      }

      // Continue the same process as when the user longpresses on the map,
      // passing `true` to let it center the map
      reverseGeocode(e.coords, true);
    });

  });
}

/**
 * Receives a position, reverse geocodes it and then calls setAnnotation()
 * @param  {Object}  coords            Event or other object that has:
 * @param  {Float}   coords.latitude   Latitude
 * @param  {Float}   coords.longitude  Longitude
 * @param  {boolean} center            Set to true to center the map on the position
 */
function reverseGeocode(coords, center) {
  'use strict';

  // Don't re-use coords since reverseGeocode() is also a callback for two
  // events in the view, which has other properties as well that we don't need.
  var location = {
    latitude: coords.latitude,
    longitude: coords.longitude
  };

  // Reverse geocode the position
  Ti.Geolocation.reverseGeocoder(location.latitude, location.longitude, function(e) {

    if (!e.success || e.error) {
      return alert(e.error || 'Could not reverse geocode the position.');
    }

    // Use the address of the first place found for the title
    location.title = e.places[0].address;

    // Drop or move the annotation
    setAnnotation(location);

    // center the map on the annotation
    if (center) {
      centerMap(location);
    }
  });
}



/**
 * Callback bound to the button overlay to switch map types.
 */
function changeMapType() {

  // Increment our mapType index or move back to 0 if we reached the end
  mapType = (mapType === mapTypes.length - 1) ? 0 : mapType + 1;

  // Set it
  $.map.mapType = mapTypes[mapType];
}

/**
 * Center the map on a location.
 */
function centerMap(location) {
  $.map.region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 7,
    longitudeDelta: 7
  };
}
