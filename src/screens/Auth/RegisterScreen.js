import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class RegisterScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Register" navigation={this.props.navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Register Screen!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
