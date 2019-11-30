const { model, Schema } = require('mongoose');

const PositionsSchema = new Schema({
  begin: {
    line: { type: Number, required: true },
  },
});

const LocationSchema = new Schema({
  path: { type: String, required: true },
  positions: { type: PositionsSchema, required: true },
});

const eMetadataSeverity = ['LOW', 'MEDIUM', 'HIGH'];
const MetadataSchema = new Schema({
  description: { type: String, required: true },
  severity: {
    type: String,
    required: true,
    enum: [...eMetadataSeverity], // TODO store as number and letting client display result
  },
});

const FindingSchema = new Schema({
  type: { type: String, required: true },
  ruleId: {
    type: String,
    required: true,
    // enum: [] TODO populate enum of possible values for validation
  },
  location: { type: LocationSchema, required: true },
  metadata: { type: MetadataSchema, required: true },
});

const eScanStatus = ['Queued', 'In Progress', 'Success', 'Failure'];
const ScanSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: [...eScanStatus], // TODO store as number and letting client display result
    validate: {
      validator: function statusValidator(status) {
        if (status === 'Queued') return !!this.queuedAt && !this.scanningAt && !this.finishedAt;
        if (status === 'In Progress') return !!this.queuedAt && !!this.scanningAt && !this.finishedAt;
        if (status === 'Success') return !!this.queuedAt && !!this.scanningAt && !!this.finishedAt;
        if (status === 'Failure') return !!this.queuedAt && !!this.scanningAt && !!this.finishedAt;
        return false;
      },
      message: 'Ensure that only timestamps corresponding to status are provided',
    },
  },
  repo: { type: String, required: true, minlength: 1 },
  findings: { type: [FindingSchema], required: true },
  queuedAt: { type: Date, required: true },
  scanningAt: Date,
  finishedAt: Date,
});

module.exports = model('Scan', ScanSchema);
