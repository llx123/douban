import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from "react-native-vector-icons/Ionicons"

import HotList from './components/HotList';
import Mine from './components/Mine';
import Detail from './components/Detail';
import Seek from './components/Seek';
import Search from './components/Search';

const BottomTab = createBottomTabNavigator({
  MovieList: {
    screen: HotList,
    navigationOptions: {
      tabBarLabel: '热映',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-tv" size={20} color={tintColor} />
      ),
    },
  },
  Seek: {
    screen: Seek,
    navigationOptions: {
      tabBarLabel: 'xxx',
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
  Search
}, {
    headerMode: 'screen'
  });
export default MyApp
