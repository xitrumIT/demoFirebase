import LottieView from 'lottie-react-native';
import React from 'react';

export default function Loading() {
  return (
    <LottieView
      source={require('../assets/json/Loading.json')}
      autoPlay
      speed={1.5}
      loop
    />
  );
}
