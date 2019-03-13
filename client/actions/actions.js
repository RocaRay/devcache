import * as types from '../actions/actionTypes';
import Axios from 'axios';

export const updateUsername = (value) => ({
  type: types.UPDATE_USERNAME,
  payload: value
})

export const updatePassword = (value) => ({
  type: types.UPDATE_PASSWORD,
  payload: value
})

export const updateFullname = (value) => ({
  type: types.UPDATE_FULLNAME,
  payload: value
})

export const updateEmail = (value) => ({
  type: types.UPDATE_EMAIL,
  payload: value
})

export const loginUser = (username, password) => dispatch => {
  return Axios.post('/login', {username: username, password: password})
    .then(userInfo => {
      console.log('userInfo.data upon login:', userInfo.data);
      dispatch(logIn(userInfo.data)) //return?
    })
    .catch(err => console.log(err)) // ???
}

export const logIn = (userInfo) => ({
  type: types.LOGIN,
  payload: userInfo //
})

export const registerUser = (username, password, fullname, email) => dispatch => {
  return Axios.post('/signup', {username: username, password: password, fullname: fullname, email: email})
    .then(userInfo => {
      console.log('register success')
      dispatch(logIn(userInfo))
    })
    .catch(err => console.log(err))
}

export const updateSnippet = (value) => ({
  type: types.UPDATE_SNIPPET,
  payload: value
})

export const updateComments = (value) => ({
  type: types.UPDATE_COMMENTS,
  payload: value
})

export const updateTags = (value) => ({
  type: types.UPDATE_TAGS,
  payload: value
})

export const submitSnippet = (snippet, comments, accountid) => dispatch => { 
  return Axios.post('/api/snippet', {snippet: snippet, comments: comments, accountid: accountid})
        .then(result => {
          console.log('result from submitSnippet:', result)
          console.log('submit success')
          dispatch()
        })
        .catch(err => console.log(err))
}

export const updateSearch = (value) => ({
  type: types.UPDATE_SEARCH,
  payload: value
})

export const toggleMode = () => ({
  type: types.TOGGLE_MODE,
})

export const loginFail = (value) => ({
  type: types.LOGIN_FAIL,
  payload: value
})

export const logout = () => ({
  type: types.LOGOUT,
})