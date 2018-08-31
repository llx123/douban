import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: 0
    }
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  render() {
    const { isFocus } = this.state
    return (
      <View style={styles.container}>
        <View style={{ width, flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10, paddingLeft: 10 }}>
          <Icon name="ios-arrow-back" size={20} color={'green'} onPress={() => this.props.navigation.goBack()} />
        </View>
        <View style={{ width, paddingHorizontal: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 36, color: 'green' }}>欢迎来到豆瓣</Text>
          <TextInput
            style={[styles.loginInput,{borderBottomColor: isFocus===1?'green':'#ccc'}]}
            underlineColorAndroid='transparent'
            onFocus={()=>this.setState({isFocus: 1})}
            onChangeText={(text) => this.setState({ text })}
            placeholder='手机号/邮箱'
            placeholderTextColor='#ccc'
          />
          <TextInput
            style={[styles.loginInput,{borderBottomColor: isFocus===2?'green':'#ccc'}]}
            underlineColorAndroid='transparent'
            onFocus={()=>this.setState({isFocus: 2})}
            onChangeText={(text) => this.setState({ text })}
            placeholder='密码'
            placeholderTextColor='#ccc'
          />
          <View>
            <Text>111</Text>
            <Text>222</Text>
          </View>
        </View>
        <View>
          <Text>bottom</Text>
          <Text>bottom</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loginInput: {
    width: width*0.9,
    height: 40,
    borderBottomWidth: 2
  }
})

export default Login
