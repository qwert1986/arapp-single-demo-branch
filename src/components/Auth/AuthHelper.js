import Cookies from "universal-cookie"
const authCookieName = 'access_token'

const authCookie = new Cookies();

export const setAuthCookie = (token) => {
    authCookie.set(authCookieName, token, { path: '/' });
}

export const getAuthCookie = () => {
    return authCookie.get(authCookieName)
}