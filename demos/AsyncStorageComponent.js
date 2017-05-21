/*
 * @Author: yewei 
 * @Date: 2017-05-21 14:35:47 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 14:58:36
 * 
 * AsyncStorage的基本使用
 */


'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TextInput,
    TouchableOpacity
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import NavigationBar from '../src/components/NavigationBar';

export default class AsyncStorageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    /**
     * 将数据保存在AsyncStorage中
     * 
     * 
     * @memberof AsyncStorageComponent
     */
    _onSave() {
        if (this.name) {
            AsyncStorage.setItem('name', this.name, (error) => {
                if (!error) {
                    this.toast.show('保存成功', DURATION.LENGTH_LONG);
                } else {
                    this.toast.show('保存失败', DURATION.LENGTH_LONG);
                }
            });
        } else {
            this.toast.show('保存的内容不能为空', DURATION.LENGTH_LONG);
        }

    }

    /**
     * 将数据从AsyncStorage中移除
     * 
     * 
     * @memberof AsyncStorageComponent
     */
    _onRemove() {
        AsyncStorage.removeItem('name', (error) => {
            if (!error) {
                this.toast.show('移除成功');
            } else {
                this.toast.show('移除失败');
            }
        })
    }

    /**
     * 获得AsyncStorage存储的数据
     * 
     * 
     * @memberof AsyncStorageComponent
     */
    _onFetch() {
        AsyncStorage.getItem('name', (error, result) => {
            if (!error) {
                if (result) {
                    this.toast.show(`取出的内容为${result}`);
                } else {
                    this.toast.show(`取出的内容不存在`);
                }
            } else {
                this.toast.show(`取出失败`);
            }
        });
    }

    render() {
        return (
            <View>
                <NavigationBar
                    title={'AsyncStorage的使用'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <TextInput style={styles.textinput} onChangeText={text => this.name = text} />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn} onPress={() => this._onSave()}>
                        <Text style={styles.btnText}>保存</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this._onRemove()}>
                        <Text style={styles.btnText}>移除</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this._onFetch()}>
                        <Text style={styles.btnText}>取出</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref={toast => this.toast = toast} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 30
    },
    btn: {
        margin: 5,
    },
    row: {
        flexDirection: 'row'
    },
    textinput: {
        borderWidth: 1,
        height: 40
    }
});