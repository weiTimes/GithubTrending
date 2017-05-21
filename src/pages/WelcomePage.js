/*
 * @Author: yewei 
 * @Date: 2017-05-18 22:31:35 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 14:53:03
 * 
 * 欢迎页
 * 引导页
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

import NavigationBar from '../components/NavigationBar';
import HomePage from './HomePage'; // 首页

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // 2秒之后跳转到首页
        this.timer = setTimeout(() => {
            // resetTo => 首页成为路由栈中的第一个路由
            this.props.navigator.resetTo({
                component: HomePage
            });
        }, 0);
    }

    /**
     * 组件卸载
     * 清除定时器
     * 
     * 
     * @memberof WelcomePage
     */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View>
                <NavigationBar
                    title={'欢迎'}
                />
                <Text>Welcome</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});