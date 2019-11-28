const listRouteFn = require('./list/list.route');
const resultRouteFn = require('./result/result.route');

module.exports = (app) => ({
  listRoute: listRouteFn(app),
  resultRoute: resultRouteFn(app),
});
