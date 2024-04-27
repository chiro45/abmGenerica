import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalReducer";
import TablaReducer from "./slices/TablaReducer";

export const store = configureStore({
  reducer: {
    modalReducer: ModalReducer,
    tablaReducer: TablaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
