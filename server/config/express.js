/**
 * Express configuration
 */

'use strict';

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');

module.exports = function (app) {
  // Set view engine to ejs
  app.set('view engine', 'ejs');

  app.use(cors())
  app.use('/api/static', express.static(path.join(__dirname, '../', 'uploads')))
  app.use('/api/temp', express.static(path.join(__dirname, '../', 'temp')))
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({
    verify: function (req, res, buf, encoding) {
      // get rawBody        
      req.rawBody = buf;
    }
  }));

  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
};
