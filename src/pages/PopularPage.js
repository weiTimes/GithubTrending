/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:04:59 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-20 18:30:56
 * 
 * 首页中的欢迎模块
 * 默认欢迎模块是显示
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

// ScrollableTabBar => 标签切换的效果
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import NavigationBar from '../components/NavigationBar';
import PopularTab from '../components/PopularTab'; // 顶部tab切换的每一项
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <ScrollableTabView
                    tabBarBackgroundColor={"#2196f3"}
                    tabBarActiveTextColor={'mintcream'}
                    tabBarInactiveTextColor={'mintcream'}
                    tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
                    renderTabBar={() => <ScrollableTabBar />} // tab切换的效果
                >
                    <PopularTab tabLabel="React">React</PopularTab>
                    <PopularTab tabLabel="Java">Java</PopularTab>
                    <PopularTab tabLabel="Javascript">Javascript</PopularTab>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1
    },
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20
    }
});
