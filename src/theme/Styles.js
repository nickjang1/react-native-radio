import { Platform } from 'react-native';

import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';


const Styles = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horzCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarStyle: {
    alignItems: 'flex-end',
    backgroundColor: Colors.brandPrimary,
    height: Metrics.navBarHeight,
    marginTop: Platform.OS === 'ios' ? -Metrics.statusBarHeight : 0,
  },
  navBarLeft: {
    height: Metrics.navBarHeight - (Metrics.defaultMargin * 2),
    marginLeft: Metrics.defaultMargin,
    width: Metrics.screenWidth * 0.75,
    tintColor: Colors.textThird,
  },
  navBarRight: {
    tintColor: Colors.textThird,
  },
  navBarRightIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
    margin: Metrics.defaultMargin,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundSecondary,
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  topContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: Metrics.defaultPadding * 2,
    shadowColor: Colors.backgroundPrimary,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Metrics.defaultPadding * 2,
  },

  // Dropdown Styles
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    backgroundColor: Colors.backgroundThird,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.borderThird,
  },
  dropdownIcon: {
    position: 'absolute',
    right: Metrics.defaultPadding,
    top: Metrics.defaultPadding,
    color: Colors.textPrimary,
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  dropdownText: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundThird,
    width: '100%',
    height: '100%',
    padding: Metrics.defaultPadding,
    paddingRight: Metrics.defaultMargin * 2,
    fontSize: 14,
  },
  dropdownBox: {
    backgroundColor: Colors.textThird,
  },
  dropdownItem: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderPrimary,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.itemColor,
  },
  dropdownItemInner: {
    backgroundColor: Colors.textThird,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.dropdownItemHeight,
    paddingLeft: Metrics.defaultPadding * 2,
    paddingRight: Metrics.defaultPadding * 2,
  },
  dropdownItemInnerHighlight: {
    backgroundColor: Colors.backgroundThird,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.dropdownItemHeight,
    paddingLeft: Metrics.defaultPadding * 2,
    paddingRight: Metrics.defaultPadding * 2,
  },
  dropdownItemIcon: {
    fontSize: 14,
    color: Colors.backgroundPrimary,
  },
  dropdownItemIconHighlight: {
    fontSize: 14,
    color: Colors.textThird,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.backgroundPrimary,
    marginLeft: Metrics.defaultMargin,
  },
  dropdownItemTextHighlight: {
    fontSize: 14,
    color: Colors.textThird,
    marginLeft: Metrics.defaultMargin,
    marginTop: 4,
  },

  // Button Styles
  button: {
    backgroundColor: Colors.backgroundThird,
    borderWidth: 1,
    borderColor: Colors.borderThird,
    borderRadius: 2,
    paddingTop: Metrics.defaultPadding * 0.8,
    paddingLeft: Metrics.defaultPadding * 4,
    paddingBottom: Metrics.defaultPadding * 0.8,
    paddingRight: Metrics.defaultPadding * 4,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.textThird,
  },
  buttonIcon: {
    fontSize: 20,
    color: Colors.textThird,
  },

  // Slider Styles
  sliderRow: {
    marginLeft: -Metrics.defaultMargin,
    marginRight: -Metrics.defaultMargin,
  },
  slider: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: -Metrics.defaultMargin,
  },
  sliderIcon: {
    color: Colors.textThird,
    fontSize: 20,
  },
  sliderButton: {
    padding: Metrics.defaultPadding,
    marginTop: -Metrics.defaultMargin,
  },
  sliderTrack: {
    height: 2,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.textThird,
  },
  sliderThumbTouch: {
    width: 40,
    height: 40,
  },
};

export default Styles;
