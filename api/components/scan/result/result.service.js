const Scan = require('../scan.model');

// eslint-disable-next-line no-unused-vars
module.exports = (_app) => {
  const addScanResult = async (result = {}) => {
    const newScan = new Scan(result);
    await newScan.validate();
    await newScan.save();
  };

  const getScanResult = async (id) => Scan.findById(id).exec();

  /*
  const updateScanResult = async ({
    id,
    status,
    statusTime,
    finding
  }) => {
    // TODO
  };
  */

  return {
    addScanResult,
    getScanResult,
    // updateScanResult, /* TODO */
  };
};
