import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Table } from 'react-bootstrap';

const ScanResultShapePropType = {
  _id: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  queuedAt: PropTypes.string.isRequired,
  scanningAt: PropTypes.string,
  finishedAt: PropTypes.string,
  numFindings: PropTypes.number,
};

const ScanResult = ({
  _id,
  repo,
  status,
  queuedAt,
  scanningAt,
  finishedAt,
  numFindings,
}) => {
  return (
    <tr>
      <td>{repo}</td>
      <td>{status}</td>
      <td>{queuedAt}</td>
      <td>{scanningAt ? scanningAt : 'N/A'}</td>
      <td>{finishedAt ? finishedAt : 'N/A'}</td>
      <td>Details <Badge variant='danger'>{numFindings ? numFindings : 0}</Badge></td>
    </tr>
  )
}
ScanResult.propTypes = ScanResultShapePropType;

const ScanResults = ({
  scans
}) => {
  return (
    <div className='ScanResults'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Status</th>
            <th>Queued at</th>
            <th>Scanning at</th>
            <th>Finished at</th>
            <th>Number of findings</th>
          </tr>
        </thead>
        <tbody>
          {scans.map(scan => <ScanResult key={scan._id} {...scan} />)}
        </tbody>
      </Table>
    </div>
  )
}

ScanResults.propTypes = {
  scans: PropTypes.arrayOf(
    PropTypes.shape(ScanResultShapePropType).isRequired,
  ).isRequired,
};

export default ScanResults;
