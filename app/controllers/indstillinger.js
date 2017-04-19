// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.distanceslider.text = $.distanceslider.value;
function updateLabel(e){
    $.distancelabel.text = Math.round(e.value);
}
