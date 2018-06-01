import { ERASE_MESSAGES_LIST, CHANGE_EMAIL, CHANGE_MESSAGE, ADD_CONTACT_AGAIN, ADD_CONTACT_ERROR, ADD_CONTACT_LOADING, USER_ADDED, CONTACT_ALREADY_EXISTS, MESSAGES_LIST } from './actions'
import firebase from 'firebase'
import base64 from 'base-64'

export const changeEmail = (text) => ({
  type: CHANGE_EMAIL,
  payload: text
})

export const addContact = (contactEmail) => (dispatch) => {
  dispatch({ type: ADD_CONTACT_LOADING })
  const emailB64 = base64.encode(contactEmail)

  // checks if the user exists
  firebase.database().ref(`/contatos/${emailB64}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        // user data that will be added
        const dataUserWillAdded = snapshot.val()[Object.keys(snapshot.val())[0]]
        // email of authenticated user
        const { currentUser } = firebase.auth()
        const userEmailB64 = base64.encode(currentUser.email)
        const contactEmailB64 = base64.encode(contactEmail)

        // verify if contact already exists
        firebase.database().ref(`/usuario_contatos/${userEmailB64}/${contactEmailB64}`).once('value', snapshot => {
          if (!snapshot.val()) {
            firebase.database().ref(`/usuario_contatos/${userEmailB64}/${contactEmailB64}`).set({ email: contactEmail, name: dataUserWillAdded.name })
              .then(() => {
                dispatch({ type: USER_ADDED })
              })
              .catch((error) => {
                addContactError(error.message, dispatch)
              })
          // contact already exists
          } else {
            dispatch({
              type: CONTACT_ALREADY_EXISTS,
              payload: 'Email informado corresponde a um contato já adicionado'
            })
          }
        })
      // the user not exist
      } else {
        dispatch({
          type: ADD_CONTACT_ERROR,
          payload: 'Email informado não corresponde a um usuário cadastrado'
        })
      }
    })
}

const addContactError = (error, dispatch) => {
  dispatch({
    type: ADD_CONTACT_ERROR,
    payload: error
  })
}

export const addContactAgain = () => ({
  type: ADD_CONTACT_AGAIN
})

export const changeMessage = (text) => ({
  type: CHANGE_MESSAGE,
  payload: text
})

export const sendMessage = (message, contactName, contactEmail) => (dispatch) => {
  // data from authenticated user
  const { currentUser } = firebase.auth()
  const userEmail = currentUser.email
  const userEmailB64 = base64.encode(userEmail)

  // data from contact
  const contactEmailB64 = base64.encode(contactEmail)

  // save the messages
  firebase.database().ref(`/mensagens/${userEmailB64}/${contactEmailB64}`)
    .push({ message, tipo: 'send' })
    .then(() => {
      firebase.database().ref(`/mensagens/${contactEmailB64}/${userEmailB64}`)
        .push({ message, tipo: 'receive' })
        .then(() => {
          dispatch({
            type: CHANGE_MESSAGE,
            payload: ''
          })
        })
    })
    .then(() => { // Header of chat
      firebase.database().ref(`/usuario_conversas/${userEmailB64}/${contactEmailB64}`)
        .set({ name: contactName, email: contactEmail })
        .then(() => {
          firebase.database().ref(`/contatos/${userEmailB64}`).once('value', snapshot => {
            const username = snapshot.val()[Object.keys(snapshot.val())[0]].name
            firebase.database().ref(`/usuario_conversas/${contactEmailB64}/${userEmailB64}`)
              .set({ name: username, email: userEmail })
          })
        })
    })
}

export const fetchMessages = (contactEmail) => (dispatch) => {
  // erase current message state
  dispatch({ type: ERASE_MESSAGES_LIST })
  // data from authenticated user
  const { currentUser } = firebase.auth()
  const userEmail = currentUser.email
  const userEmailB64 = base64.encode(userEmail)

  // data from contact
  const contactEmailB64 = base64.encode(contactEmail)

  firebase.database().ref(`/mensagens/${userEmailB64}/${contactEmailB64}`).on('value', snapshot => {
    if (snapshot.val()) {
      const messages = Object.keys(snapshot.val()).map((item) => ({ ...snapshot.val()[item], uid: item }))
      dispatch({
        type: MESSAGES_LIST, payload: messages
      })
    } else {

    }
  })
}
