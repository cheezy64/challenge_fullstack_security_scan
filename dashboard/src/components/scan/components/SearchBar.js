import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
  onSubmit,
  onChange,
  value,
}) => {
  return (
    <div className='searchBar'>
      <form className='form-inline' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='search'>Repo</label>
          <input type='text' className='form-control' id='search' onChange={onChange} value={value} disabled placeholder='enabled on next release'/>
        </div>
        <button type='submit' className='btn btn-primary' disabled>Submit</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SearchBar;
