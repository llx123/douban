import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import Star from './Star';

export default class HotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      movies: []
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch('https://api.douban.com/v2/movie/in_theaters')
      .then((response) => {
        this.setState({ refreshing: false });
        return response.json();
      }).then((responseText) => {
        let arrData = responseText.subjects;
        let arrList = [];
        arrData.map((item, index) => {
          arrList.push({ key: index.toString(), value: item });
        })
        this.setState({ movies: arrList, ready: false, refreshing: false });
      }).catch((error) => {
        console.error(error);
      });
  }
  refreshData = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  }
  filterCount = (count) => count > 10000 ? (count / 10000).toFixed(1) + '万' : count

  render() {
    const { navigate } = this.props.navigation;
    const { movies } = this.state;
    return (
      <View style={{paddingBottom: 50}}>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          : <FlatList
            data={movies}
            onRefresh={this.refreshData}
            refreshing={this.state.refreshing}
            key={movies.key}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.hotList, item.key + 1 == movies.length && styles.lastList
                  ]}
                  onPress={() => navigate('Detail', {
                    id: item.value.id,
                    callback: (data) => {
                      this.setState({ childState: data })
                    }
                  })}
                >
                  <View style={{
                    flex: 1
                  }}>
                    <Image source={{
                      uri: item.value.images.large
                    }} style={{
                      width: 80,
                      height: 100
                    }} />
                  </View>
                  <View style={{
                    height: 100,
                    flex: 2,
                    alignItems: 'flex-start',
                  }}>
                    <Text style={styles.title}>{item.value.title}
                    </Text>
                    <View style={styles.star}>
                      <Star value={item.value.rating.stars} />
                      {item.value.rating.stars>0&&<Text style={styles.smallFont}>{(item.value.rating.stars / 10).toFixed(1) + '分'}</Text>}
                    </View>
                    <Text style={styles.smallFont}>导演：{item.value.directors[0].name}</Text>
                    <Text style={styles.smallFont}>主演：{item.value.casts.map((v) => v.name).join('/')}</Text>
                  </View>
                  <View style={{
                    flex: 0,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      lineHeight: 20,
                      fontSize: 10,
                      color: '#FF4E65'
                    }}>{this.filterCount(item.value.collect_count)}人看过</Text>
                    <TouchableOpacity onPress={() => alert('购票')} style={styles.pay}>
                      <Text style={{
                        color: '#FF4E65',
                        fontSize: 14,
                        fontWeight: '600',
                      }}>购票</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            }} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 18,
    color: '#A6A6A6',
    fontSize: 10
  },
  loadding: {
    marginTop: 100
  },
  hotList: {
    height: 130,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  lastList: {
    borderBottomWidth: 0
  },
  title: {
    fontWeight: '600',
    fontSize: 15
  },
  star: {
    display:'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  pay: {
    width: 52,
    height: 25,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF4E65',
    borderRadius: 5,
  }
})
