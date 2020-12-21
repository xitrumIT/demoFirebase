import {Platform, SafeAreaView} from 'react-native';
import React, {Component} from 'react';

import AppContainer from './navigators/AppContainer';
import Router from './navigators/Router';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Router />
      </SafeAreaView>
    );
  }
}
