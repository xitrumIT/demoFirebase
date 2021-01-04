import analytics from '@react-native-firebase/analytics';
import moment from 'moment';

const getCurrentTime = () => {
  return moment.utc(Date.now()).local().format();
};

const logOpenTopApp = (userId, deviceId) => {
  analytics().logEvent('open_top_app', {
    screen_name: 'TopApp',
    user_id: userId,
    device_id: deviceId,
    time: getCurrentTime(),
  });
};

export {logOpenTopApp};
