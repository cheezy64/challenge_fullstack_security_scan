const Scan = require('../scan.model');

// eslint-disable-next-line no-unused-vars
module.exports = (_app) => {
  const getList = async (filter = {}) => {
    const { repo } = filter;
    const projection = {
      _id: 1,
      repo: 1,
      status: 1,
      numFindings: { $size: '$findings' },
      queuedAt: 1,
      scanningAt: 1,
      finishedAt: 1,
    };
    const repoMatch = repo ? { repo } : {};
    return Scan.aggregate([
      { $match: repoMatch },
      { $project: projection },
    ]);
  };

  return {
    getList,
  };
};
