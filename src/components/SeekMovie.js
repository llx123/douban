import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const baseUri = 'https://api.douban.com/v2/movie/';

export default class SeekMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: true,
      allData: []
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
          allData: [{title: '豆瓣热门', data: res.subjects}],
          ready: false
        })
      })
  }
  render() {
    const { allData } = this.state
    return (
      <View>
        <View style={styles.movieTop}>
          <Text>111</Text>
          <Text>222</Text>
        </View>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding} />
          :<SectionList
          sections={allData}          
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item, index, section }) => {
            return (
              <View>
                <Text>{JSON.stringify(section)}</Text>
              </View>
            )
          }}
        />}
        {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {[1, 1, 1, 1, 1, 11, 1].map((item, index) => <Text key={index.toString()} style={{ width: 300, backgroundColor: 'red' }}>{item}</Text>)}
        </ScrollView> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movieTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'aqua',
    paddingVertical: 20
  }
})
