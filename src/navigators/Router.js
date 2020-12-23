import * as React from 'react';

import AnimatedTabBar, {
  BubbleTabBarItemConfig,
  TabsConfig,
} from '@gorhom/animated-tabbar';
// import {
//   ForgotPasswordScreen,
//   LoadingScreen,
//   LoginScreen,
//   RegisterScreen,
// } from '../screens/Auth';
import {Platform, Text} from 'react-native';

import CartScreen from '../screens/Cart/CartScreen';
import ChatsScreen from '../screens/Chats/ChatsScreen';
import DrawerScreen from '../screens/Drawer/DrawerScreen';
import HomeDetail from '../screens/Home/HomeDetail';
import HomeScreen from '../screens/Home/HomeScreen';
import IMAGE_NAME from '../assets/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import SCREEN_NAME from '../components/ScreenName';
import SettingsDetail from '../screens/Settings/SettingsDetail';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import i18n from 'locales';
import navigationRef from './NavigationServiceV5';

/**Navigations**/
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**MAIN**/
const Main = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
  }
  Text.defaultProps.allowFontScaling = false;
  // const {t} = useTranslation();

  const TabNavigator = ({navigation}) => {
    return (
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.HOME_SCREEN}
        tabBarOptions={{
          activeTintColor: '#30ab6a',
          inactiveTintColor: '#3e2465',
          labelStyle: {fontSize: 12, fontWeight: 'bold'},
          // style: {height: 50},
        }}
        back>
        <Tab.Screen
          name={SCREEN_NAME.HOME_SCREEN}
          component={HomeScreen}
          options={{
            tabBarLabel: i18n.t('Home'),
            tabBarIcon: ({color}) => (
              <Ionicons name="home" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.CHATS_SCREEN}
          component={ChatsScreen}
          options={{
            tabBarLabel: i18n.t('Chats'),
            tabBarIcon: ({color}) => (
              <Ionicons name="chatbubbles-outline" color={color} size={22} />
            ),
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.CART_SCREEN}
          component={CartScreen}
          options={{
            tabBarLabel: i18n.t('Cart'),
            tabBarIcon: ({color}) => (
              <Ionicons name="cart-outline" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.SETTINGS_SCREEN}
          component={SettingsScreen}
          options={{
            tabBarLabel: i18n.t('Settings'),
            tabBarIcon: ({color}) => (
              <Ionicons name="settings" color={color} size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  /**Drawer Navigator**/
  const DrawerNavigator = ({navigation}) => {
    return (
      <Drawer.Navigator
        initialRouteName="MenuTab"
        drawerContent={() => <DrawerScreen navigation={navigation} />}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    );
  };

  const navOptionHandler = () => ({
    headerShown: false,
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.HOME_SCREEN}
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name={SCREEN_NAME.HOME_SCREEN}
          component={TabNavigator}
          options={navOptionHandler}
        />
        <Stack.Screen
          name={SCREEN_NAME.DRAWER_SCREEN}
          component={DrawerNavigator}
          options={navOptionHandler}
        />
        <Stack.Screen
          name={SCREEN_NAME.SETTINGS_DETAIL}
          component={SettingsDetail}
          options={navOptionHandler}
        />
        <Stack.Screen
          name={SCREEN_NAME.HOME_DETAIL}
          component={HomeDetail}
          options={navOptionHandler}
        />
        <Stack.Screen
          name={SCREEN_NAME.NOTIFICATIONS_SCREEN}
          component={NotificationsScreen}
          options={navOptionHandler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
