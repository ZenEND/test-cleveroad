import { AsyncThunkAction, Dispatch, PayloadAction } from '@reduxjs/toolkit'

type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
}

export type AsyncDispatch<Returned = unknown, T extends string = string, M = any, E = any> = (
  action: AsyncThunkAction<Returned, unknown, AsyncThunkConfig>
) => Promise<PayloadAction<Returned, T, M, E>>
