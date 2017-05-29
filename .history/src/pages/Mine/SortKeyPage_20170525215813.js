/*
 * @Author: yewei 
 * @Date: 2017-05-25 21:29:18 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-25 21:58:13
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

import LanguageDao, { FLAG_LANGUAGE } from '../../expands/dao/LanguageDao';

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedArray: [], // 已经订阅的标签
        };
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key); // DAO层
        this.dataArray = []; // 数据库中的标签
        this.sortResultArray = []; // 排序后的标签
        this.originalCheckArray = []; // 上一次排序的数组
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData() {
        this.languageDao.fetch()
            .then(result => {
                this._getCheckedItems(result);
            })
            .catch(error => {

            });
    }

    /**
     * 筛选出已经订阅的标签
     * 
     * @param {any} result 数据库中取到的数据
     * 
     * @memberof SortKeyPage
     */
    _getCheckedItems(result) {
        this.dataArray = result; // 将数据保存一份，以便之后可以与数据库中的数据进行对比(因为改变了数组的内容会同时改变引用本身)
        let checkedArray = []; // 保存已经订阅的标签
        dataArray.map(function (value, key) {
            if (value.checked) {
                checkedArray.push(value);
            }
        });
        this.setState({
            checkedArray: checkedArray
        });
    }

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({

});