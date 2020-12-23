import {Text, TouchableOpacity, View} from 'react-native';

import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const CustomHeader = ({isHome, navigation, title}) => {
  return (
    <View style={{flexDirection: 'row', height: 50}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isHome ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            {/* <Ionicons
              name="reorder-four-outline"
              size={35}
              style={{paddingRight: 5}}
            /> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={35}
              style={{paddingRight: 5}}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{flex: 1.5, justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {title}
        </Text>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};
export default CustomHeader;
