// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var buttonSwiped = 0;

function ladida() {
	alert('bob');
	if(buttonSwiped == 0) {
		$.deletebtn.animate({
			right:0,
			duration:250
		});
		buttonSwiped++;
	} else {
		$.deletebtn.animate({
			right:"-30%",
			duration:250
		});
		buttonSwiped--;
	}
}

/*
var deletebtn = Titanium.UI.createButton({
   borderRadius:10,
   backgroundColor:'red',
   width:"50dp",
   height:"100%",
   right:"-50dp",
});
$.johnjohn.add(deletebtn);


function showdelete(direction){
		//deletebtn.setHeight("50%");
		deletebtn.right = 0;
		alert(direction);
}

*/
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