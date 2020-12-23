import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomHeader from '../../navigators/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import SCREEN_NAME from '../../components/ScreenName';
import i18n from 'locales';

const ChatsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t('Chats')} navigation={navigation} />
      <View style={styles.viewContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.NOTIFICATIONS_SCREEN)}
          style={styles.viewTouch}>
          <Text style={styles.textContent}>Chat Screen!</Text>
          <Ionicons name="chatbubbles-outline" size={25} color="#5B37B7" />
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
export default ChatsScreen;
