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
    Image
} from 'react-native';

import SortableListView from 'react-native-sortable-listview';

import LanguageDao, { FLAG_LANGUAGE } from '../../expands/dao/LanguageDao';
import ArrayUtils from '../../utils/ArrayUtils';
import NavigationBar from '../../components/NavigationBar';
import ViewTuils from '../../utils/ViewUtils';

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
        this.dataArray.map(function (value, key) {
            if (value.checked) {
                checkedArray.push(value);
            }
        });

        this.setState({
            checkedArray: checkedArray
        });
        this.originalCheckArray = ArrayUtils.clone(checkedArray); // 克隆一个已经订阅的数组
    }

    _onBack() {

    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{ backgroundColor: '#2196f3' }}
                    leftButton={ViewTuils.getLeftButton(() => this._onBack())}
                />
                {/*拖拽排序标签*/}
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    onMoveStart={() => console.log('on move start')}
                    onMoveEnd={() => console.log('on move end')}
                    renderRow={row => <SortCell data={row} />}
                />
            </View>
        );
    }
}

/**
 * 拖拽变迁的每一行视图
 * 
 * @class SortCell
 * @extends {Component}
 */
class SortCell extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        let rowData = this.props.data;;
        return (
            <View>
                <TouchableHighlight
                    underlayColor={'#eee'}
                    delayLongPress={500} // 延迟500ms
                    style={styles.cellBtn}
                    {...this.props.sortHandlers}
                >
                    <View style={styles.row}>
                        <Image style={styles.sortPic} source={require('./images/ic_sort.png')} />
                        <Text>{rowData.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortPic: {
        tintColor: '#2196f3',
        width: 16,
        height: 16,
        marginRight: 10
    },
    cellBtn: {
        padding: 25,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee'

    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});