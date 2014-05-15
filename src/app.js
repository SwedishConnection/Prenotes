/**
 * Prenotes: Pre-Notes is shorthand for Pre-school Notifications.  
 * The project hopes to support both staff and parents communicate
 * online.  The majority of communication is notifications. 
 */
var express = require('express');


var app = express();
app.configure(function() {
	app.use(express.static(__dirname + '/../../build'));
});


console.log("Listening on port %d", process.env.PORT || 4730);
app.listen(process.env.PORT || 4730);