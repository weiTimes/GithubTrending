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
    Platform,
    StatusBar, //顶部状态栏
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50; // ANDROID导航栏的高度
const NAV_BAR_HEIGHT_IOS = 44; // IOS导航栏的高度
const STATUS_BAR_HEIGHT = 20; // 状态栏的高度
const STATUSBARSHAPE = {
    backgroundColor: PropTypes.string, // 状态栏的背景色
    barStyle: PropTypes.oneOf(['default', 'light-content']), // 状态栏的样式
    hidden: PropTypes.bool //是否隐藏
}
export default class NavigationBar extends Component {
    /**
     * 定义组件的属性及类型
     * 
     * @static
     * 
     * @memberof NavigationBar
     */
    static propTypes = {
        style: View.propTypes.style, // 样式
        title: PropTypes.string, // 标题
        titleView: PropTypes.element, // 标题元素(下拉框)
        hide: PropTypes.bool, // 是否要隐藏
        leftButton: PropTypes.element, // 左侧按钮
        rightButton: PropTypes.element, // 右侧按钮
        statusBar: PropTypes.shape(STATUSBARSHAPE), // 状态栏形状的约束
    }
    /**
     * 用户没有传入的属性，有一个默认值
     * 也就是不是用户必须传入的参数
     * 
     * @static
     * 
     * @memberof NavigationBar
     */
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            // hidden: true
        }
    }
    constructor(props) {
        super(props);
        // 标题与是否隐藏是动态的
        this.state = {
            title: '',
            hide: false
        };
    }

    /**
     * 渲染核心区域
     * 
     * 
     * @memberof NavigationBar
     */
    _renderContent() {
        // 用户是否传递标题的下拉框(优先级高)
        let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
        let content = (<View style={styles.navBar}>
            {/*用户传递过来的左侧按钮*/}
            {this.props.leftButton}
            {/*title | titleView*/}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {/*用户传递过来的右侧按钮*/}
            {this.props.rightButton}
        </View>);
        return content;
    }

    render() {
        // 如果有传递背景色，则将其添加到状态栏的View
        let viewBg = this.props.statusBar ? { backgroundColor: this.props.statusBar.backgroundColor } : {};

        // 状态栏的样式需要自己赋值 this.props.statusBar
        let statusBar = <View style={[styles.statusBar, viewBg]}><StatusBar {...this.props.statusBar} /></View>; // 状态栏

        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {this._renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0 // 根据平台判断状态栏的高度
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: 0,
        top: 0
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    container: {
        backgroundColor: 'gray'
    }
});