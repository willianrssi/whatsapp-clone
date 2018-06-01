import firebase from 'firebase'
import b64 from 'base-64'
import NavigationService from 'services/navigator'

import { AUTHENTICATION_ERROR, AUTHENTICATION_SUCCESS, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_NAME, LOADING_LOGIN, LOADING_REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from './actions'

export const changeEmail = (text) => ({
  type: CHANGE_EMAIL,
  payload: text
})

export const changeName = (text) => ({
  type: CHANGE_NAME,
  payload: text
})

export const changePassword = (text) => ({
  type: CHANGE_PASSWORD,
  payload: text
})

export const registerUser = ({name, password, email}) => (dispatch) => {
  dispatch({type: LOADING_REGISTER})
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      let emailB64 = b64.encode(email)
      firebase.database().ref(`/contatos/${emailB64}`)
        .push({name})
        .then(value => registerUserSuccess(dispatch))
    })
    .catch(error => registerUserFail(error, dispatch))
}

const registerUserSuccess = (dispatch) => {
  dispatch({type: REGISTER_SUCCESS})
  NavigationService.navigate('Welcome')
}

const registerUserFail = (error, dispatch) => {
  dispatch({type: REGISTER_ERROR, payload: error.message})
}

export const authUser = ({email, password}) => dispatch => {
  dispatch({ type: LOADING_LOGIN })
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(value => authUserSuccess(dispatch))
    .catch(error => authUserError(error, dispatch))
}

const authUserSuccess = (dispatch) => {
  dispatch({type: AUTHENTICATION_SUCCESS})
  NavigationService.navigate('Main')
}

const authUserError = (error, dispatch) => {
  dispatch({type: AUTHENTICATION_ERROR, payload: error.message})
}
