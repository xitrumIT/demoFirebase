import {ActivityIndicator, Alert} from 'react-native';
import React, {useContext, useState} from 'react';

import SCREEN_NAME from '../components/ScreenName';
import {UserContext} from '../context/user';
import auth from '@react-native-firebase/auth';
import i18n from 'locales';

const FirebaseAuth = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const u = useContext(UserContext);

  const CAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: i18n.t('ok'), onPress: () => navigation.navigate('Login')}],
      {cancelable: false},
    );
  };

  const onLogin = async () => {
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
      }
      if (u.password <= 5) {
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

  const onResetPassword = async (email) => {
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

  const onLogout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const onRegister = async (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
};

export default FirebaseAuth;
