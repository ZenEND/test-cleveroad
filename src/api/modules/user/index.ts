import { AuthModel } from '@app/models/auth'
import firebase from 'firebase'

export const signUp = ({ email, password }: AuthModel) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const signIn = ({ email, password }: AuthModel) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result: any) => result)
}

export const logout = () => {
  return firebase.auth().signOut()
}
