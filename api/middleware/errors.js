const mongooseErrorHandler = require('mongoose-error-handler');

/* eslint no-param-reassign: "off", no-unused-vars: "off" */
const jsendErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'MongoError') {
    err = mongooseErrorHandler.set(err);
    err.code = 422;
  }

  const code = err.code || 500;
  if (code >= 500) return res.status(code).jsend.error(err.message);

  return res.status(code).jsend.fail(err);
};

module.exports = {
  jsendErrorHandler,
};
