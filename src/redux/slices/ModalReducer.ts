import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el estado inicial
interface IModalState {
  modalPersona: boolean;
}

const initialState: IModalState = {
  modalPersona: false,
};

interface IPayloadAction {
  modalName: "modalPersona";
}

// Creamos un slice con Redux Toolkit
const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<IPayloadAction>) {
      const modalName = action.payload.modalName;
      // Invertimos el valor del modal correspondiente

      for (const key in state) {
        if (key !== modalName) {
          state[modalName] = false;
        }
      }
      state[modalName] = !state[modalName];
    },
  },
});

// Exportamos los actions generados por el slice
export const { toggleModal } = modalsSlice.actions;

// Exportamos el reducer generado por el slice
export default modalsSlice.reducer;
