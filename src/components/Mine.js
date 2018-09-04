import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

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
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topImg}>
            <Image source={require('../img/headImg.jpg')} style={{width: 60, height: 60}}/>
          </View>
          <Text style={{fontSize: 18, color: '#fff'}}>请登录</Text>
        </View>
        <View style={styles.bottom}>
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarUnderlineStyle={{
              backgroundColor: '#000',
              height: 2
            }}
            tabBarBackgroundColor='#FFFFFF'
            tabBarActiveTextColor='#000'
            tabBarInactiveTextColor='#959595'
            tabBarTextStyle={{ fontSize: 14 }}
            locked={false}
          >
            <View tabLabel='讨论' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
            <View tabLabel='想看' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
            <View tabLabel='在看' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
            <View tabLabel='看过' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
            <View tabLabel='影评' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
            <View tabLabel='影人' style={styles.scrollView}>
              <Image source={require('../img/headImg.jpg')} style={styles.headImg}/>
            </View>
          </ScrollableTabView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  topImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#fff',
    marginHorizontal: 30,
    overflow: 'hidden'
  },
  bottom: {
    flex: 2
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headImg: {
    width: 150,
    height: 150
  }
})
