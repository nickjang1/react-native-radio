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
    marginBottom: Metrics.defaultMargin,
    shadowColor: Colors.backgroundPrimary,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    borderRadius: 5,
    flex: 1,
  },
  listItemNormal: {
    backgroundColor: Colors.itemColor,
  },
  listItemActive: {
    backgroundColor: Colors.itemActiveColor,
  },
  listItemInner: {
    flexDirection: 'row',
    padding: Metrics.defaultPadding,
  },
  listItemLogo: {
    width: 80,
    height: 65,
    borderRadius: 3,
    marginLeft: Metrics.defaultPadding,
  },
  listItemInfo: {
    flex: 1,
    marginLeft: 20,
  },
  listItemName: {
    marginBottom: 5,
    fontSize: 15,
    color: Colors.textThird,
  },
  row: {
    flexDirection: 'row',
    // flex: 1,
  },
  listItemLabel: {
    flex: 2,
    marginLeft: 10,
    fontSize: 9,
    color: Colors.textPrimary,
  },
  listItemValue: {
    flex: 3,
    marginLeft: 10,
    fontSize: 9,
    color: Colors.textPrimary,
  },
});

export default class RadioListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  _onHideUnderlay() {
    this.setState({ pressed: false });
  }
  _onShowUnderlay() {
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
        <View style={styles.listItemInner}>
          <Image
            source={{ uri: this.props.item.logo }}
            style={styles.listItemLogo}
          />
          <View style={styles.listItemInfo}>
            <Text style={styles.listItemName}>
              {this.props.item.name}
            </Text>
            <View style={styles.row}>
              <Text style={styles.listItemLabel}>
                Frecuencla
              </Text>
              <Text style={styles.listItemValue}>
                {this.props.item.frequency}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listItemLabel}>
                Localidad
              </Text>
              <Text style={styles.listItemValue}>
                {this.props.item.location}
              </Text>
            </View>
            {this.props.item.genres ? (
              <View style={styles.row}>
                <Text style={styles.listItemLabel}>
                  Géneros
                </Text>
                <Text style={styles.listItemValue}>
                  {this.props.item.genres}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
