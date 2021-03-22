/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DashboardScreen from 'expense_tracker/src/screen/Dashboard';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createAppContainer,
} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name={"view-dashboard"} size={22} />,
    }
  },
});

const App = createAppContainer(DrawerNavigator);
export default App;

