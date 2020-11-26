import { createSlice } from '@reduxjs/toolkit'
import { api } from '@app/api/modules'
import { fulfilledStateSetter } from '@app/state/utils/fulfilled-setter'
import { createSafeThunk } from '@app/state/utils/async-action'

import { ProductModel } from '@app/models/product'

const create = createSafeThunk('products/create', api.products.create)
const get = createSafeThunk('products/get', api.products.get)
const update = createSafeThunk('products/update', api.products.update)

type State = { [key: string]: ProductModel }

const slice = createSlice({
  name: 'products',
  initialState: {} as { data?: State },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(create.fulfilled, fulfilledStateSetter)
      .addCase(get.fulfilled, fulfilledStateSetter)
      .addCase(update.fulfilled, fulfilledStateSetter),
})

export const productsActions = {
  create,
  get,
  update,
}

export default slice.reducer
