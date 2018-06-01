import base64 from 'base-64'
import firebase from 'firebase'
import { CHAT_LIST_USER, CHAT_LIST_LOADING, CHAT_LIST_LOADING_END } from './actions'

export const fetchUserChats = () => (dispatch) => {
  dispatch({
    type: CHAT_LIST_LOADING
  })

  const { currentUser } = firebase.auth()
  const userEmail = currentUser.email
  const userEmailB64 = base64.encode(userEmail)

  firebase.database().ref(`/usuario_conversas/${userEmailB64}`).on('value', snapshot => {
    if (snapshot.val()) {
      const chats = Object.keys(snapshot.val()).map((item) => ({...snapshot.val()[item]}))
      dispatch({type: CHAT_LIST_USER, payload: chats})
    } else {
      dispatch({type: CHAT_LIST_LOADING_END})
    }
  })
}
