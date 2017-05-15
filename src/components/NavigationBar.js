/*
 * @Author: yewei 
 * @Date: 2017-05-14 23:10:18 
 * @Last Modified by: jerry
 * @Last Modified time: 2017-05-14 23:26:20
 * 
 * 自定义顶部导航栏
 */

'use strict';
import React, {
    Component,
    PropTypes
} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44; // 导航栏的高度
const STATUS_BAR_HEIGHT = 20; // 状态栏的高度
export default class NavigationBar extends Component {
    /**
     * 定义组件的属性
     * 
     * @static
     * 
     * @memberof NavigationBar
     */
    static propTypes = {
        style: View.propTypes.style, // 样式
        title: PropTypes.string, // 标题
        titleView: PropTypes.element, // 标题元素
        hide: PropTypes.bool, // 是否要隐藏
        leftButton: PropTypes.element, // 左侧按钮
        rightButton: PropTypes.element, // 右侧按钮
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        };
    }
    render() {
        // 获得用户传过来的内容
        let titleView = this.props.titleView ? this.props.titleView : <Text>{this.props.title}</Text>;
        let content = (<View>
            {this.props.leftButton}
            {titleView}
            {this.props.rightButton}
        </View>);
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray'
    }
});