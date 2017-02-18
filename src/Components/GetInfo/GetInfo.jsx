/* eslint-disable linebreak-style, react/prefer-stateless-function */

import React, { Component } from 'react';

import debounce from '../_debounce';

import './GetInfo.css';


export default class GetInfo extends Component {
  constructor() {
    super();

    // wasn't sure for how long should I set it to :s
    this.fetchUser = debounce(this.fetchUser, 400);
  }

  // Focus input on page load
  componentDidMount() {
    this.inputBox.focus();
  }

  // dispatch action to store
  fetchUser(username) {
    this.props.fetchData(username.toLowerCase().trim());
  }

  render() {
    return (
      <div className="getter">
        <h3>Type a GitHub username:</h3>
        <input
          onChange={({ target }) => { this.fetchUser(target.value); }}
          ref={(inputEl) => { this.inputBox = inputEl; }}
          type="text"
        />
      </div>
    );
  }
}

GetInfo.propTypes = {
  fetchData: React.PropTypes.func.isRequired,
};
