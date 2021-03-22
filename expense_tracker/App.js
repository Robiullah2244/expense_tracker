/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createAppContainer,
  // createSwitchNavigator,
  // StackActions,
  // NavigationActions
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TestScreen = () => {
  return(
    <View>
      <Text>
        Test Drawer Navigation
      </Text>
    </View>
  )
}

const DrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: TestScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
      drawerIcon: ({ tintColor }) => <FontAwesome name={"dashboard"} size={22} />,
    }
  },
});

const App = createAppContainer(DrawerNavigator);
export default App;

