const INITIALIZE_APP = 'arapp/app/INITIALIZE_APP'
const HTTP_ERROR_THROWED = 'arapp/app/HTTP_ERROR_THROWED'

export type TInitAC = {
    type: typeof INITIALIZE_APP
}

export type TSetHTTPError = {
    type: typeof HTTP_ERROR_THROWED, 
    payload: THttp_error 
}

type THttp_error = {
    message: null | string,
    status: null | number
}

type TInitialState = {
    initialized: false | true,
    httpError: THttp_error
}

type TActions = TInitAC | TSetHTTPError

export const initAC = (): TInitAC =>  ({ type: INITIALIZE_APP })
export const setHTTPError = (payload: THttp_error): TSetHTTPError =>  ({ type: HTTP_ERROR_THROWED, payload })

let initialState: TInitialState = {
    initialized: false,
    httpError: {
        message: null,
        status: null
    }
}

const appReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {
                ...state,
                initialized: true
            }

        case HTTP_ERROR_THROWED:
            return {
                ...state,
                httpError: {
                    ...state.httpError,
                    message: action.payload.message,
                    status: action.payload.status
                }
            }
    
        default:
           return state
    }
}

export default appReducer