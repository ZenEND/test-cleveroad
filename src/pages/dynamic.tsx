import { AccountPages } from './account'
import { Switch, Route } from 'react-router-dom'
import { ExternalPages } from '@app/pages/external'

function DynamicPages() {
  return (
    <Switch>
      <Route path={'/account'} children={<AccountPages />} />
      <Route children={<ExternalPages />} />
    </Switch>
  )
}

export default DynamicPages
