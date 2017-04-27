// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//this is how we accept arguments passed to the controller (usually from another controller)
var args = arguments[0] || {};

alert(Alloy.Globals.user);

function report(e) {
    Ti.API.info('User selected: ' + e.value);
}

function show_date_picker() {
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:new Date(),
		maxDate:new Date(2019,11,31),
		value:new Date()
	});

	picker.showDatePickerDialog({
		callback: function(e) {
			if (e.cancel) {
			Ti.API.info('User canceled dialog');
			} else {
				Ti.API.info('User selected date: ' + e.value);
				var day = moment(e.value);
				$.date_label.text = day.format('YYYY-MM-DD');
			}
		}
	});
}

function category_selected(e) {
	$.category_label.text = e.row.title;
}

/*$.categories.hide();

var shown = false;

function show_categories() {
	if(shown == false) {
	$.categories.show();
	$.categories.height = "125dp";
	$.categories.top = "25dp";
	shown = true;
	}
	else {
		$.categories.hide();
		$.categories.height = "0";
		$.categories.top = "0";
		shown = false;
	}	
}
*/
$.createNode.addEventListener("click", function() {
	var newNode = Alloy.createModel('PostNode');
	
	// Removes the space in category
	var cat = $.category_label.text;
	JSON.stringify(cat);
	cat = cat.replace(" ", "");
	
	// Check if a  time is set. If not, default is 12:00
	var time = $.postTidspunkt.value;
	if(!!time) {
		
	} else {
		time = '12:00';
	}
	
	var params = {
	  "type": [
	    {	
	      "target_id": "favour"
	    }
	  ],
	  "title": [
	    {
	      "value": $.postTitle.value
	    }
	  ], 
	  "field_adresse": [
	    {
	      "value": $.postAdresse.value
	    }
	  ],
	  "field_beskrivelse_af_opgave": [
	    {
	      "value": $.postBeskrivelse.value
	    }
	  ],
	  "field_time": [
	    {
	      "value": time
	    }
	  ],
	  "field_dato": [
	    {
	      "value": $.date_label.text
	    }
	  ],
	  "field_kategori": [
	    {
	      "value": cat
	    }
	  ],
	  "uid": [
	    {
	      "target_id": "1"
	    }
	  ],
	  "field_person_behov": [
	    {
	      "value": $.postPerson.value
	    }
	  ]  		
	};
	
	newNode.save(params, {
		success: function(model, response) {alert("Opgaven er oprettet");},
		error: function(err) {alert("Fejl i oprettelse");}
	});
	
});
