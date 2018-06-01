import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import appReducer from './reducers/appReducer'
import contactsListReducer from './reducers/contactsListReducer'
import chatListReducer from './reducers/chatListReducer'

const reducers = combineReducers({
  authReducer,
  appReducer,
  contactsListReducer,
  chatListReducer
})

export default reducers
