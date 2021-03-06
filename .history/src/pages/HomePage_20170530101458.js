/*
 * @Author: yewei 
 * @Date: 2017-05-18 22:39:00 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 15:18:31
 * 
 * 首页
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
    DeviceEventEmitter, // 事件发射器
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'; // 底部导航栏
import Toast, { DURATION } from 'react-native-easy-toast';

import PopularPage from './PopularPage';
import MinePage from './Mine/MinePage';
import AsyncStorageComponent from '../../demos/AsyncStorageComponent';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        };
    }

    componentDidMount() {
        // 监听
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_LONG);
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'} // 是否被选中
                        selectedTitleStyle={{ color: '#2196f3' }} // 选中时的标题颜色
                        title="Popular" // 标题
                        renderIcon={() => <Image style={styles.tabicon} source={require('../../res/images/ic_polular.png')} />} // 图片
                        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../../res/images/ic_polular.png')} />} // 选中时的图标，选中时给图标着为红色
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{ color: 'red' }}
                        title="趋势"
                        renderIcon={() => <Image style={styles.tabicon} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <AsyncStorageComponent />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'} // 是否被选中
                        selectedTitleStyle={{ color: 'red' }} // 选中时的标题颜色
                        title="收藏" // 标题
                        renderIcon={() => <Image style={styles.tabicon} source={require('../../res/images/ic_polular.png')} />} // 图片
                        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../../res/images/ic_polular.png')} />} // 选中时的图标，选中时给图标着为红色
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'bg_my'}
                        selectedTitleStyle={{ color: 'red' }}
                        title="我的"
                        renderIcon={() => <Image style={styles.tabicon} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'bg_my' })}>
                        {/*将navigator等传递过去*/}
                        <MinePage {...this.props} />
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast => this.toast = toast} />
            </View>

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
        tintColor: '#2196f3' // 当被选中时，给图片着色
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