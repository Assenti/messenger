import { SIGN_IN, SIGN_OUT } from '../actions/types'
import { api } from '../api'

/** Sign in function
 * @param {string} email 
 * @param {string} phone 
 * @param {string} password
 * @returns {Object} { message: string, messageStatus: string } 
 */
export const signIn = (email, phone, password) => async (dispatch) => {
    console.log(email, password)
    try {
        const { data } = await api.post('/login', {
            email,
            phone,
            password
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
        dispatch({
            type: SIGN_OUT,
            payload: {}
        })
    }
}