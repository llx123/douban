import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'


export default class Mine extends Component {
  constructor(props){
    super(props)    
  }
  render() {    
    return (
      <View>
        <Text>
          This is Mine!
        </Text>
      </View>
    )    
  }
}