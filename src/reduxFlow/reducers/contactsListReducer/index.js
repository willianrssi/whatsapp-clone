import { CONTACTS_LIST_USER, CONTACTS_LIST_LOADING, CONTACTS_LIST_LOADING_END } from './actions'

const INITIAL_STATE = {
  contacts: [],
  isLoading: false
}

const contactListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACTS_LIST_USER: {
      return {
        ...state,
        contacts: action.payload,
        isLoading: false
      }
    }
    case CONTACTS_LIST_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }
    case CONTACTS_LIST_LOADING_END: {
      return {
        ...state,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}

export default contactListReducer
