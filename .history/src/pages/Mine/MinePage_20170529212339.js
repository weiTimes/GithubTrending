/*
 * @Author: yewei 
 * @Date: 2017-05-21 15:12:42 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-25 22:17:21
 * 
 * 我的模块
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

import NavigationBar from '../../components/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';

export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _onSelfLabel() {
        // this.props.navigator 从上个页面传递过来的
        this.props.navigator.push({
            component: CustomKeyPage,
            params: { ...this.props }
        });
    }

    _onSortLabel() {
        this.props.navigator.push({
            component: SortKeyPage,
            params: { ...this.props }
        });
    }

    _onRemoveLabel() {
        this.props.navigator.push({
            component: CustomKeyPage,
            params: {
                ...this.props,
                isRemoveKey: true // 用来标识将要进行的是移除标签操作
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <Text style={styles.text} onPress={() => this._onSelfLabel()}>自定义标签</Text>
                <Text style={styles.text} onPress={() => this._onSortLabel()}>标签排序页</Text>
                <Text style={styles.text} onPress={() => this._onRemoveLabel()}>标签移除</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    container: {
        flex: 1
    }
});