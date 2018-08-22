import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ActivityIndicator
} from 'react-native';

export default class SoonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      movies: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch('https://api.douban.com/v2/movie/coming_soon')
      .then((response) => {
        this.setState({ refreshing: false });
        return response.json(); //
      }).then((responseText) => {
        let arrData = responseText.subjects;
        let arrList = [];
        arrData.map((item, index) => {
          arrList.push({ title: index.toString(), data: [item] });
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
  render() {
    const { movies } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        {
          this.state.ready
            ? <ActivityIndicator size="large" style={styles.loadding} />
            : <SectionList
              sections={movies}
              onRefresh={this.refreshData}
              refreshing={this.state.refreshing}
              stickySectionHeadersEnabled={true}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: "bold", backgroundColor: '#cccccc' }}>{title}</Text>
              )}
              renderItem={({ item, index, section }) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.hotList, item.title + 1 == movies.length && styles.lastList
                    ]}
                    key={index.toString()}
                    onPress={() => navigate('Detail', {
                      id: item.id,
                      callback: (data) => {
                        this.setState({ childState: data })
                      }
                    })}
                  >
                    <View style={{
                      flex: 1
                    }}>
                      <Image source={{
                        uri: item.images.large.replace('webp', 'png')
                      }} style={{
                        width: 80,
                        height: 100
                      }} />
                    </View>
                    <View style={{
                      flex: 2,
                      alignItems: 'flex-start'
                    }}>
                      <Text style={styles.title}>{item.title}
                      </Text>
                      <Text style={styles.smallFont}>导演：{item.directors[0].name}</Text>
                      <Text style={styles.smallFont}>主演：{item.casts.map((v) => v.name).join('/')}</Text>                      
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
                        color: '#FFAE31',
                      }}>{item.collect_count}人想看</Text>
                      <TouchableOpacity onPress={() => alert('想看')} style={styles.pay}>
                        <Text style={{
                          color: '#FFAE31',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>想看</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#A6A6A6',
    fontSize: 12
  },
  loadding: {
    marginTop: 100
  },
  star: {
    width: 12,
    height: 12,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 2
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
    fontWeight: '900',
    fontSize: 15
  },
  pay: {
    width: 50,
    height: 25,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFAE31',
    borderRadius: 5,
  }
})
