import React from 'react';
import {
  Platform,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics, Styles, Colors, Fonts, Images } from '@theme/';
import ReviewListItem from './ReviewListItem';
import styles from './styles';

const CommonWidgets = {
  showNetworkError(msg = null) {
    const message = typeof (msg) === 'object' || msg === null ? I18n.t('NETWORK_ERROR') : msg;
    setTimeout(() => {
      Alert.alert('', message);
    }, 50);
  },

  renderStatusBar(color) {
    if (Platform.OS === 'android') {
      return (
        <StatusBar
          backgroundColor={color}
          barStyle={'light-content'}
          translucent />
      );
    }
    return (
      <View style={{ height: 20, backgroundColor: Colors.headerColor }}>
        <StatusBar
          backgroundColor={color}
          barStyle={'light-content'}
          translucent />
      </View>
    );
  },

  renderNavBarLeftButton() {
    return (
      <Image
        style={styles.navBarLeft}
        resizeMode={'contain'}
        source={Images.logo} />
    );
  },

  renderNavBarRightButton(onPress) {
    return (
      <TouchableOpacity
        style={styles.navBarRightClose}
        onPress={onPress} >
        <Image
          style={styles.navBarRightCloseImage}
          resizeMode={'contain'}
          source={Images.close} />
      </TouchableOpacity>
    );
  },

  renderNavBarRightButtonSearch(onPress) {
    return (
      <TouchableOpacity
        style={styles.navbarRightSearch}
        onPress={onPress} >
        <Icon name="search" style={styles.navBarRightSearchIcon} />
      </TouchableOpacity>
    );
  },

  renderNavRightButtonHome(onPress) {
    return (
      <TouchableOpacity
        style={styles.navbarRightSearch}
        onPress={onPress} >
        <Icon name="home" style={styles.navBarRightSearchIcon} />
      </TouchableOpacity>
    );
  },

  renderMenuListItem(item) {
    return (
      <TouchableOpacity
        key={item}
        style={Styles.dropdownItem}
      >
        <View style={{ flex: 1, padding: 0, paddingBottom: 0, flexDirection: 'row', backgroundColor: 'white' }}>
          <Icon name="certificate" size={25} color="black" />
          <Text style={{ padding: 5, fontSize: 15, paddingBottom: 0, color: 'black', margin: 0 }}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  renderGenreMenuListItem(item, index, highlight) {
    if (highlight) {
      return (
        <TouchableOpacity
          key={item}
          style={Styles.dropdownItem}
          >
          <View style={Styles.dropdownItemInnerHighlight}>
            <Text style={Styles.dropdownItemTextHighlight}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={item}
        style={Styles.dropdownItem}
      >
        <View style={Styles.dropdownItemInner}>
          <Text style={Styles.dropdownItemText}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  renderLocationMenuListItem(item, index, highlight) {
    if (highlight) {
      return (
        <TouchableOpacity
          key={item}
          style={Styles.dropdownItem}
          >
          <View style={Styles.dropdownItemInnerHighlight}>
            <Icon name="location-arrow" style={Styles.dropdownItemIconHighlight} />
            <Text style={Styles.dropdownItemTextHighlight}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={item}
        style={Styles.dropdownItem}
      >
        <View style={Styles.dropdownItemInner}>
          <Icon name="location-arrow" style={Styles.dropdownItemIcon} />
          <Text style={Styles.dropdownItemText}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  renderChannelMenuListItem(item, index, highlight) {
    if (highlight) {
      return (
        <TouchableOpacity
          key={item}
          style={Styles.dropdownItem}
          >
          <View style={Styles.dropdownItemInnerHighlight}>
            <Icon name="circle" style={Styles.dropdownItemIconHighlight} />
            <Text style={Styles.dropdownItemTextHighlight}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={item}
        style={Styles.dropdownItem}
        >
        <View style={Styles.dropdownItemInner}>
          <Icon name="circle" style={Styles.dropdownItemIcon} />
          <Text style={Styles.dropdownItemText}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  renderReviewListItem(item, onPress) {
    return (
      <ReviewListItem item={item} onPress={onPress} />
    );
  },
};
export default CommonWidgets;
