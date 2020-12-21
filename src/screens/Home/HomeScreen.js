import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import {CustomHeader} from '../../navigators/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Home!</Text>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
            size={25}
            color="#5B37B7"
          />

          <TouchableOpacity
            style={{marginTop: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('HomeDetail')}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
              size={25}
              color="#5BB7"
            />
            <Text style={{fontSize: 20}}>Go to Home Screen Detail!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
