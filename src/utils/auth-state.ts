import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '@app/state/modules/user'

export const useFirebaseAuthChanged = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(userActions.setUser(user.toJSON() as firebase.User))
    } else {
      push('/')
    }
  })
}
