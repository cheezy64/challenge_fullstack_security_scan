const Scan = require('../scan.model');

// eslint-disable-next-line no-unused-vars
module.exports = (_app) => {
  const getList = async (filter = {}) => {
    const { repo } = filter;
    const projection = '_id repo status queuedAt';

    return repo ? Scan.find({ repo }, projection) : Scan.find({}, projection);
  };

  return {
    getList,
  };
};
