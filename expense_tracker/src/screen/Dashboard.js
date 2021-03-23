import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from 'expense_tracker/src/component/Header';
import Background from 'expense_tracker/src/component/Background';

export default class Dashboard extends Component {
    render() {
        return (
            <>
                <Header headerText='Dashboard' navigation={this.props.navigation}/>
                <Background>
                    <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 96}}>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                            Total Expenses
                        </Text>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                            123456
                        </Text>
                    </View>
                </Background>
            </>
        )
    }
}
