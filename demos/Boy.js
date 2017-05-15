/*
 * @Author: tom 
 * @Date: 2017-05-14 22:14:03 
 * @Last Modified by: jerry
 * @Last Modified time: 2017-05-14 23:09:36
 * 
 * 测试NavigatorIOS
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

import Girl from './Girl';

export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>I am boy</Text>
                {/*点击跳转到女孩界面*/}
                <Text style={styles.text} onPress={() => {
                    this.props.navigator.push({
                        title: '女孩',
                        component: Girl,
                        params: {
                            word: '一只玫瑰',
                            onCallback: (word) => {
                                this.setState({
                                    word: word
                                });
                            }
                        }
                    });
                }}>送女孩一支玫瑰</Text>
                <Text style={styles.text}>{this.state.word}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center', // 主轴居中
        alignItems: 'center' // 侧轴居中
    },
    text: {
        fontSize: 20
    }
});