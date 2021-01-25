import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import DeviceInfo from 'react-native-device-info';
import IMAGES_NAME from '../../assets/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SCREEN_NAME from '../../components/ScreenName';
import { UserContext } from '../../context/user';
import i18n from 'locales';
import { logLogin } from '../../services/analytics';

const LoginScreen = ({ navigation }) => {
  const u = useContext(UserContext);
  // const login = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  useEffect(() => {
    const checkSystem = async () => {
      const deviceID = DeviceInfo.getUniqueId();
      console.log(deviceID);
      try {
        u.setDeviceId(deviceID);
      } catch (e) {
        console.log(e);
      }
    };
    checkSystem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u.deviceID]);
  return (
    <View style={styles.container}>
      <View style={styles.viewLogo}>
        <Image source={IMAGES_NAME.LOGIN_LOGO} style={styles.imgLogo} />
      </View>
      <View style={styles.viewContent}>
        <View>
          <TextInput
            style={styles.txtInput}
            maxLength={255}
            keyboardType={'email-address'}
            onChangeText={(text) => u.setEmail(text)}
            value={u.email}
            placeholder={i18n.t('email')}
            underlineColorAndroid="transparent"
          />
          <View>
            <TextInput
              style={styles.txtInput}
              maxLength={255}
              onChangeText={(text) => u.setPassword(text)}
              value={u.password}
              placeholder={i18n.t('password')}
              underlineColorAndroid="transparent"
              secureTextEntry={passwordShown}
            />
            <TouchableOpacity
              style={styles.touchEye}
              onPress={() => togglePasswordVisibility()}>
              <Ionicons
                name={
                  passwordShown
                    ? Platform.OS === 'ios'
                      ? 'ios-eye-off'
                      : 'md-eye-off'
                    : Platform.OS === 'ios'
                      ? 'ios-eye'
                      : 'md-eye'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPassword}>{i18n.t('forgotPassword')}</Text>
        </View>
        <View style={styles.blockBottom}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              logLogin(u.deviceId);
              // login(u.email, u.password);
              navigation.navigate(SCREEN_NAME.HOME_COMPONENT);
            }}>
            <Text style={styles.txtButton}>{i18n.t('Login')}</Text>
          </TouchableOpacity>
          <Text style={styles.txtOr}> {i18n.t('or')}</Text>
          <View style={styles.otherLogin}>
            <TouchableOpacity
              style={styles.touchOther}
              onPress={() => console.log('login Mobile')}>
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-phone-portrait'
                    : 'md-phone-portrait'
                }
                color={'#52bdd9'}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchOther}
              onPress={() => console.log('login Google')}>
              <Icon
                name={
                  Platform.OS === 'ios' ? 'ios-logo-google' : 'md-logo-google'
                }
                color={'#ed5565'}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchOther}
              onPress={() => console.log('login Facebook')}>
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-logo-facebook'
                    : 'md-logo-facebook'
                }
                color={'#3b5998'}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewRegister}>
            <Text style={styles.txtAccount}>{i18n.t('noAccount')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.REGISTER_SCREEN)}>
              <Text style={styles.txtRegister}>{i18n.t('Register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const styles = StyleSheet.create({
  viewRegister: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  viewLogo: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
  },
  txtRegister: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fa4134',
  },
  txtOr: {
    marginVertical: 20,
  },
  txtInput: {
    width: WIDTH - 100,
    paddingLeft: 10,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  txtButton: {
    fontSize: 16,
    color: '#fff',
  },
  txtAccount: {
    fontSize: 16,
  },
  touchOther: {
    width: WIDTH / 5,
    justifyContent: 'center',
    height: WIDTH / 5,
    borderWidth: 0.5,
    borderColor: '#808080',
    alignItems: 'center',
  },
  touchEye: {
    right: 0,
    position: 'absolute',
    marginTop: 15,
    marginRight: 10,
  },
  otherLogin: {
    width: WIDTH - 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  imgLogo: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.6,
  },
  forgotPassword: {
    marginBottom: 30,
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
  },
  btnLogin: {
    width: WIDTH - 100,
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#20C3AF',
    alignItems: 'center',
  },
  blockBottom: {
    alignItems: 'center',
  },
});
export default LoginScreen;
