import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const styles = StyleSheet.create({
  searchTextInput: {
    color: Colors.textThird,
    width: 50,
    height: 40,
    flex: 1,
  },
  searchButton: {
    marginTop: 10,
  },
  searchButtonIcon: {
    fontSize: 22,
    color: Colors.textThird,
  },
  searchUnderline: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderPrimary,
  },
  searchLocation: {
    flex: 1,
    marginRight: Metrics.defaultMargin,
    top: Metrics.defaultMargin,
  },
  searchGenre: {
    marginLeft: Metrics.defaultMargin,
    flex: 1,
    top: Metrics.defaultMargin,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this.state = {
      screenWidth: width,
      screenHeight: height,
      searchKeyword: '',
      loading: false,
      page: 0,
      refreshing: false,
      searching: false,
      locationPressed: false,
      genrePressed: false,
    };
    this.locationIndex = 0;
    this.genreIndex = 0;
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({
      screenWidth: width,
      screenHeight: height,
    });
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  onUserPressed(item) {
    this.props.navigation.navigate('player', { id: item.id });
  }

  handleLoadMore() {
    if (!this.state.loading) {
      console.log('load more.....');
    }
  }

  handleRefresh() {
  }

  searchName() {
    this.search();
  }

  searchLocation(locationIndex) {
    this.locationIndex = parseInt(locationIndex, 0);
    this.search();
  }

  searchGenre(genreIndex) {
    this.genreIndex = parseInt(genreIndex, 0);
    this.search();
  }

  search() {
    const name = this.state.searchKeyword;
    const location = this.locationIndex === 0 ? '' : this.props.globals.locations[this.locationIndex];
    const genreId = this.genreIndex === 0 ? '' : this.props.globals.genreIds[this.genreIndex];
    this._search(name, location, genreId);
  }

  async _search(name: '', location: '', genreId: '') {
    console.log('SEARCH', name, location, genreId);
    const radios = await Api.getSearch(name, location, genreId);
    this.props.setRadios(radios);
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
  render() {
    return (
      <View style={Styles.container} >
        {/* BACKGROUND */}
        <Image
          style={Styles.background}
          resizeMode={'cover'}
          source={Images.background} />

        {CommonWidgets.renderStatusBar(Colors.headerColor)}

        {/* NAVIGATIONS */}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          leftButton={CommonWidgets.renderNavBarLeftButton()}
          />

        {/* SEARCH BOX */}
        <View style={Styles.topContainer}>
          <View style={Styles.row}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholderTextColor={Colors.textPlaceholder}
              style={styles.searchTextInput}
              placeholder={'Type Here...'}
              onChangeText={this.onSearchKeywordInputChange.bind(this)}
              onSubmitEditing={() => this.searchName()} />
            <TouchableOpacity onPress={() => this.searchName()} style={styles.searchButton}>
              <Icon name="search" style={styles.searchButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.row}>
            <View style={styles.searchUnderline} />
          </View>
          <View style={Styles.row}>
            <View style={[Styles.dropdownContainer, styles.searchLocation]}>
              <ModalDropdown
                style={Styles.dropdown}
                dropdownStyle={Styles.dropdownBox}
                textStyle={Styles.dropdownText}
                showsVerticalScrollIndicator
                defaultValue={'Localidad'}
                defaultIndex={0}
                adjustFrame={(style) => {
                  const output = style;
                  output.width = (this.state.screenWidth - (Metrics.defaultPadding * 4));
                  return output;
                }}
                onSelect={item => this.searchLocation(item)}
                onDropdownWillShow={() => {
                  this.setState({
                    locationPressed: true,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    locationPressed: false,
                  });
                }}
                renderRow={(item, index, highlight) => CommonWidgets.renderLocationMenuListItem(item, index, highlight)}
                options={this.props.globals.locations} />
              <Icon name={this.state.locationPressed ? 'caret-up' : 'caret-down'} style={Styles.dropdownIcon} />
            </View>
            <View style={[Styles.dropdownContainer, styles.searchGenre]}>
              <ModalDropdown
                style={Styles.dropdown}
                dropdownStyle={Styles.dropdownBox}
                textStyle={Styles.dropdownText}
                showsVerticalScrollIndicator
                defaultValue={'Género'}
                defaultIndex={0}
                adjustFrame={(style) => {
                  const output = style;
                  output.width = (this.state.screenWidth - (Metrics.defaultPadding * 6)) / 2;
                  return output;
                }}
                onSelect={item => this.searchGenre(item)}
                onDropdownWillShow={() => {
                  this.setState({
                    genrePressed: true,
                  });
                }}
                onDropdownWillHide={() => {
                  this.setState({
                    genrePressed: false,
                  });
                }}
                renderRow={(item, index, highlight) => CommonWidgets.renderGenreMenuListItem(item, index, highlight)}
                options={this.props.globals.genres} />
              <Icon name={this.state.genrePressed ? 'caret-up' : 'caret-down'} style={Styles.dropdownIcon} />
            </View>
          </View>
        </View>

        {/* RADIO ITEMS */}
        <View style={Styles.contentContainer}>
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
