/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:04:59 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-19 23:28:29
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

import ScrollableTabView from 'react-native-scrollable-tab-view';
// ScrollableTabBar => 标签切换的效果

import NavigationBar from '../components/NavigationBar';
import DataRepository from '../expands/dao/DataRepository'; // 数据模块层

const URL = `https://api.github.com/search/repositories?q=`; // q => 关键词
const QUERY_STR = `&sort=starts`; // 查询的一个条件


export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };
        this.dataRepository = new DataRepository(); // 初始化数据模块层的类

    }

    /**
     * 拼接要查询的关键词
     * 返回完整的api url
     * 
     * @param {any} key 
     * @returns 
     * 
     * @memberof PopularPage
     */
    _getUrl(key) {
        return URL + key + QUERY_STR;
    }

    /**
     * 调用数据模块
     * 根据不同关键字   
     * 
     * 
     * @memberof PopularPage
     */
    _onLoad() {
        let url = this._getUrl(this.text); // 用户输入的关键词
        this.dataRepository.fetchNextRepository(url)
            .then(result => {
                // 将拿到的数据存到state中
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch((error) => {
                this.setState({
                    result: JSON.stringify(error)
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{ backgroundColor: '#6495ed' }}
                />
                <ScrollableTabView>
                    <Text tabLabel="React">React</Text>
                    <Text tabLabel="Java">Java</Text>
                    <Text tabLabel="Javascript">Javascript</Text>
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
