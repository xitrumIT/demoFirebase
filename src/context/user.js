import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (email, password) => {
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
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        deviceId,
        setDeviceId,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        login,
        register,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
