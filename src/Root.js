/*
 * @Author: yewei 
 * @Date: 2017-05-14 19:04:54 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-17 22:56:59
 * 
 * ios, android的根入口
 * 底部导航栏
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator // 导航组件( 路由 跳转到另一个页面 相互间传递数据 )
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'; // 底部导航栏

import Boy from '../demos/Boy'; // navigator demo
import ListViewComponent from '../demos/ListViewComponent'; // ListView Demo

export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        };
    }
    render() {
        return (
            <View style={styles.container}>
                {/*<Navigator
                    //初始化路由
                    initialRoute={{
                        component: Boy
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component; // 获得初始化的组件
                        return <Component navigator={navigator} {...route.params} /> // 跳转到获得的组件，并且传递相应的参数过去
                    }}
                ></Navigator>*/}
            </View >

        );
    }
}

const styles = StyleSheet.create({
    showflex: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    },
    tabicon: {
        width: 22,
        height: 22
    },
    ontabicon: {
        tintColor: 'red' // 当被选中时，给图片着色
    },
    page1: {
        flex: 1,
        backgroundColor: '#0af'
    },
    page2: {
        flex: 1,
        backgroundColor: '#afa'
    }

});