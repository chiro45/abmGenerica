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

interface PayloadActionCustom {
  element: IPersona;
}


const TablaReducer = createSlice({
  name: "TablaReducer",
  initialState,
  reducers: {
    setDataTable(state, action: PayloadAction<any[]>) {
      state.dataTable = action.payload;
    },
    setElementActive(state, action: PayloadAction<PayloadActionCustom>) {
      state.elementActive = action.payload.element;
    },
    removeElementActive(state) {
      state.elementActive = null;
    },
  },
});

export const { setDataTable, setElementActive, removeElementActive } =
  TablaReducer.actions;
export default TablaReducer.reducer;
