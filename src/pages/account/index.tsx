import { UiLayout } from '@app/components/layout'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { ProductPage } from '@app/pages/account/product'
import { GeneralPage } from '@app/pages/account/general'
import { useFirebaseAuthChanged } from '@app/utils/auth-state'

export function AccountPages() {
  const { url } = useRouteMatch()
  useFirebaseAuthChanged()
  return (
    <UiLayout>
      <Switch>
        <Route path={`${url}/product/:id`} children={<ProductPage />} />
        <Route path={`${url}/product`} children={<ProductPage />} />
        <Route path={url} children={<GeneralPage />} />
      </Switch>
    </UiLayout>
  )
}
