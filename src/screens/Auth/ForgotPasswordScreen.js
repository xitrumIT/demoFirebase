import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import CustomHeader from '../../navigators/CustomHeader';
import LottieView from 'lottie-react-native';
import SCREEN_NAME from '../../components/ScreenName';
import auth from '@react-native-firebase/auth';
import i18n from 'locales';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const CAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: i18n.t('ok'), onPress: () => navigation.navigate('Login')}],
      {cancelable: false},
    );
  };

  const onResetPassword = async () => {
    setShowLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      CAlert(
        i18n.t('forgot_password_success'),
        i18n.t('title_forgot_password'),
      );
      setShowLoading(false);
    } catch (e) {
      setShowLoading(false);
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="ForgotPasswordScreen" navigation={navigation} />
      <View style={styles.viewContent}>
        {/* <Image source={require('../../assets/key.png')} style={styles.Image} /> */}
        <View style={styles.top_container}>
          <LottieView
            source={require('../../assets/json/Forgotpassword.json')}
            style={styles.imgLogo}
            // ref={useLottieAnim()}
            autoPlay
            loop
          />
        </View>
        <View style={styles.bottom_Container}>
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t('input_email')}
            onChangeText={setEmail}
            value={email}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => onResetPassword()}>
            <Text style={styles.textLogin}>{i18n.t('password_recovery')}</Text>
          </TouchableOpacity>
        </View>
        {showLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#59b18c" />
          </View>
        )}
      </View>
    </View>
  );
};
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
  },
  textContent: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  textInput: {
    //flex:1,
    height: 60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  btnLogin: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff7373',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
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
  top_container: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.6,
    marginTop: 20,
  },
  bottom_Container: {
    width: WIDTH,
    height: HEIGHT / 2,
    justifyContent: 'center',
  },
});
export default ForgotPasswordScreen;
