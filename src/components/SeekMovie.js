import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Star from './Star';
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');
const baseUri = 'https://api.douban.com/v2/movie';

export default class SeekMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: true,
      allData: [],
      topData: [],
      weeklyData: [],
      usData: [],
      offSetX: 0,
    }
  }
  componentDidMount() {
    this.fetchData() // 同步数据获取
    // this.fetchWeekly() // 口碑榜
    this.fetchUs() //北美票房
  }
  fetchData = async () => {
    let hotData = await this.fetchHot()
    let topData = await this.fetchTop()
    this.setState({
      ready: false,
      hotData,
      topData
    })
  }
  fetchHot = async () => { // 电影热榜    
    try {
      let response = await fetch(`${baseUri}/in_theaters`);
      let responseJson = await response.json();
      return responseJson.subjects;
    } catch (error) {
      console.error(error);
    }
  }
  fetchTop = async () => { // TOP250    
    try {
      let response = await fetch(`${baseUri}/top250`);
      let responseJson = await response.json();
      return responseJson.subjects;
    } catch (error) {
      console.error(error);
    }
  }
  fetchWeekly() {
    fetch(`${baseUri}/weekly`)
      .then((response) => {
        this.setState({ refreshing: false });
        return response.json();
      }).then((responseText) => {
        let arrData = responseText.subjects;
        this.setState({ weeklyData: arrData });
      }).catch((error) => {
        console.error(error);
      });
  }
  fetchUs() {
    fetch(`${baseUri}/us_box`)
      .then((response) => {
        this.setState({ refreshing: false });
        return response.json();
      }).then((responseText) => {
        let arrData = responseText.subjects;
        this.setState({ usData: arrData });
      }).catch((error) => {
        console.error(error);
      });
  }
  renderSectionTitle(index) {
    switch (index) {
      case 0:
        return '豆瓣TOP250'
      case 1:
        return '本周口碑榜'
    }
  }
  toLogin() { //登录页
    const { navigate } = this.props.navigation;
    const { userName } = this.props.state.login;
    if(userName) {
      navigate('Mine')
    } else {
      navigate('Login')
    }    
  }
  render() {
    const { topData, hotData, weeklyData, usData, offSetX } = this.state
    const { userName } = this.props.state.login;
    return (
      <ScrollView>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          : <View style={styles.seekMovie}>
            <View style={styles.movieTop}>
              <TouchableOpacity style={[styles.topContent, { borderRightWidth: 1, borderRightColor: '#ccc' }]}>                            
                <View style={[styles.topConLeft, { backgroundColor: 'purple' }]}>
                  <Icon name="ios-menu" size={16} color={'#fff'} />
                </View>
                <View>
                  <Text style={{ fontWeight: '600' }}>找电影</Text>
                  <Text style={{ fontSize: 12 }}>科幻/美国/治愈</Text>
                </View>
                <View>
                  <Icon name="ios-arrow-forward" size={20} color={'red'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topContent} onPress={this.toLogin.bind(this)}>
                <View style={[styles.topConLeft, { backgroundColor: 'pink' }]}>
                  <Icon name="ios-heart" size={16} color={'red'} />
                </View>
                <View>
                  <Text style={{ fontWeight: '600' }}>我的影视</Text>
                  <Text style={{ fontSize: 12 }}>{userName?userName:'未登录'}</Text>
                </View>
                <View>
                  <Icon name="ios-arrow-forward" size={20} color={'red'} />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {hotData.map((item, index) => {
                return (
                  <View style={styles.hotItem} key={index.toString() + '' + item.title}>
                    <Image source={{
                      uri: item.images.large
                    }} style={{
                      width: 80,
                      height: 100
                    }} />
                    <View style={{ width: 80, justifyContent: 'flex-start' }}>
                      <Text style={[styles.smallFont, { marginTop: 3, fontWeight: '600', color: '#000' }]}>{item.title.slice(0, 6)}{item.title.length > 6 ? '...' : ''}</Text>
                    </View>
                    <View style={styles.star}>
                      <Star value={item.rating.stars} />
                      {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1)}</Text>}
                    </View>
                  </View>)
              })}
            </ScrollView>
            <View style={{ paddingLeft: 20 }}>
              <Text>{this.renderSectionTitle(Math.round(offSetX))}</Text>
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              alwaysBounceHorizontal={true}
              contentContainerStyle={[styles.tabContainer]}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                let offSet = e.nativeEvent.contentOffset.x;
                this.setState({
                  offSetX: offSet / width
                })
              }}
            >
              <View style={[styles.slideTop, { paddingLeft: 20, marginRight: -25 }]}>
                {topData.slice(0, 4).map((item, index) => {
                  return <View key={index + '' + item.title} style={styles.renderTitle}>
                    <Text>{index + 1}</Text>
                    <Image source={{
                      uri: item.images.small
                    }} style={{
                      width: 40,
                      marginHorizontal: 10
                    }} />
                    <View style={styles.rightContent}>
                      <View>
                        <Text>{item.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Star value={item.rating.stars} />
                          {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1)}</Text>}
                          <Text style={styles.smallFont}> {item.collect_count}人评价</Text>
                        </View>
                      </View>
                      {index % 2 === 0 && <View>
                        <Icon name="ios-arrow-round-up" size={20} color={'red'} />
                      </View>}
                    </View>
                  </View>
                })}
              </View>
              {false && <View style={styles.slideTop}>
                {weeklyData.slice(0, 4).map((item, index) => {
                  return <View key={index + '' + item.title} style={styles.renderTitle}>
                    <Text>{index + 1}</Text>
                    <Image source={{
                      uri: item.images.small
                    }} style={{
                      width: 40,
                      marginHorizontal: 10
                    }} />
                    <View style={styles.rightContent}>
                      <Text>{item.title}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Star value={item.rating.stars} />
                        {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1)}</Text>}
                        <Text style={styles.smallFont}> {item.collect_count}人评价</Text>
                      </View>
                    </View>
                  </View>
                })}
              </View>}
              <View style={styles.slideTop}>
                {usData.slice(0, 4).map((item, index) => {
                  return <View key={index + '' + item.subject.title} style={styles.renderTitle}>
                    <Text>{index + 1}</Text>
                    <Image source={{
                      uri: item.subject.images.small
                    }} style={{
                      width: 40,
                      marginHorizontal: 10
                    }} />
                    <View style={styles.rightContent}>
                      <View>
                        <Text>{item.subject.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Star value={item.subject.rating.stars} />
                          {item.subject.rating.stars > 0 && <Text style={styles.smallFont}>{(item.subject.rating.stars / 10).toFixed(1)}</Text>}
                          <Text style={styles.smallFont}> {item.subject.collect_count}人评价</Text>
                        </View>
                      </View>
                      {index % 2 !== 0 && <View>
                        <Icon name="ios-arrow-round-up" size={20} color={'red'} />
                      </View>}
                    </View>
                  </View>
                })}
              </View>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
              <Text onPress={()=>alert('navigate to')}>全部{Math.round(offSetX)===0?250:10}部</Text>
            </View>
          </View>}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loadding: {
    marginTop: 100
  },
  seekMovie: {
    paddingBottom: 50,
  },
  movieTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  topContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  topConLeft: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13
  },
  contentContainer: {
    width: width * 2.88,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  hotItem: {
    width: 110,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallFont: {
    lineHeight: 15,
    color: '#A6A6A6',
    fontSize: 10
  },
  star: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  tabContainer: {

  },
  slideTop: {
    width: width * 0.95,
    height: 260,
  },
  renderTitle: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  rightContent: {
    width: width * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
})
