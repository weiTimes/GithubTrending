/*
 * @Author: yewei 
 * @Date: 2017-05-25 21:29:18 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-25 23:25:55
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
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';

import SortableListView from 'react-native-sortable-listview';

import LanguageDao, { FLAG_LANGUAGE } from '../../expands/dao/LanguageDao';
import ArrayUtils from '../../utils/ArrayUtils';
import ViewTuils from '../../utils/ViewUtils';

import NavigationBar from '../../components/NavigationBar';
import SortCell from './SortCell';

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedArray: [], // 已经订阅的标签
        };
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key); // DAO层
        this.dataArray = []; // 数据库中的数据
        this.sortResultArray = []; // 排序后的数据
        this.originalCheckArray = []; // 上一次排序的数组
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData() {
        this.languageDao.fetch()
            .then(result => {
                this._getCheckedItems(result); // 筛选出已经订阅的标签
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
        this.dataArray.map(function (value, key) {
            if (value.checked) {
                checkedArray.push(value);
            }
        });

        this.setState({
            checkedArray: checkedArray  // 已经订阅的标签的顺序会随用户的拖拽而改变
        });
        this.originalCheckArray = ArrayUtils.clone(checkedArray); // 克隆一个已经订阅的数组，保存已经订阅的数据没有拖拽前的状体(排序前)
    }

    _onBack() {

    }

    _onSave() {
        if (ArrayUtils.isEqual(this.state.checkedArray, this.originalCheckArray)) { }
    }

    render() {
        let checkedArray = this.state.checkedArray;
        let rightButton = (
            <TouchableOpacity onPress={() => this._onSave()}>
                <View style={styles.save}>
                    <Text style={styles.saveText}>保存</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{ backgroundColor: '#2196f3' }}
                    leftButton={ViewTuils.getLeftButton(() => this._onBack())}
                    rightButton={rightButton}
                />
                {/*拖拽排序标签*/}
                <SortableListView
                    style={{ flex: 1 }}
                    data={checkedArray}
                    order={Object.keys(checkedArray)}
                    onRowMoved={e => {
                        checkedArray.splice(e.to, 0, checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    onMoveStart={() => console.log('on move start')} // 开始移动
                    onMoveEnd={() => console.log('on move end')} // 移动结束
                    renderRow={row => <SortCell data={row} />} // 每一行的视图
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    save: {
        marginRight: 10
    },
    saveText: {
        fontSize: 20,
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});