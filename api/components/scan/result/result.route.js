const router = require('express').Router();

const resultServiceFn = require('./result.service');

module.exports = (app) => {
  const {
    addScanResult,
    getScanResult,
  } = resultServiceFn(app);

  router.get('/result/:id', async (req, res, next) => {
    try {
      const list = await getScanResult(req.params.id);
      res.jsend.success(list);
    } catch (err) {
      next(err);
    }
  });

  router.post('/result', async (req, res, next) => {
    try {
      await addScanResult(req.body);
      res.jsend.success('Success');
    } catch (err) {
      next(err);
    }
  });

  return router;
};
