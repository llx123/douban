import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { StyleSheet, View, Text } from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"

import MovieList from './components/MovieList';
import Mine from './components/Mine';

const BottomTab = createBottomTabNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: {
      tabBarLabel: '热映',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-tv" size={20} color={tintColor} />
      ),
    },
  },
  Photo: {
    screen: Seek,
    navigationOptions: {
      tabBarLabel: '照片',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="iso-eye" size={20} color={tintColor} />
      ),
    },
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-user" size={20} color={tintColor} />
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
  Home: BottomTab,
  Detail: BottomTab
}, {
    headerMode: 'screen'
  });
export default MyApp
