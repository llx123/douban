/** @format */
import React, { Component } from 'react';
import {AppRegistry, YellowBox} from 'react-native';
// import App from './App';
import App from './src';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const store = configureStore();

class myApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}


AppRegistry.registerComponent(appName, () => myApp);
