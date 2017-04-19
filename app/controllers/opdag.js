// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function transform(model) {
	//convert the model to a JSON object
	var nodeObject = model.toJSON();
	var output = {
		"title" : nodeObject.title,
		"id" : nodeObject.nid,
		"cid" : model.cid,
		"dato": nodeObject.dato,
		"author": nodeObject.author,
	};
	
	var dato = moment(output.dato);
	output.dato = dato.format("DD.MM.YY");

	console.log(output);
	return output;
}