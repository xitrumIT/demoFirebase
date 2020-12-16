import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class SettingsScreenDetail extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Setting Detail"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Setting Detail!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
