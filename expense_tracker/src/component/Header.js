import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#f2f2f2', elevation: 5, height: 55}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon
                        style={{paddingLeft: 10, color: '#2383F7', alignSelf: 'center', justifyContent: 'center'}}
                        onPress={() => this.props.navigation.toggleDrawer()}
                        name="ios-menu"
                        size={30}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}> {this.props.headerText} </Text>
                </View>
            </View>
        )
    }
}
