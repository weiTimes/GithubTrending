/*
 * @Author: yewei 
 * @Date: 2017-05-30 10:33:08 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-30 10:34:45
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
            url: this.state.URL
        };
    }
    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({

});