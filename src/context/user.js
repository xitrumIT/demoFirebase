import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
