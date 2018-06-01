import { AUTHENTICATION_ERROR, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_NAME, LOADING_LOGIN, LOADING_REGISTER, REGISTER_ERROR, REGISTER_SUCCESS, AUTHENTICATION_SUCCESS } from './actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  registerError: '',
  authenticationError: '',
  loadingLogin: false,
  loadingRegister: false
}

const authReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload
      }
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.payload
      }
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerError: action.payload,
        loadingRegister: false
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        name: '',
        password: '',
        loadingRegister: false
      }
    }
    case AUTHENTICATION_ERROR: {
      return {
        ...state,
        authenticationError: action.payload,
        loadingLogin: false
      }
    }
    case AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        email: '',
        password: '',
        loadingLogin: false
      }
    }
    case LOADING_LOGIN: {
      return {
        ...state,
        loadingLogin: true
      }
    }
    case LOADING_REGISTER: {
      return {
        ...state,
        loadingRegister: true
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer
