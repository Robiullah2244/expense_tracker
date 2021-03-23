/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DashboardScreen from 'expense_tracker/src/screen/Dashboard';
import ExpenseScreen from 'expense_tracker/src/screen/Expense';
import CategoryScreen from 'expense_tracker/src/screen/Category';

import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createAppContainer,
} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Provider } from 'react-redux';
import { store, persistor} from 'expense_tracker/src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'


const DrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name={"view-dashboard"} size={22} />,
    }
  },
  Expense: {
    screen: ExpenseScreen,
    navigationOptions: {
      drawerLabel: 'Expense',
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name={"currency-bdt"} size={22} />,
    }
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      drawerLabel: 'Category',
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name={"tag-multiple"} size={22} />,
    }
  },
});

const App = createAppContainer(DrawerNavigator);

const AppWithRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
)
export default AppWithRedux;

