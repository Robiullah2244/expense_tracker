import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from 'expense_tracker/src/component/Header';

export default class Expense extends Component {
    render() {
        return (
            <View>
                <Header headerText='Expense' navigation={this.props.navigation}/>
                <View>
                    <Text> Expense Screen </Text>
                </View>
            </View>
        )
    }
}
