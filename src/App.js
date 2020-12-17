import React, {Component} from 'react';

import AppContainer from './navigators/AppContainer';
import Router from './navigators/Router';

export default class App extends Component {
  render() {
    return <Router />;
  }
}
