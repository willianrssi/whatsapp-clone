import { createMaterialTopTabNavigator } from 'react-navigation'

import Contacts from './contacts'
import Chats from './chats'

export default createMaterialTopTabNavigator({
  Conversas: { screen: Chats },
  Contatos: { screen: Contacts }
}, {
  tabBarOptions: {
    showLabel: true,
    style: {
      backgroundColor: '#115E54'
    }
  }
})
