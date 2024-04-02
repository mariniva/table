import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/ModalDeleteReducer';
import tableReducer from './reducers/TableReducer';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
