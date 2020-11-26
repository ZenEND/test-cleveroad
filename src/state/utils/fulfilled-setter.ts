export function fulfilledStateSetter<T, D extends { data?: T }, A extends { payload: T }>(state: D, action: A) {
  state.data = action.payload
}
