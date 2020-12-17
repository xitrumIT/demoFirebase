import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {CustomHeader} from '../../navigators/CustomHeader';

export class ChatsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Chats" navigation={this.props.navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ChatsScreen!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
