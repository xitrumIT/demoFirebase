import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 20}}>Home!</Text>
          </View>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('HomeDetail')}>
            <Text style={{fontSize: 20}}>Go to Home Screen Detail!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
