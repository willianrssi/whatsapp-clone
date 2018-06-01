import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'

import { addContactAgain } from 'reducers/appReducer/action-creators'

import NavigationService from 'services/navigator'

import addImage from 'images/adicionar-contato.png'

const TabBarMenu = ({handleAddContactAgain}) => (
  <View style={styles.container} >
    <TouchableOpacity style={styles.addButton} onPress={() => handleAddContactAgain()} >
      <Image source={addImage} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.logout} onPress={() => logout()}>
      <Text style={styles.text}>Sair</Text>
    </TouchableOpacity>
  </View>
)

const logout = () => {
  firebase.auth().signOut()
    .then(
      NavigationService.navigate('Login')
    )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    flexDirection: 'row'
  },
  addButton: {
    marginRight: 15
  },
  text: {
    paddingTop: 2,
    color: '#FFF'
  }
})

const mapDispatchToProps = (dispatch) => ({
  handleAddContactAgain: () => {
    dispatch(addContactAgain())
    NavigationService.navigate('AddContact')
  }
})

export default connect(null, mapDispatchToProps)(TabBarMenu)
