import * as React from 'react';

import AnimatedTabBar, {
  BubbleTabBarItemConfig,
  TabsConfig,
} from '@gorhom/animated-tabbar';
import {
  ForgotPasswordScreen,
  LoadingScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens/Auth';
import {HomeScreen, HomeScreenDetail} from '../screens/Home';
import {Platform, View} from 'react-native';
import {SettingsScreen, SettingsScreenDetail} from '../screens/Settings';

// import {ChatsScreen} from '../screens/Chats';
import {DrawerScreen} from '../screens/Drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IMAGE_NAME from '../assets/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {MapScreen} from '../screens/Map';
import {NavigationContainer} from '@react-navigation/native';
import {NotificationsScreen} from '../screens/Notifications';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import navigationRef from './NavigationServiceV5';
import {useTranslation} from 'react-i18next';

/**Navigations**/
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
// separate stack should be produced for each page
const StackHome = createStackNavigator();
const StackSetting = createStackNavigator();
const StackApp = createStackNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="HomeDetail"
        component={HomeScreenDetail}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
}

//create SettingStack
function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen
        name="Setting"
        component={SettingsScreen}
        options={navOptionHandler}
      />
      <StackSetting.Screen
        name="SettingDetail"
        component={SettingsScreenDetail}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
}

/**Tab Navigator**/
function TabNavigator(navigation) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f06"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Map" component={MapStack} /> */}
    </Tab.Navigator>
  );
}

/**Drawer Navigator**/
function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={() => <DrawerScreen navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const navOptionHandler = () => ({
  headerShown: false,
});

/**MAIN**/

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackApp.Navigator initialRouteName="Login">
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
