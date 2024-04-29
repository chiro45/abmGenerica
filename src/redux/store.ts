// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalReducer"; // Importamos el reducer del slice ModalReducer
import TablaReducer from "./slices/TablaReducer"; // Importamos el reducer del slice TablaReducer

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    modalReducer: ModalReducer, // Agregamos el reducer del slice ModalReducer al estado global con la clave modalReducer
    tablaReducer: TablaReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;
