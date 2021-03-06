/*
 * @Author: yewei 
 * @Date: 2017-05-21 15:17:34 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 21:27:21
 * 
 * 自定义标签页
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';

import NavigationBar from '../../components/NavigationBar'; // 导航栏
import ViewUtils from '../../utils/ViewUtils'; // 渲染回退按钮的视图工具方法
import ArrayUtils from '../../utils/ArrayUtils'; // 数组工具方法
import LanguageDao, { FLAG_LANGUAGE } from '../../expands/dao/LanguageDao'; // 本地数据库操作层

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [] // 用来存储从数据库中获得自定义标签的数据
        };
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues = []; // 记录用户所作的修改, 如果为空，则没有修改(默认为空)
    }

    componentDidMount() {
        this._loadData();
    }

    /**
     * 加载自定义标签的数据
     * 存储在数据库中
     * 
     * @memberof CustomKeyPage
     */
    _loadData() {
        this.languageDao.fetch()
            .then(result => {
                // 将拿到的数据更新到state中
                this.setState({
                    dataArray: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * 点击返回按钮的时候检查是否需要保存当前的工作区
     * 
     * 
     * @memberof CustomKeyPage
     */
    _onSave() {
        /**
         * 判断用户是否有作修改
         * 如果没有改变，直接返回上一页
         * 反之，先存储state中的dataArray到数据库中
         */
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        // 将更改后的值存储(更新)到数据库中，然后返回上一页
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    /**
     * 每一列的点击事件
     * 分为两种情况
     * 一种是自定义标签的操作 => 改变标签的选中状态
     * 一种是移除标签的操作 => 记录用户选择的标签，不改变选中状态
     * 
     * 
     * @memberof CustomKeyPage
     */
    _onClick(data) {
        data.checked = !data.checked; // 记录并改变state中dataArray的值，
        ArrayUtils.updateArray(this.changeValues, data); // 记录用户所作的修改，数组中存放着用户更改过得标签，由于changValue是数组，所以被改变了
    }

    /**
     * 渲染每一列的checkbox
     * 
     * @param {any} data state中的数据
     * @returns 
     * 
     * @memberof CustomKeyPage
     */
    _renderCheckBox(data) {
        let name = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked; // 如果是进行的是移除标签操作，初始状态是不选中
        return (
            <CheckBox
                style={styles.checkbox}
                onClick={() => this._onClick(data)}
                leftText={name}
                isChecked={isChecked}
                checkedImage={<Image style={styles.image} source={require('./images/ic_check_box.png')} />}
                unCheckedImage={<Image style={styles.image} source={require('./images/ic_check_box_outline_blank.png')} />}
            />
        );
    }

    /**
     * 将拿到自定义标签的数据渲染到视图中
     * 每行两列
     * 
     * @returns 
     * 
     * @memberof CustomKeyPage
     */
    _renderLabel() {
        /**
         * 如果数据为空或者长度为0
         */
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            return null;
        }
        let len = this.state.dataArray.length;
        let views = [];
        // 遍历拿到的数据
        // 显示方式 => 一行两列
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.labelView}>
                        {this._renderCheckBox(this.state.dataArray[i])}
                        {this._renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            );
        }

        /**
         * 可能会少了一列或者两列
         * 长度为偶数 => 两列
         * 长度为奇数 => 一列
         */
        views.push(
            // 最后一行
            <View key={len - 1}>
                <View style={styles.labelView}>
                    {len % 2 === 0 ? this._renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this._renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}></View>
            </View>
        );
        return views;
    }

    /**
     * 按返回键的时候
     *
     * 
     * @memberof CustomKeyPage
     */
    _onBack() {
        // 如果没有作修改，直接返回，反之，如果是不保存也是直接返回上一页，
        // 如果是保存，则先将数据更新到数据库中，然后再返回上一页
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }

        Alert.alert(
            '提示',
            '要保存修改吗?',
            [
                {
                    text: '不保存',
                    onPress: () => {
                        this.props.navigator.pop();
                    },
                    style: 'cancel'
                },
                {
                    text: '保存',
                    onPress: () => { this._onSave() },
                }
            ]
        );
    }

    render() {
        let title = this.isRemoveKey ? '标签移除' : 'Custom Key';
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let rightButton = (
            <TouchableOpacity onPress={() => this._onSave()}>
                <View style={styles.save}>
                    <Text style={styles.saveText}>{rightButtonTitle}</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    style={{ backgroundColor: '#2196f3' }}
                    leftButton={ViewUtils.getLeftButton(() => this._onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>
                    {this._renderLabel()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        tintColor: '#2196f3'
    },
    checkbox: {
        flex: 1,
        padding: 10
    },
    labelView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
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