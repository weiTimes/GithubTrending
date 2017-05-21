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

export default class ViewTuils {
    static getLeftButton(callback) {
        return (
            <TouchableOpacity onPress={() => callback()}>
                <Image style={styles.navIcon} source={require('../../res/images/ic_arrow_back_white_36pt.png')} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    navIcon: {
        width: 22,
        height: 22,
        margin: 5
    }
});