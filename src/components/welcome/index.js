import React from 'react'
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import logo from 'images/logo.png'
import backgroundIMG from 'images/bg.png'

const Welcome = ({navigation}) => (
  <ImageBackground source={backgroundIMG} style={styles.backgroundIMG}>
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>Seja Bem-Vindo</Text>
        <Image source={logo} />
      </View>

      <View style={styles.command}>
        <Button title='Fazer Login' onPress={() => navigation.navigate('Login')} />
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
    padding: 15
  },
  title: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center'
  },
  titleTxt: {
    color: '#FFF',
    fontSize: 20
  },
  command: {
    flex: 1
  }
})

export default connect()(Welcome)
