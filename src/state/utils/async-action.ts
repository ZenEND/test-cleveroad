import { createAsyncThunk, AsyncThunkPayloadCreator, unwrapResult } from '@reduxjs/toolkit'

export function unwrapError<T>(data: T) {
  return unwrapResult((data as unknown) as ActionTypesWithOptionalErrorAction)
}

export function createSafeThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
  options?: Parameters<typeof createAsyncThunk>[2]
) {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (args, config) => {
      try {
        const data = await payloadCreator(args, config)
        console.log(data)
        return data
      } catch (error) {
        // log errors
        console.error(error)
        const serializedError = { ...error, actionType: typePrefix }
        return config.rejectWithValue(serializedError)
      }
    },
    options
  )
}

type ActionTypesWithOptionalErrorAction =
  | {
      error: any
    }
  | {
      error?: never
      payload: any
    }
