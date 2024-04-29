import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el estado inicial del slice
interface IModalState {
  modalPersona: boolean; // Estado del modal de persona
}

const initialState: IModalState = {
  modalPersona: false, // Inicialmente el modal de persona está cerrado
};

// Definimos la interfaz para la acción del payload
interface IPayloadAction {
  modalName: "modalPersona"; // Nombre del modal a modificar
}

// Creamos un slice con Redux Toolkit para manejar los modals
const modalsSlice = createSlice({
  name: "modals", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para alternar el estado del modal
    toggleModal(state, action: PayloadAction<IPayloadAction>) {
      const modalName = action.payload.modalName; // Obtenemos el nombre del modal del payload
      // Invertimos el valor del modal correspondiente
      for (const key in state) {
        if (key !== modalName) {
          // Si no es el modal que estamos modificando, lo cerramos
          state[modalName] = false;
        }
      }
      state[modalName] = !state[modalName]; // Invertimos el valor del modal actual
    },
  },
});

// Exportamos los actions generados por el slice
export const { toggleModal } = modalsSlice.actions;

// Exportamos el reducer generado por el slice
export default modalsSlice.reducer;
