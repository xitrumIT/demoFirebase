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

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        isDrawer={true}
        title={i18n.t('Settings')}
        navigation={navigation}
      />
      <View style={styles.viewContent}>
        <View>
          <Text style={styles.textContent}>Setting!</Text>
        </View>
        <TouchableOpacity
          style={styles.viewTouch}
          onPress={() => navigation.navigate('SettingsDetail')}>
          <View>
            <Text>Go Setting Detail Screen!</Text>
          </View>
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
  viewTouch: {
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
export default SettingsScreen;
