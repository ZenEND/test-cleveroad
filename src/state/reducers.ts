import { combineReducers } from '@reduxjs/toolkit'
import user from './modules/user'
import loadings from './modules/loadings'
import products from './modules/products'

export const rootReducer = combineReducers({
  user,
  loadings,
  products,
})

export type RootStore = ReturnType<typeof rootReducer>
