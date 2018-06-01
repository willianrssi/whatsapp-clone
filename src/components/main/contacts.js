import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native'

import { fetchUserContacts } from 'reducers/contactsListReducer/action-creators'

class Contact extends Component {
  componentWillMount () {
    this.props.handlefetchUserContacts()
    console.log(this.props.contacts)
  }

  renderContact (contact) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {name: contact.name, email: contact.email})} style={styles.contact}>
        <Text style={styles.contactTxtName} >{contact.name}</Text>
        <Text style={styles.contactTxtName} >{contact.email}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return this.props.isLoading ? <ActivityIndicator size='large' style={{marginTop: 30}} /> : (
      <View style={styles.container}>
        <FlatList
          data={this.props.contacts}
          keyExtractor={item => item.uid}

          renderItem={(({ item }) => this.renderContact(item))}

          ListEmptyComponent={() => <View><Text>Você não possui contatos</Text></View>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  contact: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    flex: 1,
    padding: 20
  },
  contactTxtName: {
    fontSize: 20
  },
  contactTxtEmail: {
    fontSize: 14
  }
})

const mapStateToProps = (state) => ({
  contacts: state.contactsListReducer.contacts,
  isLoading: state.contactsListReducer.isLoading
})
const mapDispatchToProps = (dispatch) => ({
  handlefetchUserContacts: () => {
    dispatch(fetchUserContacts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
