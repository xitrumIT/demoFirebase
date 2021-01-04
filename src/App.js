import {SafeAreaView, StyleSheet} from 'react-native';

import AppContainer from './navigators/AppContainer';
import React from 'react';
import {UserProvider} from './context/user';

const App = () => {
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
