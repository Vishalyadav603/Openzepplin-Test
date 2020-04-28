/**
 * Main application routes
 */

'use strict';
const TokenController = require('./token/token.controller');
module.exports = function (app) {
//   app.get('/transferfrom',TokenController.transferFrom(req,res) );
  app.post('/transferfrom', (req, res) => {
    TokenController.transferFrom(req,res)
});
};