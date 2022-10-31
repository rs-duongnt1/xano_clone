import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { databaseApi } from '../services/database';
import { endpointApi } from '../services/endpoint';

const rootReducer = combineReducers({
  [databaseApi.reducerPath]: databaseApi.reducer,
  [endpointApi.reducerPath]: endpointApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      databaseApi.middleware,
      endpointApi.middleware
    ),
});
