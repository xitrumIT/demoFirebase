import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class ForgotPasswordScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Register" navigation={this.props.navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ForgotPasswordScreen!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
