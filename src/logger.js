/** Development mode logger */
export const logger = (msg) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('-----------DEV MODE------------')
        console.log(msg)
    }
}