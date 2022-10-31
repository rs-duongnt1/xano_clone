import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { databaseApi } from '../services/database';

const rootReducer = combineReducers({
  [databaseApi.reducerPath]: databaseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(databaseApi.middleware),
});
