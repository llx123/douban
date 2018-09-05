import * as types from '../constants'

const initialState = {
  userName: ''
}
const login = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        userName: action.payload
      }
    default:
      return state
  }
}

export default login
