import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomHeader from '../../navigators/CustomHeader';
import React from 'react';
import i18n from 'locales';

const HomeDetail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t('HomeDetail')} navigation={navigation} />
      <View style={styles.viewContent}>
        <Text style={styles.textContent}>This is Home Detail!</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back to Home</Text>
        </TouchableOpacity>
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
export default HomeDetail;
