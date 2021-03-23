import React from 'react';
import{
    SafeAreaView,
    ScrollView

} from 'react-native';

// import {SafeAreaView} from 'react-navigation';

export default Background = (props) => {
    return(
        <ScrollView>
            <SafeAreaView style={{margin: 12,}}>
                {props.children}
            </SafeAreaView>
        </ScrollView>
    )
    
}