/*
 * @Author: yewei 
 * @Date: 2017-05-20 16:59:32 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-20 17:53:52
 * 
 * ListView的每一个数据项的渲染视图
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        let itemData = this.props.data;
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{itemData.full_name}</Text>
                    <Text style={styles.desc}>{itemData.description}</Text>
                    <View style={styles.authorRow}>
                        <View style={[styles.authorRow, styles.alignSet]}>
                            <Text style={styles.authorname}>Author:</Text>
                            <Image style={styles.avatar} source={{ uri: itemData.owner.avatar_url }} />
                        </View>
                        <Text style={styles.star}>Stars:{itemData.stargazers_count}</Text>
                        <Image style={styles.staricon} source={require('../../res/images/ic_star.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    container: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        // fontWeight: 'bold'
    },
    desc: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    alignSet: {
        alignItems: 'center'
    },
    authorname: {
    },
    authorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 22,
        height: 22
    },
    star: {
        alignSelf: 'center'
    },
    staricon: {
        width: 22,
        height: 22
    }
});