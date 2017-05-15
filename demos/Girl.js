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
} from 'react-native';

export default class Girl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        };
    }
    render() {
        // this.props => navigator, route
        console.log(this.props);
        return (
            <View style={styles.container}>
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
    container: {
        flex: 1,
        backgroundColor: '#0af',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22
    }
});