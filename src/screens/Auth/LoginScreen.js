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
import React, {useContext, useEffect, useState} from 'react';

import DeviceInfo from 'react-native-device-info';
import IMAGES_NAME from '../../assets/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SCREEN_NAME from '../../components/ScreenName';
import {UserContext} from '../../context/user';
import i18n from 'locales';

const LoginScreen = ({navigation}) => {
  const u = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
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
              secureTextEntry={!passwordShown}
            />
            <TouchableOpacity
              style={styles.touchEye}
              onPress={() => togglePasswordVisiblity()}>
              <Ionicons
                name={
                  !passwordShown
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
            onPress={() => navigation.navigate(SCREEN_NAME.HOME_SCREEN)}>
            <Text style={styles.txtButton}>{i18n.t('Login')}</Text>
          </TouchableOpacity>
          <Text style={styles.txtOr}> {i18n.t('or')}</Text>
          <View style={styles.otherLogin}>
            <TouchableOpacity style={styles.touchOther}>
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
            <TouchableOpacity style={styles.touchOther}>
              <Icon
                name={
                  Platform.OS === 'ios' ? 'ios-logo-google' : 'md-logo-google'
                }
                color={'#ed5565'}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchOther}>
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
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  imgLogo: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.6,
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  touchEye: {
    position: 'absolute',
    right: 0,
    marginTop: 15,
    marginRight: 10,
  },
  btnLogin: {
    height: 50,
    width: WIDTH - 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20C3AF',
  },
  txtButton: {
    color: '#fff',
    fontSize: 16,
  },
  blockBottom: {
    alignItems: 'center',
  },
  txtOr: {
    marginVertical: 20,
  },
  otherLogin: {
    width: WIDTH - 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchOther: {
    alignItems: 'center',
    justifyContent: 'center',
    height: WIDTH / 5,
    width: WIDTH / 5,
    borderColor: '#808080',
    borderWidth: 0.5,
  },
  viewRegister: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  txtInput: {
    height: 50,
    width: WIDTH - 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  txtAccount: {
    fontSize: 16,
  },
  txtRegister: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fa4134',
  },
});
export default LoginScreen;
