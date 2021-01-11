import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../context/user';
import {logOpenDrawer} from '../services/analytics';

const CustomHeader = ({isDrawer, navigation, title}) => {
  const u = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.viewDrawer}>
        {isDrawer ? (
          <TouchableOpacity
            onPress={() => {
              logOpenDrawer(u.deviceId);
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <Ionicons name="reorder-four-outline" size={35} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.viewIcon}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              size={35}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.viewHeader}>
        <Text style={styles.txtHeader}>{title}</Text>
      </View>
      <View style={styles.viewDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-around', height: 50},
  viewDrawer: {flex: 1, justifyContent: 'center'},
  viewIcon: {flexDirection: 'row', alignItems: 'center'},
  viewHeader: {flex: 4, justifyContent: 'center'},
  txtHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3f9e7c',
  },
});
export default CustomHeader;
