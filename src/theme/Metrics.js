import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const bottomMargin = 24;
const sHeight = height;
const sWidth = width;
const dMargin = 10;
const metrics = {
  screenWidth: sWidth,
  screenHeight: sHeight,

  searchBarHeight: 30,
  navBarHeight: sHeight * 0.09,
  tabBarHeight: sHeight * 0.073,

  defaultMargin: dMargin,
  defaultPadding: dMargin,

  listItemHeight: sHeight / 9,
  appleSize: sHeight / 15,
  contentHeight: sHeight - 110,
  listItemWidth: sWidth - (dMargin * 2),
  thumbRadius: 10,
  sliderMarkerSize: sWidth / 20,

  buttonWidth: sWidth * 0.8,
  buttonHeight: sHeight / 15,
  logoSize: sWidth / 3,
  footerHeight: sWidth / 7,
  androidMarginBottom: bottomMargin,

  tabBarIconSize: sWidth * 0.064,

  statusBarHeight: 20,

};

export default metrics;
