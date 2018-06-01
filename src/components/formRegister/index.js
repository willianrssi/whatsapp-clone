// react imports
import React from 'react'
import { ActivityIndicator, Button, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'

// assets imports
import backgroundIMG from 'images/bg.png'

// actions imports
import { changeEmail, changePassword, changeName, registerUser } from 'reducers/authReducer/action-creators'

const FormRegister = ({ email, password, name, registerError, loadingRegister, handleChangeEmail, handleChangeName, handleChangePassword, handleRegisterUser }) => (
  <ImageBackground source={backgroundIMG} style={styles.backgroundIMG}>
    <View style={styles.container}>

      <View style={styles.form}>

        <TextInput
          value={name}
          style={styles.formInput}
          onChangeText={(text) => handleChangeName(text)}
          placeholder='Nome'
          placeholderTextColor={'#FFF'}
        />

        <TextInput
          value={email}
          style={styles.formInput}
          onChangeText={(text) => handleChangeEmail(text)}
          placeholder='E-mail'
          placeholderTextColor={'#FFF'}
        />

        <TextInput
          value={password}
          secureTextEntry
          style={styles.formInput}
          onChangeText={(text) => handleChangePassword(text)}
          placeholder='Senha'
          placeholderTextColor={'#FFF'}
        />

        <Text style={styles.registerError}>{registerError}</Text>

      </View>

      <View style={styles.command} >
        {loadingRegister ? <ActivityIndicator color='#FFF' size='large' /> : <Button color='#115E54' title='cadastrar' onPress={() => handleRegisterUser({email, password, name})} />}
      </View>

    </View>
  </ImageBackground>
)

const styles = StyleSheet.create({
  backgroundIMG: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: StatusBar.currentHeight
  },
  form: {
    flex: 4,
    justifyContent: 'center'
  },
  formInput: {
    fontSize: 20,
    height: 45
  },
  registerError: {
    color: 'red',
    fontSize: 18
  },
  command: {
    flex: 1
  }
})

const mapStateToProps = (state) => (
  {
    email: state.authReducer.email,
    name: state.authReducer.name,
    password: state.authReducer.password,
    registerError: state.authReducer.registerError,
    loadingRegister: state.authReducer.loadingRegister
  }
)

const mapDispatchToProps = (dispatch) => ({
  handleChangeEmail: (text) => {
    dispatch(changeEmail(text))
  },
  handleChangeName: (text) => {
    dispatch(changeName(text))
  },
  handleChangePassword: (text) => {
    dispatch(changePassword(text))
  },
  handleRegisterUser: (user) => {
    dispatch(registerUser(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister)
