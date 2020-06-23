import API from '../../API';
import {
  SET_LOGGED_IN,
} from '../actionTypes';

export const verifySlackCode = code => async (dispatch) => {
  const { token, loggedIn } = await API.post('/auth/slack', { code, url: process.env.REACT_APP_CALLBACK_URL });
  localStorage.setItem('token', token);
  dispatch ({ type: SET_LOGGED_IN, loggedIn });
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: SET_LOGGED_IN, loggedIn: false };
};
