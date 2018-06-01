import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Button, ImageBackground, StyleSheet, StatusBar, Text, TextInput, TouchableHighlight, View, KeyboardAvoidingView } from 'react-native'

import backgroundIMG from 'images/bg.png'

import { changeEmail, changePassword, authUser } from 'reducers/authReducer/action-creators'

const FormLogin = ({ navigation, email, password, handleChangeEmail, handleChangePassWord, handleAuthUser, authenticationError, loadingLogin }) => (
  <ImageBackground source={backgroundIMG} style={styles.backgroundIMG}>
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>

      <View style={styles.title}>
        <Text style={styles.titleTxt}>WhatsApp Clone</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.formInput} onChangeText={(text) => handleChangeEmail(text)} placeholder='E-mail' placeholderTextColor={'#FFF'} value={email} />
        <TextInput secureTextEntry style={styles.formInput} onChangeText={(text) => handleChangePassWord(text)} placeholder='Senha' placeholderTextColor={'#FFF'} value={password} />

        <TouchableHighlight onPress={() => navigation.navigate('Register')}>
          <Text style={styles.formTxt}>Ainda não tem cadastro? Cadastre-se</Text>
        </TouchableHighlight>
        <Text style={styles.authError}>{authenticationError}</Text>
      </View>

      <View style={styles.command}>
        { loadingLogin ? <ActivityIndicator color='#FFF' size='large' /> : <Button color='#115E54' style={styles.commandBtn} title='Acessar' onPress={() => handleAuthUser({email, password})} /> }
      </View>
    </KeyboardAvoidingView>
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
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt: {
    color: '#FFF',
    fontSize: 25
  },
  form: {
    flex: 2
  },
  formInput: {
    fontSize: 20,
    height: 45
  },
  formTxt: {
    color: '#FFF',
    fontSize: 20
  },
  command: {
    flex: 2,
    paddingTop: 60
  },
  commandBtn: {
    color: '#115E54'
  },
  authError: {
    color: 'red'
  }
})

const mapStateToProps = (state) => ({
  email: state.authReducer.email,
  password: state.authReducer.password,
  authenticationError: state.authReducer.authenticationError,
  loadingLogin: state.authReducer.loadingLogin
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeEmail: (text) => {
    dispatch(changeEmail(text))
  },
  handleChangePassWord: (text) => {
    dispatch(changePassword(text))
  },
  handleAuthUser: (user) => {
    dispatch(authUser(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)
