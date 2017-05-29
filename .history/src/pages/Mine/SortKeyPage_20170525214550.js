/*
 * @Author: yewei 
 * @Date: 2017-05-25 21:29:18 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-25 21:45:50
 * 
 * 订阅标签的排序
 * 对用户已经订阅的标签进行拖拽排序
 * 读取数据库 => 刷新出已订阅的标签 => 拖拽改变已订阅标签的顺序 => 存入数据库
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

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedArray: [], // 已经订阅的标签
        };
        this.dataArray = []; // 数据库中的标签
        this.sortResultArray = []; // 排序后的标签
    }
    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({

});