import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const CustomHeader = ({isDrawer, navigation, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewDrawer}>
        {isDrawer ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
  viewHeader: {flex: 1.5, justifyContent: 'center'},
  txtHeader: {textAlign: 'center', fontWeight: 'bold', fontSize: 20},
});
export default CustomHeader;
