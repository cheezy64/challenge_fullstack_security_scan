import React, { Component } from 'react';
import { postScanResult } from '../api/';

import ScanResultForm from '../components/ResultForm';
import DismissableAlert from '../../common/DismissableAlert';

class ScanResultFormContainer extends Component {
  state = {
    alert: {
      heading: '',
      message: '',
      variant: 'danger',
    },
    showAlert: false
  };

  onSubmit = async ({ formData }, e) => {
    try {
      const { status, data, message } = await postScanResult(formData);
      if (status === 'success') {
        this.setState({ 
          alert: {
            heading: 'Success',
            message: '',
            variant: 'success',
            showAlert: true,
          },
        });
      } else if (status === 'fail') {
        this.setState({ 
          alert: {
            heading: 'Error',
            message: JSON.stringify(data, null, 2),
            variant: 'danger',
            showAlert: true,
          },
        });
      } else if (status === 'error') {
        this.setState({ 
          alert: {
            heading: 'Error',
            message: JSON.stringify(message, null, 2),
            variant: 'danger',
            showAlert: true,
          },
        });
      }
    } catch (err) {
      console.log(err.stack);
    }
  }
  
  toggleAlert = () => this.setState((state) => {
    return {
      alert: {
        showAlert: !state.showAlert,
      }
    };
  });

  render() {
    return (
      <div>
        <ScanResultForm
          onSubmit={this.onSubmit}
          onError={this.onError}
        />
        <DismissableAlert
          onClose={this.toggleAlert}
          show={!!this.state.alert.showAlert}
          variant={this.state.alert.variant}
          heading={this.state.alert.heading}
          message={this.state.alert.message}
        />
      </div>
    )
  };
};

export default ScanResultFormContainer;
