/*
 * @Author: tom 
 * @Date: 2017-05-14 22:14:19 
 * @Last Modified by: jerry
 * @Last Modified time: 2017-05-14 23:09:29
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

export default class Girl extends Component {
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
        // this.props => navigator, route
        console.log(this.props);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Girl'}
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
                <Text style={styles.text}>I am girl</Text>
                <Text style={styles.text}>我收到了{this.props.word}</Text>
                <Text style={styles.text} onPress={() => {
                    this.props.onCallback('一盒巧克力'); //回调上个页面传递过来的方法
                    this.props.navigator.pop(); // 关闭当前页面    
                }}>回赠巧克力</Text>
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
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 22
    }
});