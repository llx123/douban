import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import Icon from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: 0
    }
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow () {
    // alert('Keyboard Shown');
  }
  _keyboardDidHide () {
    // alert('Keyboard Hidden');
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
          <Text style={{ fontSize: 36, color: 'green', paddingBottom: 30 }}>
            欢迎来到豆瓣
          </Text>
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
            <View style={{width: width*0.9, paddingVertical: 30}}>
              <Button
                onPress={()=>{
                  this.props.login('1111111')
                  alert(JSON.stringify(this.props))
                }}
                title="登录"
                color="green"
              />
            </View>
            <View style={styles.middleBottom}>
              <Text style={{color:'green'}}>注册豆瓣</Text>
              <Text style={{paddingHorizontal: 15}}>|</Text>
              <Text>忘记密码</Text>
            </View>
          </View>
        </View>
        <View>
        <View style={[styles.middleBottom,{paddingBottom: 15}]}>
          <Text><Icon name="logo-github" size={20} /> 微信登录</Text>
          <Text style={{paddingHorizontal: 50}}>|</Text>
          <Text><Icon name="logo-github" size={20} /> 微博登录</Text>
        </View>
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
  },
  middleBottom: {
    flexDirection:'row',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(doLogin(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
