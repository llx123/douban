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
      hotData: [], //热门
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    fetch(`${baseUri}/in_theaters`)
      .then(res => {
        return res.json(); // 正在上映        
      }).then(res => {
        this.setState({
          hotData: res.subjects,
          ready: false
        })
      })
  }
  render() {
    const { hotData } = this.state
    return (
      <View style={styles.seekMovie}>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          : <View>
            <View style={styles.movieTop}>
              <Text>111</Text>
              <Text>222</Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {hotData.map((item, index) => {
                return (
                  <View style={styles.hotItem} key={index}>
                    <Image source={{
                      uri: item.images.large
                    }} style={{
                      width: 80,
                      height: 100
                    }} />
                    <Text style={styles.smallFont}>{item.title.slice(0,6)}{item.title.length>6?index:index}</Text>
                    <View style={styles.star}>
                      <Star value={item.rating.stars} />
                      {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1) + '分'}</Text>}
                    </View>
                  </View>)
              })}
            </ScrollView>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadding: {
    marginTop: 100
  },
  seekMovie: {
    paddingHorizontal: 10,
  },
  movieTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'aqua',
    paddingVertical: 20
  },
  contentContainer: {
    width: width*3,
    height: 800,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  hotItem: {
    width: 110,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallFont: {
    lineHeight: 18,
    color: '#A6A6A6',
    fontSize: 10
  },
  star: {
    display:'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
})
