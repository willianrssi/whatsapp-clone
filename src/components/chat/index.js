import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, TextInput, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { changeMessage, sendMessage, fetchMessages } from 'reducers/appReducer/action-creators'

import sendImage from 'images/enviar_mensagem.png'

class Chat extends Component {
  constructor (props) {
    super()
    this.name = props.navigation.getParam('name')
    this.email = props.navigation.getParam('email')
  }

  componentWillMount () {
    this.props.handleFetchMessages(this.email)
  }

  static navigationOptions ({ navigation }) {
    return {
      title: navigation.getParam('name')
    }
  }

  renderMessage (message) {
    return (
      <View style={[{
        alignItems: message.tipo === 'send' ? 'flex-end' : 'flex-start',
        marginLeft: message.tipo === 'send' ? 40 : 5,
        marginRight: message.tipo === 'send' ? 5 : 40
      }, styles.message]}>

        <Text style={[{
          backgroundColor: message.tipo === 'send' ? '#dbf5b4' : '#FFF'
        },
        styles.messageTxt
        ]}>
          {message.message}
        </Text>
      </View>
    )
  }

  render () {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={80} style={styles.container} behavior='padding' enabled>

        <View style={styles.containerTxt}>
          <FlatList
            data={this.props.messagesList}
            keyExtractor={item => item.uid}

            renderItem={(({ item }) => this.renderMessage(item))}

            ListEmptyComponent={() => <View />}

            ref={ref => { this.flatList = ref }}
            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}

          />
        </View>
        <View style={styles.containerInput}>
          <TextInput style={styles.input} placeholder='Digite aqui...' value={this.props.message} onChangeText={(text) => this.props.handleChangeMessage(text)} />

          {!!this.props.message && <TouchableOpacity style={styles.sendButton} onPress={() => this.props.handleSendMessage(this.props.message, this.name, this.email)} >
            <Image style={styles.sendImage} source={sendImage} />
          </TouchableOpacity>}

        </View>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEE4dc'
  },
  containerTxt: {
    flex: 1,
    paddingBottom: 20
  },
  containerInput: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    flexDirection: 'row',
    height: 60,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  input: {
    flex: 6,
    height: 40,
    marginVertical: 10,
    paddingLeft: 5
  },
  sendButton: {
    flex: 1
  },
  sendImage: {
    marginLeft: '20%',
    resizeMode: 'contain',
    width: '80%'
  },
  message: {
    marginVertical: 5
  },
  messageTxt: {
    elevation: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 10
  }
})

const mapStateToProps = (state) => ({
  message: state.appReducer.message,
  messagesList: state.appReducer.messagesList
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeMessage: (text) => dispatch(changeMessage(text)),
  handleSendMessage: (message, name, email) => dispatch(sendMessage(message, name, email)),
  handleFetchMessages: (email) => dispatch(fetchMessages(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
