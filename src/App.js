import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import AppContainer from './navigators/AppContainer';
import SplashScreen from 'react-native-splash-screen';
import {UserProvider} from './context/user';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <AppContainer />
      </UserProvider>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
