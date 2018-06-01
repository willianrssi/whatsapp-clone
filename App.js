// react imports
import React from 'react'

// redux imports
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './src/reduxFlow'

// navigator service
import NavigatorService from './src/services/navigator'

// App navigator
import { AppNavigator } from 'navigators/appNavigator'

// firebase imports
import firebase from 'firebase'
import { firebaseConfig } from 'config/firebase'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

export default class App extends React.Component {
  componentWillMount () {
    firebase.initializeApp(firebaseConfig)
  }

  render () {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef)
          }}
        />
      </Provider>
    )
  }
}
