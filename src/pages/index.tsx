import { Suspense, lazy } from 'react'
import { UiLoader } from '@app/components/loader'

const DynamicPages = lazy(() => import('./dynamic'))

export function Pages() {
  return (
    <Suspense fallback={<UiLoader />}>
      <DynamicPages />
    </Suspense>
  )
}
