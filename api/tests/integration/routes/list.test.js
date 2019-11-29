require('../../../config');
const getPort = require('get-port');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../../app');
const Scan = require('../../../components/scan/scan.model');

const request = supertest(app);

const baseUrl = '/api/scan';

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

describe(`GET ${baseUrl}/list`, () => {
  beforeAll(async () => {
    await mongoose.connection.db.dropDatabase();
    const mockScanResult = {
      status: 'Queued',
      repo: mockScanRepo,
      findings: [
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
      ],
      queuedAt: new Date().toISOString(),
    };

    const newScan = new Scan(mockScanResult);
    await newScan.save();
  });

  it('should return success status with an empty filter', async () => {
    const res = await request.get(`${baseUrl}/list`);
    const resObj = JSON.parse(res.text);
    expect(resObj.status).toBe('success');
    expect(res.status).toBe(200);
  });

  it('should return success status with an empty data array for nonexisting repos', async () => {
    const res = await request
      .get(`${baseUrl}/list`)
      .query({ repo: 'this repo dont exist, yo' });
    const resObj = JSON.parse(res.text);
    expect(resObj.status).toBe('success');
    expect(resObj.data).toHaveLength(0);
    expect(res.status).toBe(200);
  });

  it('should return success status a nonempty data array for an existing repo', async () => {
    const res = await request
      .get(`${baseUrl}/list`)
      .query({ repo: mockScanRepo });
    const resObj = JSON.parse(res.text);
    expect(resObj.status).toBe('success');
    expect(resObj.data).not.toHaveLength(0);
    expect(res.status).toBe(200);
  });
});
