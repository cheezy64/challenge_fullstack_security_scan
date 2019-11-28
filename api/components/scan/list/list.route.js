const jsend = require('jsend');
const router = require('express').Router();

const listServiceFn = require('./list.service');

module.exports = (app) => {
  const { getList } = listServiceFn(app);
  router.get('/list', async (req, res, next) => {
    try {
      const list = await getList(req.body);
      res.send(jsend.success(list));
    } catch (err) {
      next(err);
    }
  });

  return router;
};
