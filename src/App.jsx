/* eslint-disable react/prefer-stateless-function, arrow-body-style*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from './Components/store';

// Components
import UserInfo from './Components/UserInfo/UserInfo';
import GetInfo from './Components/GetInfo/GetInfo';

// Styles
import './App.css';


const mapStateToProps = ({ user }) => {
  return {
    name: user.name,
    imgSrc: user.imgSrc,
    company: user.company,
    email: user.email,
    followers: user.followers,
    following: user.following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (username) => {
      dispatch(fetchUser(username));
    },
  };
};

// bind UserInfo to store's state
const UserInformations = connect(mapStateToProps, null)(UserInfo);

// Make dispatch actions as props for UserInfo
const UserGetInfo = connect(null, mapDispatchToProps)(GetInfo);

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserGetInfo />
        <UserInformations />
      </div>
    );
  }
}
export default App;
