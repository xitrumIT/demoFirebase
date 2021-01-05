import {StackActions} from '@react-navigation/native';
import {createRef} from 'react';

export const navigationRef = createRef();
export const routeNameRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
export function goBack() {
  navigationRef.current?.goBack();
}
