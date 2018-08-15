import { Dimensions, View } from 'react-native';
import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import MovieList from './MovieList';
import SoonList from './SoonList';
import SearchInput from './SearchInput';

const { width, height } = Dimensions.get('window');

export default class PlayList extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={{ width: width, height: height, paddingTop: 25, backgroundColor: '#fff' }}>
        <SearchInput
          city={true}
          navigation={this.props.navigation}
        />
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
          <View tabLabel='正在热映' style={{ marginBottom: 50 }}>
            <MovieList navigation={this.props.navigation} />
          </View>
          <View tabLabel='即将上映' style={{ marginBottom: 50 }}>
            <SoonList navigation={this.props.navigation} />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}
