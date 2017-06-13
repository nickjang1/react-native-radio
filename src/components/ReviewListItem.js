import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Metrics, Colors } from '@theme/';

const styles = StyleSheet.create({
  listItem: {
    width: Metrics.listItemWidth,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.defaultMargin * 0.8,
  },
  listItemNormal: {
    backgroundColor: Colors.itemColor,
  },
  listItemActive: {
    backgroundColor: Colors.itemActiveColor,
  },
});

export default class RadioListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: true,
    };
  }

  _onHideUnderlay() {
    console.log('pressed');
    this.setState({ pressed: false });
  }
  _onShowUnderlay() {
    console.log('no');
    this.setState({ pressed: true });
  }

  render() {
    return (
      <TouchableHighlight
        key={this.props.item.id}
        style={[styles.listItem, this.state.pressed ? styles.listItemActive : styles.listItemNormal]}
        activeOpacity={1}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
        onPress={this.props.onPress}>
        <View style={{ padding: Metrics.defaultPadding / 2, paddingBottom: 0, flexDirection: 'row', backgroundColor: Colors.itemColor }}>
          <Image
            source={{ uri: this.props.item.logo, width: 80, height: 65 }}
          />
          <View>
            <Text style={{ padding: 5, fontSize: 15, paddingBottom: 0, color: '#ffffff', margin: 0 }}>
              {this.props.item.name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                Frecuencla
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                {this.props.item.frequency}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                Localidad
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                {this.props.item.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                Telefono
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9, color: Colors.textPrimary }}>
                809-565-4567
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
