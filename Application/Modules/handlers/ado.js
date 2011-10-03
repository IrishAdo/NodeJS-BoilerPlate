///<summary>
/// A function to process /ado/hello requests
///</summary>
///<param name='response'>The connection to send the response on</param>
function hello(pathName, responseObject){ 
	console.log("hello");
	responseObject.writeHead(200, {"Content-Type": "text\plain"});
	responseObject.write("Hello and welcome");
	responseObject.end();	
}

///<summary>
/// A function to process /ado/goodbye requests
///</summary>
///<param name='response'>The connection to send the response on</param>
function goodbye(pathName, responseObject){
	console.log("goodbye");
	responseObject.writeHead(200, {"Content-Type": "text\plain"});
	responseObject.write("Goodbye");
	responseObject.end();	
}

///<summary>
/// A function to add a list of handlers to the global list
///</summary>
///<param name='handles'>The list of handlers that have currently been loaded</param>
function addHandlersToList(handles){
	// create the handle list for ado
	handles["ado"] = new Array();
	// if someone accesses http://localhost:<port>/ado/hello then execute the hello function
	handles["ado"]["/ado/hello"] = hello;
	// if someone accesses http://localhost:<port>/ado/goodbye then execute the goodbye function
	handles["ado"]["/ado/goodbye"] = goodbye;
}

// export these functions
exports.hello = hello;
exports.goodbye = goodbye;
exports.addHandlersToList = addHandlersToList;