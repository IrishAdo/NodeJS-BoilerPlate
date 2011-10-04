/**
 * This Script represents the Server Module
 */

// A global handler variable
var handles     = new Array();

// Load required core modules
var http        = require("http");
var url         = require("url");
var fs          = require("fs");
var path        = require("path");

// load my modules
var router      = require("./router");

///<summary>
///the method to start the server
///</summary>
///<param name="OverRideConfiguration">An object holding settings to overwrite the configuration</param>
function start(OverRideConfiguration){
	
	// default configuration object
	var configuration = {
		port : 8080
		
	};
	
	//  allow the start.js file to overwrite the port to listen on.
	if (OverRideConfiguration.port){ 
		console.log("Overriding the configuration Port changed from " + configuration.port + " to " + OverRideConfiguration.port);
		configuration.port = OverRideConfiguration.port;
	}
	
	///<summary>
	///The function that gets executed at the start of every request
	///</summary>
	///<param name='request'>The request object that is submitted to the server</param>
	///<param name='response'>The connection to send the response on</param>
	function onRequest (request,response){
		// get the path from the url 
		var pathname = url.parse(request.url).pathname;
		// special Cases needto handle "/" and "/favicon.ico"
		if(pathname == "/"){pathname="/Resources/index.html";}
		if(pathname == "/favicon.ico"){pathname="/Resources/favicon.ico";}
		
		// get the module name
		var module = pathname.split("/")[1];
		// check if a handler has already been loaded for this request.
		if(typeof handles[module] !== 'object'){
			// if we have not already loaded the handler object go find it.
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
		var responseObject = response;
		var module = pathInfo.split("/")[1];
		console.log("Looking for ./handlers/"+module+".js");
		
		// IMPORTANT - path.exists is from the directory location you start you application
		//             while the require function is from the location of this file. 
		path.exists("./Application/Modules/handlers/"+module+".js", function(exists) {
			if(!exists) {
				RaiseError(404,response);
				return;
			}
			console.log("Loading handler [" + module + "]");
			var loadedModule = require("./handlers/"+module);
			loadedModule.addHandlersToList(handles);
			foundHandler = true;
			router.route(handles, pathInfo, responseObject, RaiseError);
		}); 
	}
	
	///<summary>
	/// A function to load a standard Error Page
	///</summary>
	///<param name='code'>404, 401, 500, 501, ...</param>
	///<param name='response'>The connection to send the response on</param>
	function RaiseError(code,response){
		console.log("Raise a " + code + " error");
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
