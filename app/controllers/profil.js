// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var kat = Alloy.Globals.User.kategori.split(", ");

if(kat.indexOf('Musik') > -1) {
	$.musik.setValue(true);
}

if (kat.indexOf('Dyr') > -1) {
	$.dyr.setValue(true);
} 

if (kat.indexOf('Madlavning') > -1) {
	$.madlavning.setValue(true);
}

if (kat.indexOf('Kunst') > -1) {
	$.kunst.setValue(true);
}

if (kat.indexOf('Håndarbejde') > -1) {
	$.håndarbejde.setValue(true);
}

if (kat.indexOf('Havearbejde') > -1) {
	$.havearbejde.setValue(true);
}

if (kat.indexOf('Mekanik') > -1) {
	$.mekanik.setValue(true);
}

if (kat.indexOf('Sport') > -1) {
	$.sport.setValue(true);
}

if (kat.indexOf('Underholdning') > -1) {
	$.underholdning.setValue(true);
}

if (kat.indexOf('Socialt arbejde') > -1) {
	$.socialtarbejde.setValue(true);
}

if (kat.indexOf('Natur') > -1) {
	$.natur.setValue(true);
}

if (kat.indexOf('Mode') > -1) {
	$.mode.setValue(true);
}

$.dyr.addEventListener('click', function(e) {
	if($.dyr.value) {
		alert('true');
	} else {
		alert('false');
	}
});


