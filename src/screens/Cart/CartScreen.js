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
import i18n from 'locales';

const CartScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        isDrawer={true}
        title={i18n.t('Cart')}
        navigation={navigation}
      />
      <View style={styles.viewContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeDetail')}
          style={styles.viewTouch}>
          <Text style={styles.textContent}>Cart Screen!</Text>
          <Ionicons name="cart" size={25} color="#5B37B7" />
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
export default CartScreen;
