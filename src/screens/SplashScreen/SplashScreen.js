import {Dimensions, StyleSheet, Text, View} from 'react-native';

import CustomHeader from '../../navigators/CustomHeader';
import React from 'react';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="SplashScreen" navigation={navigation} />
      <View style={styles.viewContent}>
        <Text style={styles.textContent}>SplashScreen!</Text>
      </View>
    </View>
  );
};
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
export default SplashScreen;
