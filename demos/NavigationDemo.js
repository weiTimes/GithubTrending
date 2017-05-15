/*
 * @Author: yewei 
 * @Date: 2017-05-15 11:35:12 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 13:58:30
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation'; // 顶部导航栏, navigator( 路由 )


import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import MainScreenNavigator from './TabNavigatorComponent';

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen }
});

const styles = StyleSheet.create({

});

export default SimpleApp;
