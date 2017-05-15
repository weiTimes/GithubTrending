/*
 * @Author: yewei 
 * @Date: 2017-05-15 13:31:04 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 13:57:08
 * 
 * 顶部tab导航栏
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
import { TabNavigator } from "react-navigation"; // 顶部tab导航

class RecentChatsScreen extends Component {
    render() {
        return <Text>List of recent chats</Text>
    }
}

class AllContactsScreen extends Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChatsScreen },
    All: { screen: AllContactsScreen },
},
    {
        navigationOptions: {
            headerTintColor: 'red' // 头部的颜色
        }
    }
);

const styles = StyleSheet.create({

});

export default MainScreenNavigator;