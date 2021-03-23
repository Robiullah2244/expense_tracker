import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
// import moment from "moment";

const slice = createSlice({
  name: "expenses",
  initialState: {
    categories: [],
  },
  reducers: {
    expensesTypeCreate: (expenses, action) => {
      
    },
  },
  // extraReducers
});

export const {
  expensesTypeCreate,
} = slice.actions;
export default slice.reducer;


export const expensesTypeCreateRequest= (category) => (dispatch, getState) => {
  console.log('expensesTypeCreate');
  // getState().entities.expenses.categories.push(category)
};
