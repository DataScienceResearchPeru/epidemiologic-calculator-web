function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return action.name
  
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