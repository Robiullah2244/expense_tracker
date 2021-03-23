// import React, { Component } from 'react'
// import { Text, View, TouchableOpacity } from 'react-native'

// export default class Button extends Component {
//     render() {
//         return (
//             <TouchableOpacity 
//                 style={[
//                     this.props.type=='primary' && {backgroundColor: '#007bff'},
//                     typeof this.props.width != undefined && {width: this.props.width},
//                     {height: 36, borderRadius: 4, flex:1}]
//                 }
//             >
//                 <Text style={[this.props.type=='primary' && {color: 'white', alignItems: 'center', justifyContent: 'center',}]}> {this.props.title} </Text>
//             </TouchableOpacity>
//         )
//     }
// }


import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Blue, Gray, GrayWithOpacity} from 'expense_tracker/src/style/Colors';

const Button = (props) => (
    <TouchableOpacity style={[styles.button, props.buttonStyle]} onPress={() => props.onPress && props.onPress()}>
        <Text style={[props.titleStyle]}>
            {props.title}
        </Text>
    </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
    button:{
        height: 36,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Blue,
        padding: 8,
        elevation:10
      },
})