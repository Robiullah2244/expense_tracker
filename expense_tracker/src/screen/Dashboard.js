import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from 'expense_tracker/src/component/Header';

export default class Dashboard extends Component {
    render() {
        return (
            <View>
                <Header headerText='Dashboard' navigation={this.props.navigation}/>
                <View>
                    <Text> Dashboard Screen </Text>
                </View>
            </View>
        )
    }
}
