/*
 * @Author: yewei 
 * @Date: 2017-05-20 16:22:41 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-20 18:30:36
 * 
 * 受欢迎tab项的每一个子tab组件
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl
} from 'react-native';

import DataRepository from '../expands/dao/DataRepository'; // 数据模块层
import RepositoryCell from '../components/RepositoryCell';

const URL = `https://api.github.com/search/repositories?q=`; // q => 关键词
const QUERY_STR = `&sort=starts`; // 查询的一个条件

export default class PopularTab extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            result: '',
            dataSource: ds,
            isLoading: false
        };
        this.dataRepository = new DataRepository(); // 初始化数据模块层的类
    }

    componentDidMount() {
        this._onLoad();
    }

    /**
     * 拼接要查询的关键词
     * 返回完整的api url
     * 
     * @param {any} key 
     * @returns 
     * 
     * @memberof PopularPage
     */
    _getUrl(key) {
        return URL + key + QUERY_STR;
    }

    /**
     * 调用数据模块
     * 根据不同关键字   
     * 
     * 
     * @memberof PopularPage
     */
    _onLoad() {
        // 正在加载的时候显示loading
        this.setState({
            isLoading: true
        });
        let url = this._getUrl(this.props.tabLabel); // 用户选择的标签，父组件通过props传递过来
        this.dataRepository.fetchRepository(url)
            .then(result => {
                // 将拿到的数据存到state中
                let items = result && result.items ? result.items : (result ? result : []); // 被包装过的数据(result.items 存在数据库中的) 没有被封装过的，从网络中获得的(result)
                console.log('加载数据');

                console.log(items);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items), // 数组
                    isLoading: false // 拿到数据后关闭loading
                });
                // 如果时间过期
                // 先渲染出旧的数据，如果数据过期，则加载新的数据
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    return this.dataRepository.fetchNextRepository(url);
                }
            })
            .then(items => { // 拿到新的数据
                if (!items && items.length === 0) {
                    return;
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items), // 数组
                });
            })
            .catch((error) => {
                this.setState({
                    result: JSON.stringify(error)
                });
            });
    }

    _renderRow(item) {
        return (
            <RepositoryCell data={item} />
        );
    }

    render() {
        console.log('render');

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this._onLoad()} //用户下拉刷新的时候重新获取数据
                            colors={['#2196f3']} // android
                            tintColor={'#2196f3'} // ios
                            title={'Loading'}
                            titleColor={'#2196f3'}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        height: 600
    }
});