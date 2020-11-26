import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Pages } from '@app/pages'
import { store } from '@app/state'
import firebase from 'firebase'
import { appConfig } from '@app/config'
firebase.initializeApp(appConfig.firebase)

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </Provider>
  )
}
