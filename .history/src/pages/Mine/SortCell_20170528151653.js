
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';

export default class SortCell extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        let rowData = this.props.data;;
        return (
            <View>
                <TouchableHighlight
                    underlayColor={'#eee'}
                    delayLongPress={500} // 延迟500ms
                    style={styles.cellBtn}
                    {...this.props.sortHandlers}
                >
                    <View style={styles.row}>
                        <Image style={styles.sortPic} source={require('./images/ic_sort.png')} />
                        <Text>{rowData.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortPic: {
        tintColor: '#2196f3',
        width: 16,
        height: 16,
        marginRight: 10
    },
    cellBtn: {
        padding: 25,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee'

    },
});