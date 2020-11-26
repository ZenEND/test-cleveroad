import { ExternalLayout } from '@app/components/layout'
import { Route, Switch } from 'react-router-dom'
import { SignInPage } from '@app/pages/external/sign-in'
import { SignUpPage } from '@app/pages/external/sign-up'

export function ExternalPages() {
  return (
    <ExternalLayout>
      <Switch>
        <Route path={'/sign-up'} children={<SignUpPage />} />
        <Route children={<SignInPage />} />
      </Switch>
    </ExternalLayout>
  )
}
