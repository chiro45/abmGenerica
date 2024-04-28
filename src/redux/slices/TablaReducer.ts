// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersona } from "../../types/IPersona";

interface IInitialState {
  dataTable: IPersona[];
  elementActive: null | IPersona;
}

const initialState: IInitialState = {
  dataTable: [],
  elementActive: null,
};

const TablaReducer = createSlice({
  name: "TablaReducer",
  initialState,
  reducers: {
    setDataTable(state, action: PayloadAction<any[]>) {
      state.dataTable = action.payload;
    },
    setElementActive(state, action: PayloadAction<any>) {
      state.elementActive = action.payload;
    },
    removeElementActive(state) {
      state.elementActive = null;
    },
  },
});

export const { setDataTable, setElementActive, removeElementActive } =
  TablaReducer.actions;
export default TablaReducer.reducer;
