/* eslint-disable linebreak-style, react/prefer-stateless-function*/

import React from 'react';

import './UserInfo.css';

export default function DisplayInfo(props) {
  return (
    <div className="User">

      <img className="User-img" src={props.imgSrc} alt="" />

      <div className="User-details">
        <h2 className="User-details-name">{props.name}</h2>
        <h5 className="User-details-email">{props.email}</h5>
        <p className="User-details-company">{props.company}</p>
      </div>
      <div className="User-follow">
        <p>Followers<span className="follow-number">{props.followers}</span> </p>
        <p>Following<span className="follow-number">{props.following}</span> </p>
      </div>
    </div>
  );
}

// Type check for passed props
DisplayInfo.propTypes = {
  imgSrc: React.PropTypes.string,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  company: React.PropTypes.string,

  followers: React.PropTypes.number,
  following: React.PropTypes.number,
};

// Default values, if props are not passed
DisplayInfo.defaultProps = {
  imgSrc: '',
  name: '-',
  email: '-',
  company: '-',

  followers: -1,
  following: -1,
};
