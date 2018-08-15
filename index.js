/** @format */

import {AppRegistry, YellowBox} from 'react-native';
// import App from './App';
import App from './src';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => App);
