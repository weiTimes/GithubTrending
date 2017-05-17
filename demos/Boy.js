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
    TouchableOpacity,
    Image
} from 'react-native';

import NavigationBar from '../src/components/NavigationBar';
import Girl from './Girl';

export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        };
    }

    /**
     * 返回上一个页面
     * 
     * 
     * @memberof Boy
     */
    _back() {
        this.props.navigator.pop();
    }

    /**
     * 返回顶部导航栏的返回按钮或者是收藏按钮
     * 
     * @param {any} image 图片地址
     * 
     * @memberof Boy
     */
    _renderIcon(image) {
        return (
            <TouchableOpacity onPress={() => this._back()}>
                <Image style={styles.navIcon} source={image} />
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    style={{ backgroundColor: '#ee6363' }}
                    //statusBar={{
                    //    barStyle: 'light-content'
                    //}}
                    leftButton={
                        // 请求url的时候，require不能分离开来
                        this._renderIcon(require('../res/images/ic_arrow_back_white_36pt.png'))
                    }
                    rightButton={
                        this._renderIcon(require('../res/images/ic_star.png'))
                    }
                />
                <Text style={styles.text}>I am boy</Text>
                {/*点击跳转到女孩界面*/}
                <Text style={styles.text} onPress={() => {
                    {/*跳转到女孩这个组件，并且传递两个参数过去*/ }
                    this.props.navigator.push({
                        title: '女孩',
                        component: Girl,
                        //传递参数过去
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
    navIcon: {
        width: 22,
        height: 22,
        margin: 5
    },
    container: {
        flex: 1,
        backgroundColor: 'gray',
        // justifyContent: 'center', // 主轴居中
        // alignItems: 'center' // 侧轴居中
    },
    text: {
        fontSize: 20
    }
});