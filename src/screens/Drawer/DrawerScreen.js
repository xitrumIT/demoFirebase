import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import IMAGE_NAME from '../../assets/index';
import React from 'react';

const DrawerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={IMAGE_NAME.ICON_PROFILE}
          style={{height: 120, width: 120, borderRadius: 60}}
        />
      </View>
      <ScrollView style={{marginLeft: 5}}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('MenuTab')}>
          <Text>Menu Tab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('Notifications')}>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={{marginTop: 20, marginLeft: 5}}
        // onPress={() => navigation.navigate('Login')}
      >
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
