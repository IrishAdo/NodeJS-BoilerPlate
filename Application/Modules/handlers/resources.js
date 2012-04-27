///<file>
///<licence>FreeTard Open Source</licence>
///</file>
var fs = require("fs");
///<summary>
/// A function to return a file in the Resources directory requests
///</summary>
///<param name='pathname'>The request path to process</param>
///<param name='response'>The connection to send the response on</param>
function getFile(pathname, response){ 
	console.log("Executing getFile('"+unescape(pathname)+"')");
	var extension = null;
	if (unescape(pathname).indexOf(".")>0){
		var parts = unescape(pathname).split(".");
		extension = parts[parts.length-1];
	}
	if(extension=="html" || extension=="css"){
		response.writeHead(200, {"Content-Type": "text\\plain"});
		// the file location is from the same location that we started the application from
		fs.readFile("." + unescape(pathname), 'utf8', function(err, data){
			if (err) throw err;
			response.write(data);
			response.end();
		});
	} else {
		response.writeHead(200, {"Content-Type": "image\\"+extension});
		// the file location is from the same location that we started the application from
		fs.readFile("." + unescape(pathname), 'raw', function(err, data){
			if (err) throw err;
			response.write(data);
			response.end();
		});
	}
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