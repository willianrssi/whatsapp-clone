import firebase from 'firebase'
import base64 from 'base-64'

import { CONTACTS_LIST_USER, CONTACTS_LIST_LOADING, CONTACTS_LIST_LOADING_END } from './actions'

export const fetchUserContacts = () => (dispatch) => {
  dispatch({
    type: CONTACTS_LIST_LOADING
  })

  const { currentUser } = firebase.auth()
  const userEmailB64 = base64.encode(currentUser.email)

  firebase.database().ref(`/usuario_contatos/${userEmailB64}`)
    .on('value', (snapshot) => {
      if (snapshot.val()) {
        const contacts = Object.keys(snapshot.val()).map((item) => ({...snapshot.val()[item], uid: item}))
        dispatch({
          type: CONTACTS_LIST_USER,
          payload: contacts
        })
      } else {
        dispatch({
          type: CONTACTS_LIST_LOADING_END
        })
      }
    })
}
