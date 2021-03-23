import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { createSelector } from "reselect";
// import moment from "moment";

const slice = createSlice({
  name: "expenses",
  initialState: {
    categoryList: [],
    expenseList: [],
    filteredExpenseList: [],
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
      console.log('action: ', action, expenses);
      expenses.expenseList = [
        ...expenses.expenseList,
        {
          id: expenses.expenseListLastId+1,
          date: action.payload.date,
          categoryId: action.payload.categoryId,
          description: action.payload.description,
          amount: action.payload.amount,
        }
      ];
      expenses.expenseListLastId = expenses.expenseListLastId + 1;
    },

    filterExpense: (expenses, action) => {
      // console.log('action: ', action, expenses.expenseList);

      let filteredList = expenses.expenseList;
      if(!(action.payload.categoryId == '' || action.payload.categoryId == null))
      {
        filteredList = filteredList.filter((element) => {
          return element.categoryId == action.payload.categoryId && (action.payload.dateRange != '' || action.payload.dateRange != null);
        })
      }
      if(!(action.payload.dateRange == '' || action.payload.dateRange == null))
      {
        filteredList = filteredList.filter((element) => {
          console.log(element.date,action.payload.dateRange.startDate, action.payload.dateRange.endDate);
          return element.date >= action.payload.dateRange.startDate && element.date <= action.payload.dateRange.endDate;
        })
      }
      expenses.filteredExpenseList = filteredList;
      // console.log(expenses.filteredExpenseList);
    },

    clearFilteredExpenseList: (expenses, action) => {
      expenses.filteredExpenseList = expenses.expenseList;
    },
  },
  // extraReducers
});

export const {
  createExpensesType,
  addExpense,
  filterExpense,
  clearFilteredExpenseList
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

export const expenseFilterRequest = (filterObject) => (dispatch, getState) => {
  console.log('filterObject: ', filterObject);
  dispatch(
      filterExpense(filterObject)
  );
}

export const filteredExpenseListClearRequest = () => (dispatch, getState) => {
  dispatch(
      clearFilteredExpenseList()
  );
}
