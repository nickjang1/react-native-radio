import React, { Component } from 'react';
import { ActivityIndicator, DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { SliderVolumeController } from 'react-native-volume-controller';
import ModalDropdown from 'react-native-modal-dropdown';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

import { setDetail, setPlayerStatus } from '@actions/globals';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';
import Global from '@src/global';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

const descStyles = StyleSheet.create({
  p: {
    color: Colors.textPrimary,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

class Player extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
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
        console.log(error);
        return;
      }
      this.props.setPlayerStatus(status);
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

    return (
      <View style={{ flex: 1 }} >
        {CommonWidgets.renderStatusBar(Colors.headerColor)}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          rightButton={CommonWidgets.renderNavBarRightButtonSearch(() => this.props.navigation.goBack())}
          leftButton={CommonWidgets.renderNavBarLeftButton()} />
        <View style={[Styles.listContainer]}>
          <View style={{ width: Metrics.screenWidth, height: 100, alignItems: 'center', backgroundColor: '#181818' }}>
            <SliderVolumeController />
            <TouchableOpacity onPress={this._onPress}>
              {playerButton}
            </TouchableOpacity>
            <Text style={{ fontSize: 10, color: 'white' }}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
          </View>
          <Image
            style={{ flex: 1, width: null, height: null, padding: 30 }}
            resizeMode={'stretch'}
            source={Images.background}>

            <View style={{ flex: 1, padding: 30, backgroundColor: '#151515' }}>
              <Text style={{ fontSize: 15, color: 'white' }}>Ellge Localldad</Text>
              <ModalDropdown
                style={{ top: 10, left: 0 }}
                textStyle={{ color: 'white' }}
                showsVerticalScrollIndicator
                defaultValue={'Select Items'}
                renderRow={item => CommonWidgets.renderMenuListItem(item)}
                options={DEMO_OPTIONS_1} />
              <View style={{ alignItems: 'center', borderBottomWidth: 0.5, marginTop: 20, borderColor: 'white' }}>
                <Text style={{ fontSize: 18, color: 'white' }}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
                <Image
                  style={{ width: 120, height: 90, paddingTop: 15, margin: 10 }}
                  resizeMode={'stretch'}
                  source={{ src: this.props.globals.detail === null ? '' : this.props.globals.detail.logo }} />
              </View>
              <View style={{ }}>
                <HTMLView stylesheet={descStyles} value={this.props.globals.detail === null ? '' : this.props.globals.detail.description} />
              </View>
            </View>

          </Image>

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

