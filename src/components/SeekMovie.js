import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import Star from './Star';

const { width, height } = Dimensions.get('window');
const baseUri = 'https://api.douban.com/v2/movie/';

export default class SeekMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: true,
      allData: [],
      topData: [],
      offSetX: 0,
    }
  }
  componentDidMount() {
    this.fetchData()
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
  renderSectionTitle(index) {
    switch (index) {
      case 0:
        return '豆瓣TOP250'
      case 1:
        return '口碑榜'
    }
  }
  render() {
    const { topData, hotData, offSetX } = this.state
    return (
      <ScrollView>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          : <View style={styles.seekMovie}>
            {/* <View style={styles.movieTop}>
              <Text>111</Text>
              <Text>222</Text>
            </View> */}
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
            <View style={{paddingLeft: 20}}>
              <Text>{this.renderSectionTitle(Math.floor(offSetX))}</Text>
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              contentContainerStyle={[styles.tabContainer]}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                let offSetX = e.nativeEvent.contentOffset.x / width;
                this.setState({
                  offSetX
                })
              }}
            >
              <View style={styles.slideTop}>
                {topData.slice(0, 4).map((item, index) => {
                  return <View key={index + '' + item.title} style={styles.renderTitle}>
                    <Text>{index + 1}</Text>
                    <Image source={{
                      uri: item.images.small
                    }} style={{
                      width: 40,
                      marginHorizontal: 10
                    }} />
                    <View >
                      <Text>{item.title}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Star value={item.rating.stars} />
                        {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1)}</Text>}
                        <Text style={styles.smallFont}> {item.collect_count} 人评价</Text>
                      </View>
                    </View>
                  </View>
                })}
              </View>
              <View style={styles.slide2}>
                <Text>{this.state.offSetX / width}</Text>
              </View>
            </ScrollView>
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
    backgroundColor: 'aqua',
    paddingVertical: 20
  },
  contentContainer: {
    width: width * 3,
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
    marginLeft: -20,
    paddingRight: 20
  },
  slideTop: {
    width: width,
    height: 260,
    paddingLeft: 20
  },
  slide2: {
    width: width,
    height: 150,
    backgroundColor: '#ccc'
  },
  renderTitle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    marginVertical: 10
  }
})
