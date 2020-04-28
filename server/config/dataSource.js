'use strict';

const errorHandler = require('errorhandler');
module.exports = function (config) {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;


    //Append required mongodb options
    let mongoOptions = config.mongo.options;
    mongoOptions = {
        ...mongoOptions,
        ...{
            useNewUrlParser: true
        }
    };

    // Connect to database
    mongoose.connect(config.mongo.uri, mongoOptions);
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    });
}