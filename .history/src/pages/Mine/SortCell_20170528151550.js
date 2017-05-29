
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
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

});