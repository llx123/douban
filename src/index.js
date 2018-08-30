import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  Easing,
  Animated
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"

import HotList from './components/HotList';
import Mine from './components/Mine';
import Detail from './components/Detail';
import Seek from './components/Seek';
import Search from './components/Search';
import Login from './common/Login';

const BottomTab = createBottomTabNavigator({
  MovieList: {
    screen: HotList,
    navigationOptions: {
      tabBarLabel: '热映',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-laptop" size={20} color={tintColor} />
      ),
    },
  },
  Seek: {
    screen: Seek,
    navigationOptions: {
      tabBarLabel: '找片',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-eye" size={20} color={tintColor} />
      ),
    },
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" size={20} color={tintColor} />
      ),
    },
  }
}, {
    tabBarOptions: {
      activeTintColor: '#494949',
      inactiveTintColor: '#999999',
      labelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
      style: {
        borderTopWidth: 1,
        borderTopColor: '#c3c3c3',
        height: 50,
        backgroundColor: '#fff'
      },
    }

  });

const MyApp = createStackNavigator({
  Home: {
    screen: BottomTab,
    navigationOptions: {
      header: null
    }
  },
  Detail,
  Search,
  Login
}, {
    headerMode: 'screen',
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
      },
    }),
  });
export default MyApp
