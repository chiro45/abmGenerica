// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  dataTable: any[];
}

const initialState: IInitialState = {
  dataTable: [],
};

const TablaReducer = createSlice({
  name: "TablaReducer",
  initialState,
  reducers: {
    setDataTable(state, action: PayloadAction<any[]>) {
      state.dataTable = action.payload;
    },
  },
});

export const { setDataTable } = TablaReducer.actions;
export default TablaReducer.reducer;
