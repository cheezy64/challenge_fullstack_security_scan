require('../../../config');
const getPort = require('get-port');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../../app');
const Scan = require('../../../components/scan/scan.model');

const request = supertest(app);

const baseUrl = '/api/scan';
const mockScanFindings = [
  {
    type: 'sast',
    ruleId: 'G402',
    location: {
      path: 'connectors/apigateway.go',
      positions: {
        begin: {
          line: 60,
        },
      },
    },
    metadata: {
      description: 'TLS InsecureSkipVerify set true.',
      severity: 'HIGH',
    },
  },
];


const mockScanRepo = 'Guardrails';
let server;
beforeAll(async () => {
  server = app.listen(await getPort({ port: getPort.makeRange(4000, 4200) }));
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  await mongoose.connection.db.dropDatabase();
});
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});


describe(`GET ${baseUrl}/result/:id`, () => {
  const mockScanId = '5ddf33e8a6dad48872b97e53';
  const mockScanIdNotExist = '5ddf33e8a6dad48872b97fff';
  beforeAll(async () => {
    await mongoose.connection.db.dropDatabase();

    const mockScanResult = {
      _id: mockScanId,
      status: 'Queued',
      repo: mockScanRepo,
      findings: mockScanFindings,
      queuedAt: new Date().toISOString(),
    };

    const newScan = new Scan(mockScanResult);
    await newScan.save();
  });

  describe('if resource exists', () => {
    it('should return success status with non-empty data', async () => {
      const res = await request.get(`${baseUrl}/result/${mockScanId}`);
      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('success');
      expect(resObj.data).not.toBe(null);
      expect(res.status).toBe(200);
    });
  });

  describe('if resource does NOT exist', () => {
    it('should return error status', async () => {
      const res = await request.get(`${baseUrl}/result/${mockScanIdNotExist}`);
      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('error');
      expect(res.status).toBe(500);
    });
  });
});


describe(`POST ${baseUrl}/result`, () => {
  beforeAll(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should return success status when requested with validated body', async () => {
    const mockScanResultBodyValid = JSON.stringify({
      status: 'Queued',
      repo: mockScanRepo,
      findings: mockScanFindings,
      queuedAt: new Date().toISOString(),
      scanningAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
    });

    const res = await request
      .post(`${baseUrl}/result`)
      .set('Content-Type', 'application/json')
      .send(mockScanResultBodyValid);

    const resObj = JSON.parse(res.text);
    expect(resObj.status).toBe('success');
    expect(res.status).toBe(200);
  });

  it('should return fail when requested with missing required fields', async () => {
    const mockScanResultBodyInvalid = JSON.stringify({
      status: 'Queued',
      repo: mockScanRepo,
      findings: mockScanFindings,
      // Missing required fields
    });

    const res = await request
      .post(`${baseUrl}/result`)
      .set('Content-Type', 'application/json')
      .send(mockScanResultBodyInvalid);

    const resObj = JSON.parse(res.text);
    expect(resObj.status).toBe('fail');
    expect(res.status).toBe(422);
  });

  describe('status and timestamp validation', () => {
    it('"Queued" status returns success when only "queuedAt" timestamp is provided', async () => {
      const mockScanResultBody = JSON.stringify({
        status: 'Queued',
        repo: mockScanRepo,
        findings: mockScanFindings,
        queuedAt: new Date().toISOString(),
      });

      const res = await request
        .post(`${baseUrl}/result`)
        .set('Content-Type', 'application/json')
        .send(mockScanResultBody);

      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('success');
      expect(res.status).toBe(200);
    });

    it('"Queued" status returns failure when more than "queuedAt" timestamp is provided', async () => {
      const mockScanResultBody = JSON.stringify({
        status: 'Queued',
        repo: mockScanRepo,
        findings: mockScanFindings,
        queuedAt: new Date().toISOString(),
        scanningAt: new Date().toISOString(),
      });

      const res = await request
        .post(`${baseUrl}/result`)
        .set('Content-Type', 'application/json')
        .send(mockScanResultBody);

      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('fail');
      expect(res.status).toBe(422);
    });

    it('"In Progress" status only accepts "queuedAt" and "scanningAt" timestamp', async () => {
      const mockScanResultBody = JSON.stringify({
        status: 'In Progress',
        repo: mockScanRepo,
        findings: mockScanFindings,
        queuedAt: new Date().toISOString(),
        scanningAt: new Date().toISOString(),
      });

      const res = await request
        .post(`${baseUrl}/result`)
        .set('Content-Type', 'application/json')
        .send(mockScanResultBody);

      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('success');
      expect(res.status).toBe(200);
    });

    it('"In Progress" status returns failure when only "scanningAt" timestamp is provided', async () => {
      const mockScanResultBody = JSON.stringify({
        status: 'In Progress',
        repo: mockScanRepo,
        findings: mockScanFindings,
        scanningAt: new Date().toISOString(),
      });

      const res = await request
        .post(`${baseUrl}/result`)
        .set('Content-Type', 'application/json')
        .send(mockScanResultBody);

      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('fail');
      expect(res.status).toBe(422);
    });

    it('"In Progress" status returns failure when more than "queuedAt" and "scanningAt" timestamp is provided', async () => {
      const mockScanResultBody = JSON.stringify({
        status: 'In Progress',
        repo: mockScanRepo,
        findings: mockScanFindings,
        queuedAt: new Date().toISOString(),
        scanningAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
      });

      const res = await request
        .post(`${baseUrl}/result`)
        .set('Content-Type', 'application/json')
        .send(mockScanResultBody);

      const resObj = JSON.parse(res.text);
      expect(resObj.status).toBe('fail');
      expect(res.status).toBe(422);
    });
  });
});
