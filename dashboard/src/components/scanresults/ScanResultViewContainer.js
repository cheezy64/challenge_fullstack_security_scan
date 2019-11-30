import React, { Component } from 'react';
import { getScanResult } from './api';
import ScanResultView from './components/ScanResultView';

class ScanResultViewContainer extends Component {
  state = {
    data: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const { data } = await getScanResult(id);
      this.setState({ data });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <ScanResultView {...this.state.data} />
    )
  }
}

export default ScanResultViewContainer;