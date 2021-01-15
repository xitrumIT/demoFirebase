import {ActivityIndictor, Alert, Platform, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {navigationRef, routeNameRef} from './NavigationServiceV5';

import AsyncStorage from '@react-native-community/async-storage';
import CartScreen from '../screens/Cart/CartScreen';
import ChatsScreen from '../screens/Chats/ChatsScreen';
import DrawerScreen from '../screens/Drawer/DrawerScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import HomeDetail from '../screens/Home/HomeDetail';
import HomeScreen from '../screens/Home/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
import LoginScreen from '../screens/Auth/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SCREEN_NAME from '../components/ScreenName';
import SettingsDetail from '../screens/Settings/SettingsDetail';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import {UserContext} from '../context/user';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import i18n from 'locales';

/**MAIN**/
const Main = () => {
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const u = useContext(UserContext);

  function onAuthStateChanged(user) {
    setUser(user);
    u.setUser(user);
    console.log('user Router', user);
  }

  // if (initializing) {
  //   setInitializing(false);
  //   setLoading(false);
  // }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
  }
  Text.defaultProps.allowFontScaling = false;

  const navOptionHandler = () => ({
    headerShown: false,
  });

  //**Stack App**/
  const StackHome = createStackNavigator();
  const HomeStackScreen = ({navigation, route}) => {
    return (
      <StackHome.Navigator>
        <StackHome.Screen
          name="Home"
          component={HomeScreen}
          options={navOptionHandler}
        />
        <StackHome.Screen
          name="HomeDetail"
          component={HomeDetail}
          options={navOptionHandler}
        />
      </StackHome.Navigator>
    );
  };

  const StackSettings = createStackNavigator();
  const SettingsStackScreen = ({navigation, route}) => {
    return (
      <StackSettings.Navigator>
        <StackSettings.Screen
          name="Settings"
          component={SettingsScreen}
          options={navOptionHandler}
        />
        <StackSettings.Screen
          name="SettingsDetail"
          component={SettingsDetail}
          options={navOptionHandler}
        />
      </StackSettings.Navigator>
    );
  };

  const StackChat = createStackNavigator();
  const ChatsStackScreen = ({navigation, route}) => {
    return (
      <StackChat.Navigator>
        <StackChat.Screen
          name="Chats"
          component={ChatsScreen}
          options={navOptionHandler}
        />
      </StackChat.Navigator>
    );
  };

  const StackCart = createStackNavigator();
  const CartStackScreen = ({navigation, route}) => {
    return (
      <StackCart.Navigator>
        <StackCart.Screen
          name="Cart"
          component={CartScreen}
          options={navOptionHandler}
        />
      </StackCart.Navigator>
    );
  };

  //**Stack Auth **/
  const StackAuth = createStackNavigator();
  const AuthStackScreen = ({navigation}) => {
    return (
      <StackAuth.Navigator
        initialRouteName={SCREEN_NAME.LOGIN_SCREEN}
        screenOptions={{gestureEnabled: false}}>
        <StackAuth.Screen
          name={SCREEN_NAME.LOGIN_SCREEN}
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackAuth.Screen
          name={SCREEN_NAME.REGISTER_SCREEN}
          component={RegisterScreen}
          options={navOptionHandler}
        />
        <StackAuth.Screen
          name={SCREEN_NAME.FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordScreen}
          options={navOptionHandler}
        />
      </StackAuth.Navigator>
    );
  };

  //**Tab**/
  const Tab = createBottomTabNavigator();
  const TabNavigator = ({navigation}) => {
    return (
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.HOME_SCREEN}
        tabBarOptions={{
          activeTintColor: '#30ab6a',
          inactiveTintColor: '#3e2465',
          labelStyle: {fontSize: 12, fontWeight: 'bold'},
          // style: {height: 50},
        }}>
        <Tab.Screen
          name={SCREEN_NAME.HOME_SCREEN}
          component={HomeStackScreen}
          options={{
            tabBarLabel: i18n.t('Home'),
            tabBarIcon: ({color}) => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.CHATS_SCREEN}
          component={ChatsStackScreen}
          options={{
            tabBarLabel: i18n.t('Chats'),
            tabBarIcon: ({color}) => (
              <Ionicons
                name={
                  Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'
                }
                color={color}
                size={22}
              />
            ),
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.CART_SCREEN}
          component={CartStackScreen}
          options={{
            tabBarLabel: i18n.t('Cart'),
            tabBarIcon: ({color}) => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.SETTINGS_SCREEN}
          component={SettingsStackScreen}
          options={{
            tabBarLabel: i18n.t('Settings'),
            tabBarIcon: ({color}) => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
                color={color}
                size={22}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  //**Drawer**/
  const Drawer = createDrawerNavigator();
  const DrawerNavigator = ({navigation}) => {
    return (
      <Drawer.Navigator
        initialRouteName={SCREEN_NAME.DRAWER_SCREEN}
        drawerContent={() => <DrawerScreen navigation={navigation} />}>
        <Drawer.Screen
          name={SCREEN_NAME.DRAWER_SCREEN}
          component={TabNavigator}
        />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    );
  };

  //**Root**/
  const StackRoot = createStackNavigator();
  const RootStackScreen = ({navigation}) => {
    return (
      <StackRoot.Navigator
        initialRouteName={SCREEN_NAME.HOME_COMPONENT}
        screenOptions={{gestureEnabled: false}}>
        <StackRoot.Screen
          name={SCREEN_NAME.HOME_COMPONENT}
          component={DrawerNavigator}
          options={navOptionHandler}
        />
        <StackRoot.Screen
          name={SCREEN_NAME.NOTIFICATIONS_SCREEN}
          component={NotificationsScreen}
          options={navOptionHandler}
        />
        {/* <StackRoot.Screen
          name={SCREEN_NAME.AUTH_SCREEN}
          component={AuthStackScreen}
          options={navOptionHandler}
        /> */}
      </StackRoot.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      {user === null ? <AuthStackScreen /> : <RootStackScreen />}
      {/* <RootStackScreen /> */}
    </NavigationContainer>
  );
};

export default Main;
