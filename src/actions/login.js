export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
/**
 * Login
 *
 * @returns {Object}
 */
export function login(): Object {
    return {
        type: USER_LOGIN_REQUEST,
        payload: {},
    };
}
  
/**
 * Logout
 *
 * @returns {Object}
 */
export function logOut(): Object {
    return {
        type: USER_LOGOUT_REQUEST,
        payload: {},
    };
}