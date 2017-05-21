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

import NavigationBar from '../../components/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import LanguageDao, { FLAG_LANGUAGE } from '../../expands/dao/LanguageDao';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [] // 用来存储从数据库中获得自定义标签的数据
        };
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
     * @param {any} data 
     * @returns 
     * 
     * @memberof CustomKeyPage
     */
    _renderCheckBox(data) {
        let name = data.name;
        return (
            <CheckBox
                style={styles.checkbox}
                onClick={() => this._onClick(data)}
                leftText={name}
                isChecked={data.checked}
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
        // 如果没有作修改，直接返回
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
                    title={'Custom Key'}
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