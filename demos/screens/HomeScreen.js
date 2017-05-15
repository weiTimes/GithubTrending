/*
 * @Author: yewei 
 * @Date: 2017-05-15 11:38:42 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-15 13:58:11
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

export default class HomeScreen extends Component {
    // 定义导航栏的标题
    static navigationOptions = {
        title: 'Welcome',
        headerTintColor: 'red',
        headerRight: <Button title="Info" />
    };
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { navigate } = this.props.navigation; // 获得路由的跳转属性
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                {/*按钮组件*/}
                <Button
                    style={styles.chatbtn}
                    onPress={() => {
                        navigate('Chat', { user: 'yewei' }); // 跳转到chat这个screen, 并且传递参数过去
                    }}
                    title="Chat with Lucy"
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    chatbtn: {
    }
});