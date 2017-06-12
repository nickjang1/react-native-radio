import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity,  FlatList, ActivityIndicator } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { SearchBar, CheckBox } from 'react-native-elements';

import { Styles, Images, Fonts, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setRadios } from '@actions/globals';
import Api from '@api';

import Utils from '@src/utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      loading: false,
      page: 0,
      refreshing: false,
      searching: false,
    };
  }
  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }
  renderHeader() {
    return null;
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator size={'large'} />
    );
  }
  handleRefresh() {
  }
  handleLoadMore() {
    if (!this.state.loading) {
      console.log('load more.....');
    }
  }
  onUserPressed(item) {
    this.props.navigation.navigate('player', { id: item.id });
  }
  async searchName() {
    const radios = await Api.getNameSearch(this.state.searchKeyword);
    this.props.setRadios(radios);
  }
  async searchLocation(index) {
    const radios = await Api.getLocationSearch(this.props.globals.locations[index]);
    this.props.setRadios(radios);
  }
  async searchGenre(index) {
    const radios = await Api.getGenreSearch(this.props.globals.genres[index]);
    this.props.setRadios(radios);
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        {CommonWidgets.renderStatusBar(Colors.headerColor)}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          leftButton={CommonWidgets.renderNavBarLeftButton()}
          rightButton={CommonWidgets.renderNavBarRightButton(() => this.props.navigation.goBack())} />
        <View style={[Styles.listContainer]}>
          <View style={{ width: Metrics.screenWidth, justifyContent: 'center', alignItems: 'center', height: 100, backgroundColor: '#1f1f1f' }}>
            <View style={{ flexDirection: 'row' }}>
              <SearchBar
                containerStyle={{ flex: 1, backgroundColor: '#1f1f1f', borderTopWidth: 0, borderBottomWidth: 0 }}
                inputStyle={[{ backgroundColor: '#9f9f9f', color: 'white' }]}
                placeholder="Type Here..."
                onChangeText={this.onSearchKeywordInputChange.bind(this)} />
              <TouchableOpacity onPress={() => this.searchName()}>
                <Icon name="search" size={25} color="white" style={{ marginTop: 15 }} />
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <ModalDropdown
                style={{ flex: 1, top: 5, paddingLeft: 30, paddingRight: 30, left: 0 }}
                textStyle={{ color: 'white' }}
                showsVerticalScrollIndicator
                defaultValue={'Select Location'}
                onSelect={(item) => this.searchLocation(item)}
                renderRow={( item ) => CommonWidgets.renderMenuListItem(item)}
                options={this.props.globals.locations} />
              <ModalDropdown
                style={{ flex: 1, top: 5, paddingLeft: 30, paddingRight: 30, left: 0 }}
                textStyle={{ color: 'white' }}
                showsVerticalScrollIndicator
                defaultValue={'Select Genre'}
                onSelect={(item) => this.searchGenre(item)}
                renderRow={(item) => CommonWidgets.renderMenuListItem(item)}
                options={this.props.globals.genres} />
            </View>
          </View>

          <Image
            style={{ flex: 1, width: null, height: null, paddingTop: 15 }}
            resizeMode={'stretch'}
            source={Images.background}>
            <FlatList
              keyboardShouldPersistTaps={'always'}
              data={this.props.globals.radios}
              renderItem={({ item }) => CommonWidgets.renderReviewListItem(item, () => this.onUserPressed(item))}
              keyExtractor={item => item.id}
              ListHeaderComponent={this.renderHeader.bind(this)}
              ListFooterComponent={this.renderFooter.bind(this)}
              onRefresh={this.handleRefresh.bind(this)}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={50} />
          </Image>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setRadios: radios => dispatch(setRadios(radios)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
