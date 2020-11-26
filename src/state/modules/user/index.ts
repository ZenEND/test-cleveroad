import { createAction, createSlice } from '@reduxjs/toolkit'
import { api } from '@app/api/modules'
import { fulfilledStateSetter } from '@app/state/utils/fulfilled-setter'
import { createSafeThunk } from '@app/state/utils/async-action'
import firebase from 'firebase'
import { AuthModel } from '@app/models/auth'

const signIn = createSafeThunk('user/sign-in', async (params: AuthModel) => {
  // I don't know why but without this function throw error with maximum call stack size
  await api.user.signIn(params)
  window.location.pathname = '/account'
})

const signUp = createSafeThunk('user/sign-up', async (params: AuthModel) => {
  // I don't know why but without this function throw error with maximum call stack size
  await api.user.signUp(params)
  window.location.pathname = '/account'
})
const logout = createSafeThunk('user/logout', api.user.logout)

const setUser = createAction<firebase.User>('user/setUser')

const slice = createSlice({
  name: 'user',
  initialState: {} as { data?: firebase.UserInfo },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(signIn.fulfilled, fulfilledStateSetter)
      .addCase(signUp.fulfilled, fulfilledStateSetter)
      .addCase(logout.fulfilled, fulfilledStateSetter)
      .addCase(setUser, (s, a) => {
        s.data = a.payload
      }),
})

export const userActions = {
  signIn,
  signUp,
  logout,
  setUser,
}

export default slice.reducer
