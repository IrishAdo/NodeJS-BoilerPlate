/**
 * This Script starts the application server
 * ------------------------------------------
 * @author irishado@hotmail.com
///<file>
///<licence>FreeTard Open Source</licence>
///</file>
 */

// create a object from our server.js file
var server = require("./Modules/server");

// execute the start function and pass a basic parameter throught to override the default settings.
server.start({port:801});