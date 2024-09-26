import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from '@/stores/utils/storage';
import appReducer from '@/stores/features/appsSlice';

const persistConfigApp = {
  key: 'wapp_apps',
  storage,
};

const persistedAppReducer = persistReducer(persistConfigApp, appReducer);
export const store = configureStore({
  reducer: {
    wapp_apps: persistedAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
