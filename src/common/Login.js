import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class Login extends Component {
  constructor(props) {
    super(props)
    goBack = this.props.navigation.goBack
  }
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Icon name="ios-arrow-back" size={20} color={'green'} onPress={()=>this.goBack()}/>,
    headerLeftContainerStyle: {
      paddingLeft: 10
    }
  });
  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    )
  }
}

export default Login
