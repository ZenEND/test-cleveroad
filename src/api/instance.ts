import axios from 'axios'
import { appConfig } from '@app/config'

export const axiosInstance = axios.create({
  baseURL: appConfig.firebase.databaseURL,
})

axiosInstance.interceptors.response.use(onFulfilled => {
  return onFulfilled.data
})
