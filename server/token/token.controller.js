'use strict';

const TokenService = require('./token.service');
exports.transferFrom = function (req, res) {
    TokenService.transferFrom(req.body)
      .then(result => responseHandler.success(res, result, "Transfer Successfull", 200))
      .catch(error => responseHandler.error(res, error, "Error in transfering", 422));
  };