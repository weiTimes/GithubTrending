/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:04:59 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 21:18:22
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
import LanguageDao, { FLAG_LANGUAGE } from '../expands/dao/LanguageDao';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: []
        };
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key); // 初始化数据模块层(本地数据库操作类)
    }

    componentDidMount() {
        this._loadData();
    }

    /**
     * 加载自定义标签的数据
     * 存储在数据库中的数据
     * 
     * @memberof CustomKeyPage
     */
    _loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // 如果数据还没加载完成，返回一个空的Scroll...反之，正常返回；为了防止ScrollableTabView在数据加载后不能正确计算组件的实际宽度导致的抖动闪烁情况
        let content = this.state.languages.length > 0 ? (
            <ScrollableTabView
                tabBarBackgroundColor={"#2196f3"}
                tabBarActiveTextColor={'mintcream'}
                tabBarInactiveTextColor={'mintcream'}
                tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
                renderTabBar={() => <ScrollableTabBar />} // tab切换的效果
            >
                {
                    this.state.languages.map((result, i, arr) => {
                        return result.checked ? <PopularTab key={i} tabLabel={result.name}>result.name</PopularTab> : null;
                    })
                }
            </ScrollableTabView>
        ) : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Popular'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                {content}
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
