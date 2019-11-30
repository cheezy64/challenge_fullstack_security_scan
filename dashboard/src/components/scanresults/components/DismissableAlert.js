import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

const DismissableAlert = ({ onClose, show, variant, heading, message }) => {
  return (!show) 
    ? null
    : (
      <Alert transition={null} variant={variant} onClose={onClose} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
    );
};

DismissableAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default DismissableAlert;
