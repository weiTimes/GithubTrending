/*
 * @Author: yewei 
 * @Date: 2017-05-15 11:56:18 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 15:43:32
 */

'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class ChatScreen extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: `Chat with ${navigation.state.params.user}`,
    //     headerTintColor: 'red',
    //     headerRight: <Button title="Info" />
    // });
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat width ${user}`,
            headerTintColor: 'red',
            headerRight: (<Button title={isInfo ? 'Done' : `${user}'s info`} onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })} />)
        };
    };
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        // 取得通过路由传递过来的参数
        let params = this.props.navigation.state.params;

        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});