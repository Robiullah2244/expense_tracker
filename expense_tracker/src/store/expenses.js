import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { createSelector } from "reselect";
// import moment from "moment";

const slice = createSlice({
  name: "expenses",
  initialState: {
    categoryList: [],
    expenseList: [],
    categoryListLastId: 0,
    expenseListLastId: 0,
  },
  reducers: {
    createExpensesType: (expenses, action) => {
      console.log('action: ', action);
      expenses.categoryList = [...expenses.categoryList, {title: action.payload.category_title, id: expenses.categoryListLastId+1}];
      expenses.categoryListLastId = expenses.categoryListLastId + 1;
    },

    addExpense: (expenses, action) => {
      console.log('action: ', action);
      expenses.expenseList = [
        ...expenses.expenseList,
        {
          id: expenses.expenseListLastId+1,
          date: action.payload.date,
          category_id: action.payload.category_id,
          description: action.payload.description,
          amount: action.payload.amount,
        }
      ];
      expenses.expenseListLastId = expenses.expenseListLastId + 1;
    },
  },
  // extraReducers
});

export const {
  createExpensesType,
  addExpense,
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

export const expenseAddRequest = (expense) => (dispatch, getState) => {
  console.log('Expense object: ', expense);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  expense = {...expense, date: today}
  console.log('Expense object: ', expense);
  dispatch(
      addExpense(expense)
  );
}
