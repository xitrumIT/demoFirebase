import {Alert, BackHandler} from 'react-native';

import NavigationService from './NavigationServiceV5';
import React from 'react';
import TopLevelNavigator from './Router';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeftDrawerOpened: false,
      isRightDrawerOpened: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  }

  render() {
    return (
      <TopLevelNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
