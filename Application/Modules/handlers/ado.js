///<summary>
/// A function to process /ado/hello requests
///</summary>
///<param name='response'>The connection to send the response on</param>
function hello(response){ 
	console.log("hello");
	response.writeHead(200, {"Content-Type": "text\plain"});
	response.write("Hello and welcome");
	response.end();	
}

///<summary>
/// A function to process /ado/goodbye requests
///</summary>
///<param name='response'>The connection to send the response on</param>
function goodbye(response){
	console.log("goodbye");
	response.writeHead(200, {"Content-Type": "text\plain"});
	response.write("Goodbye");
	response.end();	
}

///<summary>
/// A function to add a list of handlers to the global list
///</summary>
///<param name='handles'>The list of handlers that have currently been loaded</param>
function addHandlersToList(handles){
	// if someone accesses http://localhost:<port>/ado/hello then execute the hello function
	handles["/ado/hello"] = hello;
	// if someone accesses http://localhost:<port>/ado/goodbye then execute the goodbye function
	handles["/ado/goodbye"] = goodbye;
}

// export these functions
exports.hello = hello;
exports.goodbye = goodbye;
exports.addHandlersToList = addHandlersToList;