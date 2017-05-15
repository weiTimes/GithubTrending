/*
 * @Author: yewei 
 * @Date: 2017-05-15 21:45:44 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 21:46:05
 * 
 * search treding hot github project
 */

import React, { Component } from 'react';
import {
  AppRegistry
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
