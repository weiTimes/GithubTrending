/*
 * @Author: yewei 
 * @Date: 2017-05-15 21:45:30 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 22:04:26
 * 
 * search treding hot github project
 */


import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Root from './src/Root'; // 根入口

export default class HotCodeGithub extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('HotCodeGithub', () => HotCodeGithub);
