import { SIGN_IN, SIGN_OUT } from '../actions/types'
const userData = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userData ? userData : null,
    isLogged: userData ? true : false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN: 
            return {
                ...state,
                user: action.payload,
                isLogged: true
            }
        case SIGN_OUT: 
            return {
                ...state,
                user: action.payload,
                isLogged: false
            }
        default: 
            return state
    }
}