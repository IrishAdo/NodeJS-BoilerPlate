/**
 * This Script represents the Server Module
 */

// A global handler variable
var handles     = new Array();

// Load required core modules
var http        = require("http");
var url         = require("url");

// load my modules
var router      = require("./router");

// load the default file handler for the server and add its handlers to the list
var filehandler = require("./handlers/filehandler");
filehandler.addHandlersToList(handles);

function start(OverRideConfiguration){
	
	// default configuration object
	var configuration = {
		port : 8080
		
	};
	
	//  allow the start.js file to overwrite the port to listen on.
	if (OverRideConfiguration.port){ 
		configuration.port = OverRideConfiguration.port
	}
	
	///<summary>
	///The function that gets executed at the start of every request
	///</summary>
	///<param name='request'>The request object that is submitted to the server</param>
	///<param name='response'>The connection to send the response on</param>
	function onRequest (request,response){
		// get the path from the url 
		var pathname = url.parse(request.url).pathname;
		console.log("path is " + pathname);
		
		// check if a handler has already been loaded for this request.
		if(typeof handles[pathname] !== 'function'){
			// if we have not already loaded the handler object.
			FindHandler(router,handles,pathname,response);
		} else {
			// ok just route the request to the handler
			router.route(handles, pathname, response, RaiseError);
		}
	}
	
	
	///<summary>
	///a Function to route requests to a specific function based on handling routes
	///</summary>
	///<param name='router'></param>
	///<param name='handles'></param>
	///<param name='pathInfo'></param>
	///<param name='response'>The connection to send the response on</param>
	function FindHandler (router,handles,pathInfo,response) {
	  var foundHandler = false;
	  var parts = pathInfo.split("/");
	  if(parts[1]=="ado"){
	  	var ado = require("./handlers/ado");
	  	ado.addHandlersToList(handles);
	  	foundHandler = true;
	  }
	  // if we have found the handler then route the request otherwise raise an error.
	  if(foundHandler){
	  	router.route(handles, pathInfo, response, RaiseError);
	  } else {
	  	RaiseError(404,response);
	  }
	}
	
	///<summary>
	/// A function to load a standard Error Page
	///</summary>
	///<param name='code'>404, 401, 500, 501, ...</param>
	///<param name='response'>The connection to send the response on</param>
	function RaiseError(code,response){
		var buffer ="";
		if (code==404){
			buffer = "404 - Page not found.";
		}
		response.writeHead(code, {"Content-Type": "text\plain"});
		response.write(buffer);
		response.end();
	}
	
	// actually create the server and pass the onRequest function to the new server
	// then tell the http object to listen for information on a specific port.
	http.createServer(onRequest).listen(configuration.port);
	console.log("Server started on " + configuration.port);	
}
// when building the server object add a start method which is the startfunction above.
exports.start = start;
