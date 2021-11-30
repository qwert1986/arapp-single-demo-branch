import { authApi } from "../../api/api"
import loginLabels from "../Forms/Login/Labels"
import { setAuthCookie } from "./AuthHelper"
import { initAC, TInitAC } from "../../store/app-reducer"
import { ThunkAction } from "redux-thunk"
import { TUserInfo } from "../../types/user"

type TInitialState = typeof initialState

type TSetAuthUserData = {
    type: typeof AUTH_ME,
    payload: TUserInfo
}

type TActions = TSetAuthUserData | TInitAC

type TAuthError = {
    success: boolean, 
    _error: string
}

const AUTH_ME = "arapp/auth/AUTH_ME" 

let initialState = {
    userId: null as null | number,
    isAuth: false
}

export const authReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case AUTH_ME:
            return {
                ...initialState,
                userId: action.payload.id,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (payload: TUserInfo): TSetAuthUserData => ({ type: AUTH_ME, payload })

export const authUser = (login: string, password: string): ThunkAction<Promise<void | TAuthError>, TInitialState, unknown, TActions> => {
    return dispatch => {
        return authApi.login(login, password)
        .then(response => {
            setAuthCookie(response.data.data.access_token)
            dispatch(authMe())  
        })
        .catch(() => ({ success: false, _error: loginLabels.validate.unauthorized }))
    }
}

export const authMe = (): ThunkAction<Promise<void>, TInitialState, unknown, TActions> => {
    return async (dispatch) => {
        await authApi.auth()
            .then(response => dispatch(setAuthUserData(response.data.data))) 
            .catch(error => error)
        dispatch(initAC())
    }
}