
function route(handlers, PathName,response, RaiseError){
	console.log("request to process " + PathName);
	
	if (typeof handlers[PathName] === 'function'){
		handlers[PathName](response);
	} else {
		RaiseError(404,response);
	}
}

exports.route = route;