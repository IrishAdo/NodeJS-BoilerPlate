///<summary>
/// A function to return a file in the Resources directory requests
///</summary>
///<param name='pathname'>The request path to process</param>
///<param name='response'>The connection to send the response on</param>
function getFile(pathname, response){ 
	console.log("Executing getFile('"+pathname+"')");
	response.writeHead(200, {"Content-Type": "text\plain"});
	response.write("Hello and welcome " + pathname);
	response.end();	
}


///<summary>
/// A function to add a list of handlers to the global list
///</summary>
///<param name='handles'>The list of handlers that have currently been loaded</param>
function addHandlersToList(handles){
	handles["Resources"] = new Array();
	// Stream all files that are in the resources directory.
	handles["Resources"]["/Resources/*"] = getFile;
}

// export these functions
exports.getFile = getFile;
exports.addHandlersToList = addHandlersToList;