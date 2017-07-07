import React, { Component } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Slider from 'react-native-slider';
import SystemSetting from 'react-native-system-setting';

import { setDetail, setPlayerStatus } from '@actions/globals';
import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';
import Global from '@src/global';

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
    marginBottom: Metrics.defaultMargin,
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
    marginBottom: Metrics.defaultMargin * 3,
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: Metrics.defaultMargin / 2,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  text: {
    flex: 1,
    marginTop: Metrics.defaultMargin / 2,
    color: Colors.textPrimary,
  },
});

const descriptionStyles = StyleSheet.create({
  div: {
    color: Colors.textPrimary,
  },
  p: {
    color: Colors.textPrimary,
  },
  strong: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});


class Player extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    const { width, height } = Dimensions.get('window');
    this.state = {
      screenWidth: width,
      screenHeight: height,
      locationPressed: false,
      status: Global.STOPPED,
      song: '',
      channel: 0,
      channelName: '',
      channelOptions: [],
      volume: 0.5,
      isLoaded: false,
    };
    this.unmounted = false;
    this.volumeListener = null;
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    ReactNativeAudioStreaming.stop();
    SystemSetting.setVolume(this.state.volume);
    this.loadingDetailData(params.id);
  }

  componentDidMount() {
    this.unmounted = true;
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (evt) => {
        this.props.setPlayerStatus(evt.status);
      },
    );

    this.volumeListener = SystemSetting.addVolumeListener((data) => {
      this.setState({ volume: data.value });
    });

    ReactNativeAudioStreaming.getStatus((error, status) => {
      if (error) {
        return;
      }
      this.props.setPlayerStatus(status);
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
    SystemSetting.removeVolumeListener(this.volumeListener);
    this.volumeListener = null;
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

  onPress() {
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
        : this.props.globals.detail.channels[this.state.channel].stream.url,
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
    this.setState({ isLoaded: false });
    const detail = await Api.getDetail(id);
    this.props.setDetail(detail);

    setTimeout(() => {
      ReactNativeAudioStreaming.play(detail.channels[this.state.channel].stream.url, { showIniOSMediaCenter: true, showInAndroidNotifications: true });
      const channelOptions = [];
      if (detail && detail.channels) {
        detail.channels.forEach((channel) => {
          const { location, frequency } = channel;
          const channelOption = `${location} ${frequency}`;
          channelOptions.push(channelOption);
        });
      }

      let channel = this.state.channel;
      if (channel > channelOptions.length) {
        channel = channelOptions.length - 1;
      }
      const channelName = channelOptions.length > channel ? channelOptions[channel] : '';
      this.setState({
        channelOptions,
        channel,
        channelName,
        isLoaded: true,
      });
    }, 500);
  }

  changeVolume(value) {
    const volume = parseFloat(value);
    if (Platform.OS === 'android') {
      this.setState({ volume });
    }
    SystemSetting.setVolume(volume);
  }

  increaseVolume() {
    let volume = this.state.volume;
    volume += 0.1;
    if (volume > 1.0) {
      volume = 1.0;
    }
    if (Platform.OS === 'android') {
      this.setState({ volume });
    }
    SystemSetting.setVolume(volume);
  }

  decreaseVolume() {
    let volume = this.state.volume;
    volume -= 0.1;
    if (volume < 0) {
      volume = 0;
    }
    if (Platform.OS === 'android') {
      this.setState({ volume });
    }
    SystemSetting.setVolume(volume);
  }

  render() {
    let playerButton = null;
    switch (this.props.globals.playerStatus) {
      case Global.PLAYING:
      case Global.STREAMING:
        playerButton = (
          <Icon style={Styles.buttonIcon} name={'pause'} />
        );
        break;
      case Global.PAUSED:
      case Global.STOPPED:
      case Global.ERROR:
        playerButton = (
          <Icon style={Styles.buttonIcon} name={'play'} />
        );
        break;
      case Global.BUFFERING:
      case Global.BUFFERING_START:
      case Global.START_PREPARING:
      default:
        playerButton = (<ActivityIndicator
          animating
          color={Colors.textThird}
          size={'small'} />
        );
        break;
    }

    const logoSrc = this.props.globals.detail === null ? { src: '' } : { uri: this.props.globals.detail.logo };
    let description = this.props.globals.detail === null ? '' : this.props.globals.detail.description;
    description = description.replace(/\r?\n|\r/g, '');
    description = `<div>${description}</div>`;

    if (!this.state.isLoaded || !this.state.channelName) {
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
            // rightButton={CommonWidgets.renderNavRightButtonHome(() => this.props.navigation.goBack())}
            leftButton={CommonWidgets.renderNavBarLeftButton()} />
          <View style={[Styles.flex, Styles.center, Styles.horzCenter]}>
            <ActivityIndicator size={'small'} color={Colors.textPrimary} />
          </View>
        </View>
      );
    }

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
          rightButton={CommonWidgets.renderNavRightButtonHome(() => this.props.navigation.goBack())}
          leftButton={CommonWidgets.renderNavBarLeftButton()} />

        {/* PLAYER */}
        <View style={Styles.topContainer}>
          <View style={[Styles.row, Styles.sliderRow]}>
            <TouchableOpacity style={Styles.sliderButton} onPress={this.decreaseVolume.bind(this)}>
              <Icon style={[Styles.sliderIcon]} name={'volume-off'} />
            </TouchableOpacity>
            <Slider
              value={this.state.volume}
              trackStyle={Styles.sliderTrack}
              thumbStyle={Styles.sliderThumb}
              thumbTouchSize={Styles.sliderThumbTouch}
              maximumTrackTintColor={Colors.textFourth}
              minimumTrackTintColor={Colors.textThird}
              style={Styles.slider}
              onValueChange={this.changeVolume.bind(this)}
            />
            <TouchableOpacity style={Styles.sliderButton} onPress={this.increaseVolume.bind(this)}>
              <Icon style={Styles.sliderIcon} name={'volume-up'} />
            </TouchableOpacity>
          </View>
          <View style={[Styles.row, Styles.center]}>
            <TouchableOpacity onPress={this.onPress} style={Styles.button}>
              {playerButton}
            </TouchableOpacity>
          </View>
          <View style={[Styles.row, Styles.center]}>
            <Text style={styles.topName}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={Styles.contentContainer}>
          <ScrollView style={styles.content}>
            {this.state.channelOptions.length > 1 ? (
              <View style={Styles.row}>
                <Text style={styles.contentLocationLabel}>Localidad</Text>
              </View>) : null }
            {this.state.channelOptions.length > 1 ? (
              <View style={Styles.row}>
                <View style={[Styles.dropdownContainer, styles.contentLocation]}>
                  <ModalDropdown
                    style={Styles.dropdown}
                    defaultValue={this.state.channelName}
                    defaultIndex={this.state.channel}
                    dropdownStyle={Styles.dropdownBox}
                    textStyle={Styles.dropdownText}
                    showsVerticalScrollIndicator
                    adjustFrame={(style) => {
                      const output = style;
                      output.width = this.state.screenWidth - (Metrics.defaultPadding * 8);
                      output.height = this.state.channelOptions.length * 34.5;
                      return output;
                    }}
                    onSelect={(channel, channelName) => {
                      ReactNativeAudioStreaming.stop();
                      setTimeout(() => {
                        ReactNativeAudioStreaming.play(this.props.globals.detail.channels[channel].stream.url, { showIniOSMediaCenter: true, showInAndroidNotifications: true });
                      }, 1000);
                      this.setState({ channel: parseInt(channel, 0), channelName });
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
                    renderRow={(item, index, highlight) => CommonWidgets.renderChannelMenuListItem(item, index, highlight)}
                    options={this.state.channelOptions} />
                  <Icon name={this.state.locationPressed ? 'caret-up' : 'caret-down'} style={Styles.dropdownIcon} />
                </View>
              </View>
            ) : (
              null
            )}
            <View style={Styles.row}>
              <Text style={styles.contentName}>{this.props.globals.detail === null ? '' : this.props.globals.detail.name}</Text>
            </View>
            <View style={[Styles.row, Styles.center]}>
              <Image
                style={styles.contentLogo}
                resizeMode={'contain'}
                source={logoSrc} />
            </View>
            <View style={[Styles.row]}>
              <Text style={styles.label}>Frecuencia: </Text>
              <Text style={styles.text}>{this.props.globals.detail.channels[this.state.channel].frequency}</Text>
            </View>
            <View style={[Styles.row]}>
              <Text style={styles.label}>Localidad: </Text>
              <Text style={styles.text}>{this.props.globals.detail.channels[this.state.channel].location}</Text>
            </View>
            { this.props.globals.detail.phone ?
              (<View style={[Styles.row]}>
                <Text style={styles.label}>Teléfono: </Text>
                <Text style={styles.text}>{this.props.globals.detail.phone}</Text>
              </View>) : null }
            { this.props.globals.detail.genre ?
              (<View style={[Styles.row]}>
                <Text style={styles.label}>Género: </Text>
                <Text style={styles.text}>{this.props.globals.detail.genre}</Text>
              </View>) : null }
            { this.props.globals.detail.address ?
              (<View style={[Styles.row]}>
                <Text style={styles.label}>Dirección: </Text>
                <Text style={styles.text}>{this.props.globals.detail.address}</Text>
              </View>) : null }
            { this.props.globals.detail.website ?
              (<View style={[Styles.row]}>
                <Text style={styles.label}>Web: </Text>
                <Text style={styles.text}>{this.props.globals.detail.website}</Text>
              </View>) : null }
            <View style={Styles.row}>
              <View style={styles.contentLine} />
            </View>
            <View style={[Styles.row, Styles.flex]}>
              <HTMLView value={description} stylesheet={descriptionStyles} style={styles.contentDescription} />
            </View>
          </ScrollView>
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

