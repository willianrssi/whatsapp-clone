import React, { Component } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchUserChats } from 'reducers/chatListReducer/action-creators'

class Chats extends Component {
  componentWillMount () {
    this.props.handleFetchUserChats()
  }

  renderChat (chat) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {name: chat.name, email: chat.email})} style={styles.chat}>
        <Text style={styles.chatTxtName} >{chat.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      this.props.isLoading
        ? <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        : <View style={styles.container}>
          <FlatList
            data={this.props.chats}
            keyExtractor={item => item.email}

            renderItem={(({ item }) => this.renderChat(item))}

            ListEmptyComponent={() => <View><Text>Você não possui conversas</Text></View>}
          />
        </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.chatListReducer.isLoading,
  chats: state.chatListReducer.chats
})

const mapDispatchToProps = (dispatch) => ({
  handleFetchUserChats: () => {
    dispatch(fetchUserChats())
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  chat: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    flex: 1,
    padding: 20
  },
  chatTxtName: {
    fontSize: 20
  },
  chatTxtEmail: {
    fontSize: 14
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chats)
