// react-navigation imports
import { createStackNavigator } from 'react-navigation'

import React from 'react'

// imported Components
import FormLogin from 'components/formLogin'
import FormRegister from 'components/formRegister'
import Welcome from 'components/welcome'
import Main from 'components/main'
import AddContact from 'components/addContact'
import TabBarMenu from 'components/main/tabBarMenu'
import Chat from 'components/chat'

export const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: FormLogin,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: FormRegister,
      navigationOptions: {
        title: 'Cadastro',
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#115E54'
        },
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: 'normal'
        }
      }
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerLeft: null,
        headerRight: <TabBarMenu />,
        title: 'WhatsApp Clone',
        headerTintColor: '#FFF',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#115E54'
        },
        headerTitleStyle: {
          marginRight: -15,
          flex: 1,
          textAlign: 'center',
          color: '#FFF',
          fontWeight: 'normal'
        }
      }
    },
    AddContact: {
      screen: AddContact,
      navigationOptions: {
        headerTintColor: '#FFF',
        title: 'Adicionar Contato',
        headerStyle: {
          backgroundColor: '#115E54'
        },
        headerTitleStyle: {
          marginLeft: -15,
          flex: 1,
          textAlign: 'center',
          color: '#FFF',
          fontWeight: 'normal'
        }
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#115E54'
        },
        headerTitleStyle: {
          marginLeft: -25,
          flex: 1,
          textAlign: 'center',
          color: '#FFF',
          fontWeight: 'normal'
        }
      }
    }

  },
  {
    initialRouteName: 'Login'
  }
)
