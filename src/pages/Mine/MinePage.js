/*
 * @Author: yewei 
 * @Date: 2017-05-21 15:12:42 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 15:20:52
 * 
 * 我的模块
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

import NavigationBar from '../../components/NavigationBar';
import CustomKeyPage from './CustomKeyPage';

export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _onSelfLabel() {
        // this.props.navigator 从上个页面传递过来的
        this.props.navigator.push({
            component: CustomKeyPage,
            params: { ...this.props }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{ backgroundColor: '#2196f3' }}
                />
                <Text style={styles.text} onPress={() => this._onSelfLabel()}>自定义标签</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    container: {
        flex: 1
    }
});