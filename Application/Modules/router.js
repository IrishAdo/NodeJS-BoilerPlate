///<summary>
///route all requests via one of the handlers
///</summary>
///<param name="handlers">the global list of handlers</param>
///<param name="PathName">the path sent to the server</param>
///<param name="response">the response object ot return the page request on</param>
///<param name="RaiseError">the Raise error function</param>
function route(handlers, PathName,response, RaiseError){
	console.log("request to process " + PathName);
	// we are going to use the first part of the path as the module name of the handler
	// to get here the handler will exist and have been loaded
	var module = PathName.split("/")[1];
	console.log("module : "+ module)
	
	// if the handler is a wildcard handler ie /module/* then call that function
	if (typeof handlers[module]["/" + module + "/*"] === 'function') {
		handlers[module]["/" + module + "/*"](PathName, response);
	
	//  if the handler is not a wildcard ie /module/view then execute the function 
	} else if (typeof handlers[module][PathName] === 'function'){
		handlers[module][PathName](PathName, response);
	
	// if we are here then the handler does not have a match to execute it raise an error
	} else {
		RaiseError(404,response);
	}
}
//export the route as a function of the router object
exports.route = route;