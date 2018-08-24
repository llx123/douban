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
      allData: [], //热门
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    let hotData = await this.fetchHot()
    this.setState({
      allData: [{ title: '', data: [{ data: hotData }]}],
      ready: false
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
  render() {
    const { allData } = this.state
    return (
      <View style={styles.seekMovie}>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          : <View>
            <View style={styles.movieTop}>
              <Text>111</Text>
              <Text>222</Text>
            </View>
            <SectionList
              sections={allData}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              renderItem={({ item, index, section }) => {
                return (
                  <View key={index.toString()}>
                    {index === 0 && <ScrollView
                      contentContainerStyle={styles.contentContainer}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {item.data.map((item, index) => {
                        return (
                          <View style={styles.hotItem} key={index.toString()+''+item.title}>
                            <Image source={{
                              uri: item.images.large
                            }} style={{
                              width: 80,
                              height: 100
                            }} />
                            <Text style={styles.smallFont}>{item.title.slice(0, 6)}{item.title.length > 6 ? index : index}</Text>
                            <View style={styles.star}>
                              <Star value={item.rating.stars} />
                              {item.rating.stars > 0 && <Text style={styles.smallFont}>{(item.rating.stars / 10).toFixed(1) + '分'}</Text>}
                            </View>
                          </View>)
                      })}
                    </ScrollView>}                    
                  </View>
                )
              }}
            />
            
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
    lineHeight: 18,
    color: '#A6A6A6',
    fontSize: 10
  },
  star: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
})
