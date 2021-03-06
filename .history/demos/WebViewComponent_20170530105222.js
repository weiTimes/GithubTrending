/*
 * @Author: yewei 
 * @Date: 2017-05-30 10:33:08 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-30 10:52:21
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TextInput
} from 'react-native';

import NavigationBar from '../src/components/NavigationBar';

const URL = 'http://www.imooc.com';

export default class WebViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '',
            canGoBack: false
        };
    }

    _goBack() {

    }

    _go() {
        this.setState({
            url: this.text
        });
    }

    _onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack, //是否能够回到上一页
            title: e.title
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView使用'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <View style={styles.row}>
                    <Text style={styles.btn} onPress={() => this._goBack()}>返回</Text>
                    <TextInput style={styles.input} value={URL} onChangeText={text => this.text = text} />
                    <Text style={styles.btn} onPress={() => this._go()}>前往</Text>
                </View>
                <WebView
                    source={{ uri: this.state.url }}
                    onNavigationStateChange={(e) => this._onNavigationStateChange(e)} // 加载的时候会调用
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        fontSize: 20
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 4,
        paddingLeft: 4
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    container: {
        flex: 1
    }
});