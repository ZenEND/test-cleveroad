import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { userActions } from '@app/state/modules/user'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // ONLY BECAUSE FIREBASE RETURN SERIALIZABLE VALUE
      serializableCheck: {
        ignoredActions: [userActions.signIn.fulfilled.type],
      },
    }),
})
