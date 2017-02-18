/* eslint-disable arrow-body-style */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


// function that will help us find out if user is in a list
const findUserInList = (user, list) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].name === user) {
      return i;
    }
  }
  return undefined;
};

// Middleware installing
const middleware = applyMiddleware(thunk);

// Default state
const defaultState = {
  userList: [],
  user: {
    name: '',
    imgSrc: '',
    company: '',
    email: '',
    followers: -1,
    following: -1,
  },
};

// REDUCERS
const reducer = (state = defaultState, action) => {
  // Adding new user to a userList and displaying it
  if (action.type === 'FETCH_USER') {
    // Cloning whole state (No Mutations!)
    const clone = {};
    clone.user = Object.assign({}, {
      name: action.newUser.login.toLowerCase(),
      imgSrc: action.newUser.avatar_url,
      company: action.newUser.company,
      email: action.newUser.email,
      followers: action.newUser.followers,
      following: action.newUser.following,
    });

    clone.userList = state.userList.concat();
    clone.userList.push(clone.user);
    return {
      user: clone.user,
      userList: clone.userList,
    };
  }

  // If user is already present in userList, display it
  if (action.type === 'LOAD_USER') {
    return {
      ...state,
      user: Object.assign({}, state.userList[action.userIndex]),
    };
  }

  if (action.type === 'FETCH_USER_FAIL' || action.type === 'NO_INPUT') {
    const name = action.type === 'FETCH_USER_FAIL' ? 'User Not Found' : 'Please input name';
    return {
      ...state,
      user: Object.assign({}, defaultState.user, { name }),
    };
  }
  return state;
};

// ACTION
// Here, we check if given username is already fetched. If no (result == undefined) then fetch it.
// Otherwise, display fetched result
// also, if no username is passed, 'Not Found' will be displayed
export const fetchUser = (username) => {
  return (dispatcher, state) => {
    if (!username) {
      return dispatcher({
        type: 'NO_INPUT',
        newUser: state,
      });
    }

    const result = findUserInList(username, state().userList);

    if (result === undefined) {
      return axios.get(`https://api.github.com/users/${username}`)
      .then((response) => {
        dispatcher({
          type: 'FETCH_USER',
          newUser: response.data,
        });
      })
      .catch(() => {
        return dispatcher({
          type: 'FETCH_USER_FAIL',
          newUser: null,
        });
      });
    }
    return dispatcher({
      type: 'LOAD_USER',
      userIndex: result,
    });
  };
};


// Export Created Store
export default createStore(reducer, middleware);
