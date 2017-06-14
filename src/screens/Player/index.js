import React, { Component } from 'react';
import { ActivityIndicator, DeviceEventEmitter, Image, Dimensions, StyleSheet, Text, TouchableOpacity, View, WebView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import { SliderVolumeController } from 'react-native-volume-controller';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

import { setDetail, setPlayerStatus } from '@actions/globals';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';
import Global from '@src/global';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

const styles = StyleSheet.create({
  topName: {
    marginTop: Metrics.defaultMargin * 0.4,
    fontSize: 10,
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    padding: Metrics.defaultPadding * 2,
  },
  contentLocationLabel: {
    fontSize: 15,
    color: Colors.textThird,
  },
  contentLocation: {
    flex: 1,
    marginTop: Metrics.defaultMargin,
  },
  contentName: {
    marginTop: Metrics.defaultMargin * 1.5,
    flex: 1,
    fontSize: 16,
    color: Colors.textThird,
    justifyContent: 'center',
    textAlign: 'center',
  },
  contentLogo: {
    marginTop: Metrics.defaultMargin * 1.5,
    width: 120,
    height: 90,
    paddingTop: 15,
    margin: 10,
    borderRadius: 2,
  },
  contentLine: {
    marginTop: Metrics.defaultMargin * 1.5,
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderPrimary,
  },
  contentDescription: {
    backgroundColor: Colors.backgroundSecondary,
    marginTop: Metrics.defaultMargin * 1.5,
    width: '100%',
    height: '100%',
  },
});

class Player extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    const { width, height } = Dimensions.get('window');
    this.state = {
      screenWidth: width,
      screenHeight: height,
      locationPressed: false,
      status: Global.STOPPED,
      song: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.loadingDetailData(params.id);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (evt) => {
        this.props.setPlayerStatus(evt.status);
        // console.log('event', evt);
        // if (evt.status === Global.METADATA_UPDATED && evt.key === 'StreamTitle') {
        //   this.setState({ song: evt.value });
        //   console.log('state', this.state);
        // } else if (evt.status !== Global.METADATA_UPDATED) {
        //   this.setState(evt);
        //   console.log('state', this.state);
        // }
      },
    );

    ReactNativeAudioStreaming.getStatus((error, status) => {
      if (error) {
        return;
      }
      this.props.setPlayerStatus(status);
    });
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({
      screenWidth: width,
      screenHeight: height,
    });
  }

  onUserPressed() {
    this.props.navigation.goBack();
  }

  _onPress() {
    switch (this.props.globals.playerStatus) {
      case Global.PLAYING:
      case Global.STREAMING:
        ReactNativeAudioStreaming.pause();
        break;
      case Global.PAUSED:
        ReactNativeAudioStreaming.resume();
        break;
      case Global.STOPPED:
      case Global.ERROR:
        ReactNativeAudioStreaming.play(this.props.globals.detail === null ? ''
        : this.props.globals.detail.channels[0].stream.url,
         { showIniOSMediaCenter: true, showInAndroidNotifications: true });
        break;
      case Global.BUFFERING:
        ReactNativeAudioStreaming.stop();
        break;
      default:
        break;
    }
  }

  async loadingDetailData(id) {
    const detail = await Api.getDetail(id);
    this.props.setDetail(detail);
    ReactNativeAudioStreaming.play(detail.channels[0].stream.url, { showIniOSMediaCenter: true, showInAndroidNotifications: true });
  }

  volumeChange(value) {
    console.log(value);
  }

  render() {
    let playerButton = null;
    switch (this.props.globals.playerStatus) {
      case Global.PLAYING:
      case Global.STREAMING:
        playerButton = (<Image
          style={{ width: 100, height: 35 }}
          resizeMode={'stretch'}
          source={Images.stop} />);
        break;
      case Global.PAUSED:
      case Global.STOPPED:
      case Global.ERROR:
        playerButton = (<Image
          style={{ width: 100, height: 35 }}
          resizeMode={'stretch'}
          source={Images.play} />);
        break;
      case Global.BUFFERING:
      case Global.BUFFERING_START:
      case Global.START_PREPARING:
        playerButton = (<ActivityIndicator
          animating
          style={{ height: 35 }}
          size="small"
                />);
        break;
      default:
        break;
    }

    const logoSrc = this.props.globals.detail === null ? { src: '' } : { uri: this.props.globals.detail.logo };
    let description = this.props.globals.detail === null ? '' : this.props.globals.detail.description;
    description = `<style>body, html {font-family: 'Helvetica'; font-size: 14px; background-color: ${Colors.backgroundSecondary}; color: ${Colors.textPrimary};}</style><body>${description}</body>`;

    return (
      <View style={Styles.container} >
        <Image
          style={Styles.background}
          resizeMode={'cover'}
          source={Images.background} />

        {CommonWidgets.renderStatusBar(Colors.headerColor)}

        {/* NAVIGATION */}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          rightButton={CommonWidgets.renderNavBarRightButtonSearch(() => this.props.navigation.goBack())}
          leftButton={CommonWidgets.renderNavBarLeftButton()} />

        {/* PLAYER */}
        <View style={Styles.topContainer}>
          <View style={Styles.row}>
            <SliderVolumeController />
          </View>
          <View style={[Styles.row, Styles.center]}>
            <TouchableOpacity onPress={this._onPress}>
              {playerButton}
            </TouchableOpacity>
          </View>
          <View style={[Styles.row, Styles.center]}>
            <Text style={styles.topName}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={Styles.contentContainer}>
          <View style={styles.content}>
            <View style={Styles.row}>
              <Text style={styles.contentLocationLabel}>Ellge Localldad</Text>
            </View>
            <View style={Styles.row}>
              <View style={[Styles.dropdownContainer, styles.contentLocation]}>
                <ModalDropdown
                  style={Styles.dropdown}
                  dropdownStyle={Styles.dropdownBox}
                  textStyle={Styles.dropdownText}
                  showsVerticalScrollIndicator
                  defaultValue={'Select Locations'}
                  adjustFrame={(style) => {
                    const output = style;
                    output.width = this.state.screenWidth - (Metrics.defaultPadding * 8);
                    return output;
                  }}
                  onSelect={(index, value) => {
                    console.log(index, value);
                  }}
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
                  renderRow={item => CommonWidgets.renderLocationMenuListItem(item)}
                  options={DEMO_OPTIONS_1} />
                <Icon name={this.state.locationPressed ? 'caret-up' : 'caret-down'} style={Styles.dropdownIcon} />
              </View>
            </View>
            <View style={Styles.row}>
              <Text style={styles.contentName}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
            </View>
            <View style={[Styles.row, Styles.center]}>
              <Image
                style={styles.contentLogo}
                resizeMode={'contain'}
                source={logoSrc} />
            </View>
            <View style={Styles.row}>
              <View style={styles.contentLine} />
            </View>
            <View style={[Styles.row, Styles.flex]}>
              <WebView
                source={{ html: description }}
                style={styles.contentDescription} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setDetail: detail => dispatch(setDetail(detail)),
    setPlayerStatus: playerStatus => dispatch(setPlayerStatus(playerStatus)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);

