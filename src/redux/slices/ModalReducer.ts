// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersona } from "../../types/IPersona";

interface IInitialState {
  openModalPersona: {
    open: boolean;
    persona: IPersona | null;
  };
}

const initialState: IInitialState = {
  openModalPersona: {
    open: false,
    persona: null,
  },
};

const ModalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    openModalPersonaWithPersona(state, action: PayloadAction<IPersona>) {
      state.openModalPersona.open = true;
      state.openModalPersona.persona = action.payload;
    },
    openModalPersona(state) {
      state.openModalPersona.open = true;
      state.openModalPersona.persona = null;
    },
    closeModalPersona(state) {
      state.openModalPersona.open = false;
      state.openModalPersona.persona = null;
    },
  },
});

export const {
  openModalPersonaWithPersona,
  openModalPersona,
  closeModalPersona,
} = ModalReducer.actions;
export default ModalReducer.reducer;
