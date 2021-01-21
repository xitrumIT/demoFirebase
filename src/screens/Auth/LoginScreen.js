import {AccessToken, LoginManager} from 'react-native-fbsdk';
/* eslint-disable no-catch-shadow */
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import React, {useContext, useEffect, useRef, useState} from 'react';

import DeviceInfo from 'react-native-device-info';
import IMAGES_NAME from '../../assets/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  //show alert
  const CAlert = (title, message) => {
    Alert.alert(title, message, [{text: i18n.t('ok')}], {cancelable: false});
  };
  //  show and hide password
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  //TODO: login with email & password
  const goLogin = async () => {
    logLogin(u.deviceId);
    setShowLoading(true);
    try {
      const doLogin = await auth().signInWithEmailAndPassword(email, password);
      // setShowLoading(false);
      if (doLogin.user) {
        console.log('user login with Email ==', doLogin.user);
        u.setUser(doLogin.user);
        u.setUserId(doLogin.user.uid);
        u.setEmail(doLogin.user.email);
        navigation.navigate(SCREEN_NAME.HOME_COMPONENT);
      }
    } catch (e) {
      setShowLoading(false);
      if (email === '') {
        CAlert(i18n.t('error'), i18n.t('email_empty'));
        return;
      }
      if (e.code === 'auth/invalid-email') {
        CAlert(i18n.t('error'), i18n.t('email_format'));
        return;
      }
      if (password <= 5) {
        CAlert(i18n.t('error'), i18n.t('password_char_min'));
        return;
      }
      if (e.code === 'auth/wrong-password') {
        CAlert(i18n.t('error'), i18n.t('password_error'));
        return;
      }
      if (e.code === 'auth/too-many-requests') {
        CAlert(i18n.t('error'), i18n.t('request_max'));
        return;
      }
      if (e.code === 'auth/user-not-found') {
        CAlert(i18n.t('error'), i18n.t('user_error'));
        return;
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

  //TODO: Login with Google
  const loginGoogle = async () => {
    setShowLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } catch (e) {
      setShowLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '752285686539-rdplf4ij24crn2pfjjmdgglajg931b5o.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: Login with Facebook
  const loginFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

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
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder={i18n.t('email')}
            underlineColorAndroid="transparent"
          />
          <View>
            <TextInput
              style={styles.txtInput}
              maxLength={255}
              onChangeText={(text) => setPassword(text)}
              value={password}
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
              onPress={() => loginGoogle()}>
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
              onPress={() => loginFacebook()}>
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
              onChangeText={setMobile}
              value={mobile}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              placeholder={i18n.t('password')}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.tchModal}
              onPress={() => {
                // handleSendCode();
              }}>
              <Text style={styles.txtButton}>{i18n.t('Login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showLoading && (
        <View style={styles.activity}>
          <Loading />
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
