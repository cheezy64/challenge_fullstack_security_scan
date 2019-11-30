import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Table } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

const ScanResultShapePropType = {
  _id: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  queuedAt: PropTypes.string.isRequired,
  scanningAt: PropTypes.string,
  finishedAt: PropTypes.string,
  numFindings: PropTypes.number,
};

const ScanResult = withRouter(({
  _id,
  repo,
  status,
  queuedAt,
  scanningAt,
  finishedAt,
  numFindings,
  history,
}) => {
  return (
    <tr>
      <td>
      {repo}{' '}
      {
        numFindings <= 0 
          ? null
          : <Badge variant='danger'>{numFindings}</Badge>
      }
      </td>
      <td>{status}</td>
      <td>{queuedAt}</td>
      <td>{scanningAt ? scanningAt : 'N/A'}</td>
      <td>{finishedAt ? finishedAt : 'N/A'}</td>
      <td><NavLink to={`/view/${_id}`}>View</NavLink></td>
    </tr>
  )
});
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
            <th>Actions</th>
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
