import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import DeviceInfo from 'react-native-device-info';
import IMAGES_NAME from '../../assets/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import SCREEN_NAME from '../../components/ScreenName';
import {UserContext} from '../../context/user';
import auth from '@react-native-firebase/auth';
import i18n from 'locales';
import {logLogin} from '../../services/analytics';

const LoginScreen = ({navigation}) => {
  const u = useContext(UserContext);
  const [showLoading, setShowLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // const useLottieAnim = () => {
  //   const animation = useRef(null);

  //   useEffect(() => {
  //     if (animation.current) {
  //       animation.current.play();
  //     }
  //     return () => {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       animation.current && animation.current.reset();
  //     };
  //   }, []);

  //   return animation;
  // };

  const CAlert = (title, message) => {
    Alert.alert(title, message, [{text: i18n.t('ok')}], {cancelable: false});
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(u.mobile);
      setConfirm(confirmation);
    } catch (e) {
      console.log(e.message);
      // Alert.alert(e.message);
    }
  };
  const validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(u.mobile);
  };
  const handleSendCode = () => {
    // Request to send OTP
    if (validatePhoneNumber()) {
      auth()
        .signInWithPhoneNumber(u.mobile)
        .then((confirmResult) => {
          // this.setState({confirmResult});
          console.log('confirm');
        })
        .catch((error) => {
          alert(error.message);

          console.log(error);
        });
    } else {
      alert('Invalid Phone Number');
    }
  };

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const goLogin = async () => {
    logLogin(u.deviceId);
    setShowLoading(true);
    try {
      const doLogin = await auth().signInWithEmailAndPassword(
        u.email,
        u.password,
      );
      setShowLoading(false);
      if (doLogin.user) {
        navigation.navigate(SCREEN_NAME.HOME_COMPONENT);
      }
    } catch (e) {
      setShowLoading(false);
      if (u.email === '') {
        CAlert(i18n.t('error'), i18n.t('email_empty'));
      } else if (e.code === 'auth/invalid-email') {
        CAlert(i18n.t('error'), i18n.t('email_format'));
      } else if (u.password <= 5) {
        CAlert(i18n.t('error'), i18n.t('password_char_min'));
      } else if (e.code === 'auth/wrong-password') {
        CAlert(i18n.t('error'), i18n.t('password_error'));
      }
      if (e.code === 'auth/too-many-requests') {
        CAlert(i18n.t('error'), i18n.t('request_max'));
      }
      if (e.code === 'auth/user-not-found') {
        CAlert(i18n.t('error'), i18n.t('user_error'));
      }
      console.log(e.message);
      // Alert.alert(e.message);
    }
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
        {/* <Image source={IMAGES_NAME.LOGIN_LOGO} style={styles.imgLogo} />
         */}
        <LottieView
          source={require('../../assets/json/Login.json')}
          style={styles.imgLogo}
          // ref={useLottieAnim()}
          autoPlay
          loop
        />
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
              onChangeText={u.setPassword}
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
          <Text
            style={styles.forgotPassword}
            onPress={() => {
              navigation.navigate(SCREEN_NAME.FORGOT_PASSWORD_SCREEN);
            }}>
            {i18n.t('forgot_password')}
          </Text>
        </View>
        <View style={styles.blockBottom}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              goLogin();
            }}>
            <Text style={styles.txtButton}>{i18n.t('Login')}</Text>
          </TouchableOpacity>
          <Text style={styles.txtOr}> {i18n.t('or')}</Text>
          <View style={styles.otherLogin}>
            <TouchableOpacity
              style={styles.touchOther}
              onPress={() => setModalVisible(true)}>
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
            <Text style={styles.txtAccount}>{i18n.t('no_account')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.REGISTER_SCREEN)}>
              <Text style={styles.txtRegister}>{i18n.t('Register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        style={styles.containerModal}
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationInTiming={800}
        animationOutTiming={800}
        avoidKeyboard={true}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.viewModal}>
          <Text style={styles.txtRegister}>Enter your phone!</Text>
          <View>
            <TextInput
              style={styles.txtInput}
              maxLength={255}
              onChangeText={u.setMobile}
              value={u.mobile}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              placeholder={i18n.t('password')}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.tchModal}
              onPress={() => {
                handleSendCode();
              }}>
              <Text style={styles.txtButton}>{i18n.t('Login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showLoading && (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#59b18c" />
        </View>
      )}
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
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
  viewModal: {
    backgroundColor: 'white',
    height: WIDTH * 0.6,
    width: WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tchModal: {
    height: 50,
    width: WIDTH - 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
export default LoginScreen;
