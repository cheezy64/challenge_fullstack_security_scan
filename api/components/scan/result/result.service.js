const Scan = require('../scan.model');

// eslint-disable-next-line no-unused-vars
module.exports = (_app) => {
  const addScanResult = async (result = {}) => {
    const newScan = new Scan(result);
    await newScan.validate();
    await newScan.save();
  };

  const getScanResult = async (id) => {
    const document = await Scan.findById(id).exec();
    if (document === null) throw new Error('Scan Result not found!');
    return document;
  };

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
