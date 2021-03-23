import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { createSelector } from "reselect";
// import moment from "moment";

const slice = createSlice({
  name: "expenses",
  initialState: {
    categories: [],
    categories_last_id: 0,
  },
  reducers: {
    createExpensesType: (expenses, action) => {
      console.log('action: ', action);
      expenses.categories = [...expenses.categories, {title: action.payload.category_title, id: expenses.categories_last_id+1}]
      expenses.categories_last_id = expenses.categories_last_id + 1;
    },

  },
  // extraReducers
});

export const {
  createExpensesType,
} = slice.actions;
export default slice.reducer;


export const expensesTypeCreateRequest= (category_title) => (dispatch, getState) => {
  let isFound = getState().entities.expenses.categories.find((item) => {
      return item.title == category_title;
  });

  if(isFound)
    Alert.alert('You have already added this category');
  else{
    dispatch(
        createExpensesType({
          category_title
        })
    );
  }
};
