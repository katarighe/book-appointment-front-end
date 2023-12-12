import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userAuthSlice from '../Features/userAuthSlice';
import globalSlice from '../Features/globalSlice';
import doctorSlice from '../Features/doctorSlice';
import appointmentSlice from '../Features/appointmentSlice';

const allReducers = combineReducers({
  userAuthSlice,
  globalSlice,
  doctorSlice,
  appointmentSlice,
});

const mainStores = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const makeStore = () => {
  //  Check to confirm if we are on client side to persist, because we don't need to persist on server side
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return mainStores;
  }
  // We need to persist on client side

  const persistConfig = {
    key: 'BookDoctor',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, allReducers);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  store._persistor = persistStore(store);

  return store;
};

const store = makeStore();
export default store;
