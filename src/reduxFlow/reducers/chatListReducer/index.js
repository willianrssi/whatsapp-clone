import { CHAT_LIST_USER, CHAT_LIST_LOADING, CHAT_LIST_LOADING_END } from './actions'

const INITIAL_STATE = {
  chats: [],
  isLoading: false
}

const chatListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_LIST_LOADING : {
      return {
        ...state,
        isLoading: true
      }
    }
    case CHAT_LIST_LOADING_END : {
      return {
        ...state,
        isLoading: false
      }
    }
    case CHAT_LIST_USER : {
      return {
        ...state,
        chats: action.payload,
        isLoading: false
      }
    }
    default : {
      return state
    }
  }
}

export default chatListReducer
