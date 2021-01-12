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

import IMAGES_NAME from '../../assets/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import SCREEN_NAME from '../../components/ScreenName';
import {UserContext} from '../../context/user';
import i18n from 'locales';

const RegisterScreen = ({navigation}) => {
  const u = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(true);
  const {register} = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewLogo}>
        {/* <Image
          source={IMAGES_NAME.REGISTER_LOGO}
          style={styles.imgLogo}
          resizeMode="stretch"
        /> */}
        <LottieView
          source={require('../../assets/json/Register.json')}
          style={styles.imgLogo}
          // ref={useLottieAnim()}
          autoPlay
          loop
        />
      </View>
      <View style={styles.viewContent}>
        <View>
          <TextInput
            value={u.email}
            style={styles.txtInput}
            maxLength={255}
            keyboardType={'email-address'}
            onChangeText={(text) => u.setEmail(text)}
            placeholder={i18n.t('email')}
            underlineColorAndroid="transparent"
          />
          <View>
            <TextInput
              value={u.password}
              style={styles.txtInput}
              maxLength={255}
              onChangeText={(text) => u.setPassword(text)}
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
          <View>
            <TextInput
              value={u.passwordConfirm}
              style={styles.txtInput}
              maxLength={255}
              onChangeText={(text) => u.setPasswordConfirm(text)}
              placeholder={i18n.t('password_confirm')}
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
          <Text style={styles.forgotPassword}>{i18n.t('forgot_password')}</Text>
        </View>
        <View style={styles.blockBottom}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              register(u.email, u.password);
              navigation.navigate(SCREEN_NAME.HOME_COMPONENT);
            }}>
            <Text style={styles.txtButton}>{i18n.t('Register')}</Text>
          </TouchableOpacity>
          <View style={styles.viewRegister}>
            <Text style={styles.txtAccount}>{i18n.t('have_account')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.LOGIN_SCREEN)}>
              <Text style={styles.txtRegister}>{i18n.t('Login')}</Text>
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
export default RegisterScreen;
