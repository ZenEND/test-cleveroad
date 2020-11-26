import { axiosInstance } from '@app/api/instance'
import { ProductModel } from '@app/models/product'
import firebase from 'firebase'

export type UpdateProductDTO = {
  [key: string]: ProductModel
}
export const uploadFile = (filename: string, data: File) => {
  return firebase.storage().ref(`products/${filename}`).put(data)
}

export const get = () => axiosInstance.get('products.json')

export const create = (data: ProductModel) => {
  return axiosInstance.post('products.json', data)
}

export const update = (data: UpdateProductDTO) => {
  return axiosInstance.patch(`products.json`, data)
}

export const remove = () => {
  return firebase.firestore().collection('products')
}
