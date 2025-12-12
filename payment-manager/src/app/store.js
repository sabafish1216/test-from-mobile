import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import paymentsReducer from '../features/payments/paymentsSlice'
import usersReducer from '../features/users/usersSlice'

const rootReducer = combineReducers({
  payments: paymentsReducer,
  users: usersReducer,
})

const persistConfig = {
  key: 'payment-manager',
  storage,
  whitelist: ['payments', 'users'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
})

export const persistor = persistStore(store)
