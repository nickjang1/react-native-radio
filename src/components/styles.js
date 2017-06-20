import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  navBarLeft: {
    width: Metrics.screenWidth * 0.75,
    height: 40,
    tintColor: Colors.textThird,
  },
  navBarRightClose: {
    paddingBottom: 0,
  },
  navBarRightCloseImage: {
    width: 40,
    height: 40,
  },
  navBarRightSearch: {
    height: 40,
  },
  navBarRightSearchIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
    paddingBottom: 8,
  },
});

