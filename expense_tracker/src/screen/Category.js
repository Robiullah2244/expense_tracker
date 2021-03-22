import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from 'expense_tracker/src/component/Header';

export default class Category extends Component {
    render() {
        return (
            <View>
                <Header headerText='Category' navigation={this.props.navigation}/>
                <View>
                    <Text> Category Screen </Text>
                </View>
            </View>
        )
    }
}
