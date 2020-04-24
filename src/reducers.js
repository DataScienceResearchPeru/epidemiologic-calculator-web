function userReducer (state, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.name
    case 'LOGOUT':
      return ''
    default:
      return state
  }
}

function RegisterReducer (state, action) {
  switch (action.type) {
    case 'REGISTER':
      return action.email
    default:
      return state
  }
}

export default function appReducer (state, action) {
  return {
    user: userReducer(state.user, action),
    register: RegisterReducer(state.register, action)
  }
}
