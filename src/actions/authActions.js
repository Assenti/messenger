import { SIGN_IN, SIGN_OUT } from '../actions/types'
import { api } from '../api'

/** Sign in function
 * @param {string} email 
 * @param {string} phone 
 * @param {string} password
 * @param {Boolean} rememberMe
 * @returns {Object} { message: string, messageStatus: string } 
 */
export const signIn = (email, phone, password, rememberMe) => async (dispatch) => {
    
    try {
        const { data } = await api.post('/login', {
            email,
            phone,
            password,
            rememberMe
        })
        
        if (data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(data.result))

            dispatch({
                type: SIGN_IN,
                payload: data.result
            })

            return {
                message: data.status,
                messageStatus: data.status
            }
        } else {
            return {
                message: data.message,
                messageStatus: data.status
            }
        }
    } catch (e) {
        console.log(e)
        return {
            message: 'Server error',
            messageStatus: 'error'
        }
    }
}

/** Sign out function */
export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('user')

        dispatch({
            type: SIGN_OUT,
            payload: {}
        })
    }
}