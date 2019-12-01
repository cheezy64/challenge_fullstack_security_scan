import React from 'react';
import PropTypes from 'prop-types';

import Form from "react-jsonschema-form";

const JSONSchema = {
  "type": "object",
  "required": [
    "status",
    "repo",
    "findings",
    "queuedAt"
  ],
  "properties": {
    "status": {
      "type": "string",
      "enum": ["Queued", "In Progress", "Success", "Failure"]
    },
    "repo": {
      "type": "string"
    },
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "type",
          "ruleId",
          "location",
          "metadata"
        ],
        "properties": {
          "type": {
            "type": "string"
          },
          "ruleId": {
            "type": "string"
          },
          "location": {
            "type": "object",
            "required": [
              "path",
              "positions"
            ],
            "properties": {
              "path": {
                "type": "string"
              },
              "positions": {
                "type": "object",
                "required": [
                  "begin"
                ],
                "properties": {
                  "begin": {
                    "type": "object",
                    "required": [
                      "line"
                    ],
                    "properties": {
                      "line": {
                        "type": "integer"
                      }
                    }
                  }
                }
              }
            }
          },
          "metadata": {
            "type": "object",
            "required": [
              "description",
              "severity"
            ],
            "properties": {
              "description": {
                "type": "string"
              },
              "severity": {
                "type": "string",
                "enum": ["LOW", "MEDIUM", "HIGH"]
              }
            }
          }
        }
      }
    },
    "queuedAt": { "type": "string" },
    "scanningAt": { "type": "string" },
    "finishedAt": { "type": "string" }
  }
};

const UISchema = {
  "queuedAt": { "ui:widget": "alt-datetime", "ui:options": { "yearsRange": [ 1980, 2030 ], hideNowButton: false, hideClearButton: false }},
  "scanningAt": { "ui:widget": "alt-datetime", "ui:options": { "yearsRange": [ 1980, 2030 ], hideNowButton: false, hideClearButton: false }},
  "finishedAt": { "ui:widget": "alt-datetime", "ui:options": { "yearsRange": [ 1980, 2030 ], hideNowButton: false, hideClearButton: false }}
};

const formData = {
  "status": "Queued",
  "repo": "Guardrails",
  "findings": [
    {
      "type": "sast",
      "ruleId": "G402",
      "location": {
        "path": "connectors/apigateway.go",
        "positions": {
          "begin": {
            "line": 60
          }
        }
      },
      "metadata": {
        "description": "TLS InsecureSkipVerify set true.",
        "severity": "HIGH"
      }
    },
    {
      "type": "sast",
      "ruleId": "G404",
      "location": {
        "path": "util/util.go",
        "positions": {
          "begin": {
            "line": 32
          }
        }
      },
      "metadata": {
        "description": "Use of weak random number generator (math/rand instead of crypto/rand)",
        "severity": "HIGH"
      }
    }
  ],
  "queuedAt": new Date().toISOString()
};

const ScanResultsForm = ({
  onSubmit,
  onChange,
  onError,
}) => {
  return (
    <div>
      <Form
        schema={JSONSchema}
        uiSchema={UISchema}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={onError}
      />
    </div>
  )
}

ScanResultsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
}

export default ScanResultsForm;
