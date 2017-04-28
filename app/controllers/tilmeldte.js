// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var buttonSwiped = 0;

//$.deletebtn.show();

function showdelete(){
	$.deletebtn.hide();
}

/*
function showDelete(){
	if (buttonSwiped == 0)
	{
		$.deletinator.animate({
			right: 0,
			duration: 250,
		});
		buttonSwiped++;
	} else {
		$.deletinator.animate({
			right: "-30%",
			duration: 250,
		});
		buttonSwiped--;
	}
}
*/