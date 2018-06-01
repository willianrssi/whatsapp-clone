import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Button, View, Text, TextInput, StyleSheet } from 'react-native'
import { changeEmail, addContact, addContactAgain } from 'reducers/appReducer/action-creators'

const AddContact = ({ email, handleChangeEmail, handleAddContact, handleAddContactAgain, isLoading, errorMessage, userAdded }) => (
  userAdded
    ? <View style={styles.container}>
      <View style={styles.containerSuccessMessage}>
        <Text style={styles.successMessage}>Usuário cadastrado com Sucesso</Text>
      </View>
      <View style={styles.containerAddUserAgain}>
        <Button color='#115E54' title='Adicionar Novo Usuário' onPress={() => handleAddContactAgain()} />
      </View>
    </View>
    : <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput style={styles.emailInput} placeholder='E-Mail' value={email} onChangeText={(text) => handleChangeEmail(text)} />
      </View>
      <View style={styles.containerButton}>
        {isLoading ? <ActivityIndicator size='large' /> : <Button color='#115E54' title='Adicionar' onPress={() => handleAddContact(email)} />}
        <Text style={styles.errorMessage} >{errorMessage}</Text>
      </View>
    </View>

)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  containerInput: {
    flex: 1,
    justifyContent: 'center'
  },
  containerButton: {
    flex: 1
  },
  emailInput: {
    fontSize: 20,
    height: 45
  },
  errorMessage: {
    color: 'red',
    marginTop: 10
  },
  successMessage: {
    color: 'green',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25
  },
  containerSuccessMessage: {
    flex: 1,
    justifyContent: 'center'
  },
  containerAddUserAgain: {
    flex: 1
  }
})

const mapStateToProps = (state) => ({
  email: state.appReducer.email,
  isLoading: state.appReducer.isLoading,
  errorMessage: state.appReducer.errorMessage,
  userAdded: state.appReducer.userAdded
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeEmail: (text) => {
    dispatch(changeEmail(text))
  },
  handleAddContact: (contactEmail) => {
    dispatch(addContact(contactEmail))
  },
  handleAddContactAgain: () => {
    dispatch(addContactAgain())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)
