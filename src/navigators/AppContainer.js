/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, BackHandler} from 'react-native';
import React, {useEffect} from 'react';

import NavigationService from './NavigationServiceV5';
import TopLevelNavigator from './Router';
import i18n from 'locales';

export default function AppContainer() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const CAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: i18n.t('cancel'), onPress: () => console.log('Cancel Pressed')},
        {text: i18n.t('ok'), onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };
  const handleBackButton = () => {
    CAlert(i18n.t('exit'), i18n.t('title_exit'));
    return true;
  };

  return (
    <TopLevelNavigator
      refs={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
