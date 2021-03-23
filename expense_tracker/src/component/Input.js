import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {Gray, GrayWithOpacity} from 'expense_tracker/src/style/Colors';
// import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default class InputWithIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
            
            <TextInput
                style={[styles.input, this.props.textInputStyle]}
                placeholder={this.props.placeholder}
                onChangeText={(searchString) => {this.setState({searchString})}}
                underlineColorAndroid="transparent"
                keyboardType={this.props.keyboardType}
                returnKeyType={this.props.returnKeyType}
                multiline={this.props.multiline}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GrayWithOpacity,
        borderRadius: 50,
        borderColor: Gray,
        borderWidth: 4,
    },
    searchIcon: {
        padding: 10,
        // margin: 10

        // backgroundColor: 'red',
        // borderRadius: 40
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        // backgroundColor: '#fff',
        color: 'black',
    },
})