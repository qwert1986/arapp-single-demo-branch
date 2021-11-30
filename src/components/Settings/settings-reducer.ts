import { ThunkAction } from "redux-thunk"
import { getError, settingsApi } from "../../api/api"
import { setHTTPError, TSetHTTPError } from "../../store/app-reducer"
import { IApiSettingsObjectData, IApiSettingsArrayData } from "../../types/settings"

type TInitialState = TStateConfig | TStateSettings

type TStateSettings = {
    coursesOficial: IApiSettingsObjectData | null,
    payMethod: IApiSettingsArrayData | null,
    shareStatus: IApiSettingsArrayData | null,
    diplomStatus: IApiSettingsArrayData | null,
    courseStatus: IApiSettingsArrayData | null,
    regions: IApiSettingsObjectData | null, 
    instalments: IApiSettingsArrayData | null,
    instalmentsType: IApiSettingsObjectData | null,
    courses: IApiSettingsObjectData | null 
}

type TStateConfig = {
    appConfig: IApiSettingsObjectData | null
}

type TSetSettings = {
    type: typeof SET_SETTINGS, 
    payload: TStateSettings
}

type TSetAppConfig = {
    type: typeof SET_APP_CONFIG, 
    payload: TStateConfig
}

type TActions = TSetSettings | TSetAppConfig

const SET_SETTINGS = "arapp/orders-settings/SET_SETTINGS"
const SET_APP_CONFIG = "arapp/orders-settings/SET_APP_CONFIG"

let initialState = {
    coursesOficial: null,
    payMethod: null,
    shareStatus: null,
    diplomStatus: null,
    courseStatus: null,
    appConfig: null,
    regions:  null, 
    instalments: null,
    instalmentsType: null,
    courses: null 
} 

export const settingsReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                coursesOficial: action.payload.coursesOficial,
                payMethod: action.payload.payMethod,
                shareStatus: action.payload.shareStatus,
                diplomStatus: action.payload.diplomStatus,
                courseStatus: action.payload.courseStatus,
                regions: action.payload.regions,
                courses: action.payload.courses,
                instalments: action.payload.instalments,
                instalmentsType: action.payload.instalmentsType
            }
        case SET_APP_CONFIG:
            return {
                ...state,
                appConfig: action.payload.appConfig
            }
        default:
            return state
    }
}

const setSettings = (payload: TStateSettings): TSetSettings => ({ type: SET_SETTINGS, payload })
const setAppConfig = (payload: TStateConfig): TSetAppConfig => ({ type: SET_APP_CONFIG, payload })

export const getSettings = (): ThunkAction<Promise<TSetSettings>, TInitialState, unknown, TSetSettings | TSetHTTPError> => async dispatch => {
    return Promise.all([
        settingsApi.getCoursesOficial(),
        settingsApi.getPayMethod(),
        settingsApi.getShareStatus(),
        settingsApi.getDiplomStatus(),
        settingsApi.getCourseStatus(),
        settingsApi.getRegions(),
        settingsApi.getCourses(),
        settingsApi.getInstalments(),
        settingsApi.getInstalmentsType()
    ])
    .then(result => dispatch(setSettings({ 
        coursesOficial: result[0],
        payMethod: result[1],
        shareStatus: result[2],
        diplomStatus: result[3],
        courseStatus: result[4],
        regions: result[5],
        courses: result[6],
        instalments: result[7],
        instalmentsType: result[8],
    })))
    .catch(error => Promise.reject(dispatch(setHTTPError(getError(error)))))
}

export const getAppConfig = (): ThunkAction<Promise<TSetAppConfig>, TInitialState, unknown, TSetAppConfig | TSetHTTPError> => dispatch => {
    return settingsApi.getAppConfig()
        .then(response => dispatch(setAppConfig({ appConfig: response })))
        .catch(error => Promise.reject(dispatch(setHTTPError(getError(error)))))
}