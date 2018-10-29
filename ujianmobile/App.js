import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from '@firebase/app';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Main from './src/components/Main';

class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDvK-DLjH9_BnoQHK6jXY989MLfGdyOdf0",
      authDomain: "ujianmobile-68e46.firebaseapp.com",
      databaseURL: "https://ujianmobile-68e46.firebaseio.com",
      projectId: "ujianmobile-68e46",
      storageBucket: "ujianmobile-68e46.appspot.com",
      messagingSenderId: "974538320037"
    };
    firebase.initializeApp(config);  
  }

  render() {
    console.disableYellowBox = true
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
