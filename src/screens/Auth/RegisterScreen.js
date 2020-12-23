import {Dimensions, StyleSheet, Text, View} from 'react-native';

import CustomHeader from '../../navigators/CustomHeader';
import React from 'react';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Register" navigation={navigation} />
      <View style={styles.viewContent}>
        <Text style={styles.textContent}>Register Screen!</Text>
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
export default RegisterScreen;
