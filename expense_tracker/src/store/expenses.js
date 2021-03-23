import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { createSelector } from "reselect";
// import moment from "moment";

const slice = createSlice({
  name: "expenses",
  initialState: {
    categoryList: [],
    expenses: [],
    categoryListLastId: 0,
  },
  reducers: {
    createExpensesType: (expenses, action) => {
      console.log('action: ', action);
      expenses.categoryList = [...expenses.categoryList, {title: action.payload.category_title, id: expenses.categoryListLastId+1}]
      expenses.categoryListLastId = expenses.categoryListLastId + 1;
    },
  },
  // extraReducers
});

export const {
  createExpensesType,
} = slice.actions;
export default slice.reducer;


export const expensesTypeCreateRequest= (category_title) => (dispatch, getState) => {
  let isFound = getState().entities.expenses.categoryList.find((item) => {
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
