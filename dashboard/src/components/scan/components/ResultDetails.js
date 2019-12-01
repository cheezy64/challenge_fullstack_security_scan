import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const Finding = ({ finding, name }) => {
  const line = finding.location.positions.begin.line;
  const path = finding.location.path;
  const { description, severity } = finding.metadata;
  const { type, ruleId } = finding;
  const formattedFinding = `
            ${type} violation (rule ${ruleId})
            Severity: ${severity}
            ${path}:${line}
            ${description}
            `;
  return (<tr>
    <td>{name}</td>
    <td><pre>{formattedFinding}</pre></td>
  </tr>);
}

const ScanResultDetails = ({ findings = [], status, repo, queuedAt, scanningAt, finishedAt }) => {
  const timestamp = status === 'Queued'
    ? queuedAt : status === 'In Progress'
    ? scanningAt : finishedAt;

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Repo</td>
          <td>{repo}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{status} at {timestamp}</td>
        </tr>
        {findings.map((finding, i) => {
          return <Finding 
            finding={finding} 
            name={`Finding ${i}`} 
            key={JSON.stringify(finding.location)}
            />
        })}
      </tbody>
    </Table>
    );
}

ScanResultDetails.propTypes = {
  repo: PropTypes.string.isRequired,
  status: PropTypes.string,
  findings: PropTypes.arrayOf(
    PropTypes.shape({
      findings: PropTypes.arrayOf(PropTypes.shape({
        location: PropTypes.shape({
          path: PropTypes.string.isRequired,
          positions: PropTypes.shape({
            begin: PropTypes.shape({
              line: PropTypes.number.isRequired
            }).isRequired
          }).isRequired
        }).isRequired,
        metadata: PropTypes.shape({
          description: PropTypes.string.isRequired,
          severity: PropTypes.string.isRequired
        }).isRequired,
        ruleId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired).isRequired
    }).isRequired
  ),
  queuedAt: PropTypes.string,
  scanningAt: PropTypes.string,
  finishedAt: PropTypes.string,
}

export default ScanResultDetails;