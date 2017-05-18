/*
 * @Author: yewei 
 * @Date: 2017-05-14 19:04:54 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-18 22:55:00
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
    Navigator // 导航组件( 路由 跳转到另一个页面 相互间传递数据 )
} from 'react-native';

// import Boy from '../demos/Boy'; // navigator demo
// import ListViewComponent from '../demos/ListViewComponent'; // ListView Demo
import WelcomePage from './pages/WelcomePage'; // 初始路由 欢迎页

export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderScene(route, navigator) {
        let Component = route.component; // 获得初始化的组件
        return <Component navigator={navigator} {...route.params} /> // 跳转到获得的组件，并且传递相应的参数过去
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    //初始化路由
                    initialRoute={{
                        component: WelcomePage
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                ></Navigator>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});