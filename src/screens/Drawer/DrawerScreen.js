import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import IMAGE_NAME from '../../assets/index';

export class DrawerScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={IMAGE_NAME.ICON_PROFILE}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
        </View>
        <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('MenuTab')}>
            <Text>Menu Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Text>Notifications</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 5}}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
