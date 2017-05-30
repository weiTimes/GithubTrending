/*
 * @Author: yewei 
 * @Date: 2017-05-30 10:33:08 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-30 10:41:16
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import NavigationBar from '../src/components/NavigationBar';

const URL = 'http://www.imooc.com';

export default class WebViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView使用'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <View style={styles.row}></View>
                <WebView
                    source={{ uri: this.state.url }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    container: {
        flex: 1
    }
});