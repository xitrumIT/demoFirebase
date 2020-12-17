import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class LoadingScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="LoadingScreen"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>LoadingScreen!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
