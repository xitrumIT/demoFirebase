import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import IMAGES_NAME from '../../assets/index';
import React from 'react';
import SCREEN_NAME from '../../components/ScreenName';

const DrawerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES_NAME.BGR_AVT}
        style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={IMAGES_NAME.AVATAR_VN}
          style={{height: 130, width: 130, borderRadius: 60}}
        />
      </ImageBackground>

      <ScrollView style={{marginLeft: 5}}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate(SCREEN_NAME.MENU_TAB)}>
          <Text>Menu Tab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate(SCREEN_NAME.NOTIFICATIONS_SCREEN)}>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={{marginTop: 20, marginLeft: 5}}
        onPress={() => navigation.navigate(SCREEN_NAME.LOGIN_SCREEN)}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
export default DrawerScreen;
