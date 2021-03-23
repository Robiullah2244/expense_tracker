import React from 'react';
import{
    SafeAreaView,
    ScrollView

} from 'react-native';

// import {SafeAreaView} from 'react-navigation';

export default Background = (props) => {
    return(
        <SafeAreaView style={{marginHorizontal: 8}}>
            <ScrollView>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    )
    
}