/**
 * Main application file
 */

'use strict';

async function main() {
	const express = require('express');
	let app = express();
	let server = require('http').createServer(app);
	var path = require('path');

	// Set default node environment to development
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	// load all variable from .env file to system enviornment
	require('dotenv').config({
		path: __dirname + '/config/.env'
	});

	const config = require('./config/environment');

	//Error Handling setup
	require('./config/errorHandling')(app, config);

	//set api host and stream in global variable
	global.apiHost = process.env.API_HOST || `localhost:${config.port}`
	global.apiHostStream = process.env.API_HOST_STREAM || 'http'
	global.roleArray = [];

	//configure appmetrics
	//uncomment below lines to enable matrix
	/* const dash = require('appmetrics-dash');
	dash.attach();*/

    /**
     * UnComment this for database connectivity
	require('./config/dataSource')(config);
	if (config.seedDB) {
		require('./config/seed');
	} */

	//Response Handler
	global.responseHandler = require('./config/responseHandler');

	//Logger Configuration
	// global.logger = require('./config/logger')(app, config);

	//Express setup
	require('./config/express')(app);

	//Route setup
    require('./route')(app);
    
	// Start server
	server.listen(config.port, config.ip, function () {
		require('figlet')('Node . Js', {
				font: 'Slant'
			},
			function (err, data) {
				if (err) {
					console.log('Something went wrong...');
					console.dir(err);
					return;
				}
				console.log(data);
				console.log(` *****listening ${config.port} port On ${app.get('env')} Environment *****`);
			});
	});
}
main().catch(console.error);