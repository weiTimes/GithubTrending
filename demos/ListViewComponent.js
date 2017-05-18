/*
 * @Author: yewei 
 * @Date: 2017-05-17 22:05:00 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-17 22:36:56
 * 
 * ListView demo
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from '../src/components/NavigationBar';

const data = [
    {
        name: 'yewei',
        email: '@****.com'
    },
    {
        name: 'yetao',
        email: '@****.com'
    }, {
        name: 'ye',
        email: '@****.com'
    }, {
        name: 'tao',
        email: '@****.com'
    }, {
        name: 'yu',
        email: '@****.com'
    }, {
        name: 'yutao',
        email: '@****.com'
    }, {
        name: 'chenjingmiao',
        email: '@****.com'
    },
    {
        name: 'yewei',
        email: '@****.com'
    }, {
        name: 'yewei',
        email: '@****.com'
    }, {
        name: 'yewei',
        email: '@****.com'
    }, {
        name: 'yewei',
        email: '@****.com'
    }, {
        name: 'yewei',
        email: '@****.com'
    }
]

export default class ListViewComponent extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: ds.cloneWithRows(data),
            isLoading: true
        };

        // 拿到数据隐藏下拉刷新器
        this._onLoad();
    }

    _renderRow(item) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={() => {
                    {/*点击每一项的时候toast该标题*/ }
                    this.toast.show(`你单击了${item.name}`, DURATION.LENGTH_LONG);
                }}>
                    <Text style={styles.rowText}>{item.name}</Text>
                    <Text style={styles.rowText}>{item.email}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 设置行与行之间间隔的视图
     * 
     * @param {any} sectionID 
     * @param {any} rowID 
     * @param {any} adjacentRowHighlighted 
     * @returns 
     * 
     * @memberof ListViewComponent
     */
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            // 给每一行设置一个唯一的id => rowId
            <View key={rowID} style={styles.line}></View>
        );
    }

    /**
     * 渲染ListView的底部
     * 
     * @returns 
     * 
     * @memberof ListViewComponent
     */
    _renderFooter() {
        return (
            <Image style={styles.footerIcon} source={{ uri: 'http://pic58.nipic.com/file/20150110/11284670_104043775000_2.jpg' }} />
        );
    }

    /**
     * 下拉刷新的回调方法
     * 
     * 
     * @memberof ListViewComponent
     */
    _onLoad() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 2000);
    }

    render() {
        return (
            <View>
                <NavigationBar
                    title={'ListView'}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)} // 设置行与行之间分隔的视图
                    renderFooter={() => this._renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this._onLoad()}
                        />
                    }
                />
                {/*得在根视图的底部加载toast*/}
                <Toast ref={toast => { this.toast = toast }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerIcon: {
        width: 400,
        height: 100,
        resizeMode: Image.resizeMode.contain
    },
    line: {
        height: 1,
        backgroundColor: '#000'
    },
    row: {
        height: 50
    },
    rowText: {
        fontSize: 18,
        color: '#0af'
    }
});