import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import ScanResults from './components/ScanResults';
import { getScanResults } from './api';

class DisplayContainer extends Component {
  state = {
    repoSearch: '',
    scans: [],
  };

  onSearchChange = (e) => {
    //this.setState({ repoSearch: e.target.value });
    // TODO FIXME call API to get only results matching repo.  For this exercise I'll always get all results
  };

  onSearchSubmit = (e) => {
    e.preventDefault();
    // TODO FIXME call API to get only results matching repo.  For this exercise I'll always get all results
    // TODO refactor and get scan results
  }

  async componentDidMount() {
    const scans = await getScanResults({ repo: this.state.repoSearch });
    this.setState({ scans: scans.data });
  }

  render() {
    return (
      <div className='displayContainer'>
        <SearchBar onSubmit={this.onSearchSubmit} onChange={this.onSearchChange} value={this.state.repoSearch} />
        <ScanResults scans={this.state.scans} />
      </div>
    )
  }
}

export default DisplayContainer;
