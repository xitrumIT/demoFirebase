import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import CustomHeader from '../../navigators/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SCREEN_NAME from '../../components/ScreenName';
import {UserContext} from '../../context/user';
import i18n from 'locales';
import {logGoHome} from '../../services/analytics';

const HomeScreen = ({navigation}) => {
  const u = useContext(UserContext);
  console.log('Home user', u.user);
  useEffect(() => {
    logGoHome(u.deviceId);
  }, [u.deviceId]);
  // console.log('user home=========', u?.user);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={i18n.t('Home')}
        isDrawer={true}
        navigation={navigation}
      />
      <View style={styles.viewHome}>
        <TouchableOpacity
          style={styles.touchView}
          onPress={() => navigation.navigate(SCREEN_NAME.HOME_DETAIL)}>
          <Text style={styles.textHome}>Home!</Text>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
            size={25}
            color="#5B37B7"
          />
        </TouchableOpacity>
        <View>
          {u?.user ? (
            <View>
              <Text>Email: {u.user.email}</Text>
              <Text>UserId: {u.user.uid}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  );
};
// const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchView: {
    alignItems: 'center',
  },
  textHome: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
export default HomeScreen;
