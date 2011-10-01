///<summary>
/// A function to load the index page of the website
///</summary>
///<param name='response'>The connection to send the response on</param>
function rootfile(response){ 
	console.log("Render root file");
	response.writeHead(200, {"Content-Type": "text\plain"});
	response.write("<html><body><h1>HEllo</h1></body></html>");
	response.end();	
}

///<summary>
/// A function to load the favicon.ico file and stream it back to the user.
///</summary>
///<param name='response'>The connection to send the response on</param>
function favicon(response){
	console.log("Render favicon");
	response.writeHead(200, {"Content-Type": "text\plain"});
	response.write("");
	response.end();	
}

///<summary>
/// A function to add a list of handlers to the global list
///</summary>
///<param name='handles'>The list of handlers that have currently been loaded</param>
function addHandlersToList(handles){
	// add a handler that if a user request the domain (plus port) that we execute the rootfile function
	handles["/"] = rootfile;
	// add a handler that if a web browser requests the favicon.ico file 
	handles["/favicon.ico"] = favicon;
}

// export these functions
exports.rootfile = rootfile;
exports.favicon = favicon;
exports.addHandlersToList = addHandlersToList;