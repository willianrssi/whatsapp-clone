import { CHANGE_EMAIL, CHANGE_MESSAGE, ADD_CONTACT_ERROR, ADD_CONTACT_AGAIN, ADD_CONTACT_LOADING, USER_ADDED, CONTACT_ALREADY_EXISTS, MESSAGES_LIST, ERASE_MESSAGES_LIST } from './actions'

const INITIAL_STATE = {
  email: '',
  isLoading: false,
  errorMessage: '',
  userAdded: false,
  message: '',
  name: '',
  messagesList: []
}

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_EMAIL : {
      return {
        ...state,
        email: action.payload
      }
    }
    case ADD_CONTACT_LOADING : {
      return {
        ...state,
        isLoading: true
      }
    }
    case ADD_CONTACT_ERROR : {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      }
    }
    case USER_ADDED : {
      return {
        ...state,
        errorMessage: '',
        isLoading: false,
        userAdded: true
      }
    }
    case ADD_CONTACT_AGAIN : {
      return {
        ...state,
        email: '',
        userAdded: false
      }
    }
    case CHANGE_MESSAGE : {
      return {
        ...state,
        message: action.payload
      }
    }
    case CONTACT_ALREADY_EXISTS : {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      }
    }
    case MESSAGES_LIST : {
      return {
        ...state,
        messagesList: action.payload
      }
    }
    case ERASE_MESSAGES_LIST : {
      return {
        ...state,
        messagesList: []
      }
    }
    default: {
      return state
    }
  }
}

export default appReducer
