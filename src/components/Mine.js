import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class My extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      color: '#000'
    }
  }  
  componentDidMount() {

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image source={require('../img/headImg.jpg')} style={{
          width: 200,
          height: 200
        }} />
      </View>
    );
  }
}
