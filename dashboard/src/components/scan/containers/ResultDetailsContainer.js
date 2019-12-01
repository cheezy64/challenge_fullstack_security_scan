import React, { Component } from 'react';
import { getScanResult } from '../api';
import ScanResultDetails from '../components/ResultDetails';

class ScanResultDetailsContainer extends Component {
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
      <ScanResultDetails {...this.state.data} />
    )
  }
}

export default ScanResultDetailsContainer;