import React, {useState} from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [deviceId, setDeviceId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <UserContext.Provider
      value={{
        deviceId,
        setDeviceId,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
      }}>
      {children}
    </UserContext.Provider>
  );
};
