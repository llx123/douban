import * as types from '../constants'

export const doLogin = (payload) => ({
  type: types.LOGIN,
  payload
})