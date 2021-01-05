import analytics from '@react-native-firebase/analytics';
import moment from 'moment';

const getCurrentTime = () => {
  return moment.utc(Date.now()).local().format();
};

const logGoHome = (deviceId) => {
  analytics().logEvent('open_home', {
    screen_name: 'Home Screen',
    device_id: deviceId,
    time: getCurrentTime(),
  });
};
const logOpenDrawer = (deviceId) => {
  analytics().logEvent('open_drawer', {
    device_id: deviceId,
    time: getCurrentTime(),
  });
};
const logLogin = (deviceId) => {
  analytics().logEvent('click_login', {
    screen_name: 'Login',
    event_click: 'Click_Login_Button',
    device_id: deviceId,
    time: getCurrentTime(),
  });
};

export {logGoHome, logOpenDrawer, logLogin};
