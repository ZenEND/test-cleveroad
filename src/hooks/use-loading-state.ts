import { useShallowEqualSelector } from '@app/hooks/use-shallow-equal-selector'

export function useLoadingState(action: { typePrefix: string }[]) {
  return useShallowEqualSelector(state => action.some(_action => state.loadings[_action.typePrefix]))
}
