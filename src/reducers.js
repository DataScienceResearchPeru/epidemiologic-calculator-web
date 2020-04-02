function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
            return action.name
        case 'REGISTER':
            return action.email
  
        case 'LOGOUT':
            return ''
  
        default:
            return state
    }
}


export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action)
    }
}