import { ThunkAction } from "redux-thunk"
import { getError, ordersApi, TApiError, documentsApi, savefile } from "../api/api"
import { setHTTPError, TSetHTTPError } from "./app-reducer"
import { TOrdersFields } from "../types/orders"


type TInitialState = {
    currentOrder: TOrdersFields | null
}

type TSetCurrentOrder = {
    type: typeof ORDER_LOADED,
    payload: TOrdersFields
}

type TSetDocumentPrintError = {
    type: typeof DOCUMENT_PRINT_ERROR,
    payload: TApiError
}

type TActions = TSetCurrentOrder

const ORDER_LOADED = 'orders/ORDER_INFO_LOADED'
const DOCUMENT_PRINT_ERROR = 'orders/DOCUMENT_PRINT_ERROR'

let initialState = {
    currentOrder: null
}

const ordersReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case ORDER_LOADED:
            return {
                ...state,
                currentOrder: action.payload
            }
        default:
            return state
    }
}

export const setCurrentOrder = (payload: TOrdersFields): TSetCurrentOrder => ({ type: ORDER_LOADED, payload })
export const setDocumentPrintError = (payload: TApiError): TSetDocumentPrintError => ({ type: DOCUMENT_PRINT_ERROR, payload })

export const getOrder = (orderId: number): ThunkAction<void, TInitialState, unknown, TSetCurrentOrder | TSetHTTPError> => {
    return dispatch => {
        ordersApi.getOrder(orderId) 
            .then(response => dispatch(setCurrentOrder(response.data.data)))
            .catch(error => Promise.reject(dispatch(setHTTPError(getError(error)))))
    }
}

export const get_diplom_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printDiplom(payload.id)
            .then(response => savefile(response, `Диплом (${payload.protocol_num}) ${payload.last_name} ${payload.name} ${payload.middle_name} (${payload.id}).docx`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export const get_reference_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printReference(payload.id)
            .then(response => savefile(response, `Справка ${payload.last_name} ${payload.name} ${payload.middle_name} (${payload.id}).docx`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export const get_inner_docs_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printInnerDocs(payload.id)
            .then(response => savefile(response, `Внутренние документы ${payload.last_name} ${payload.name} ${payload.middle_name}.zip`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export const get_inner_docs_all_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printInnerDocsAll(payload.id)
            .then(response => savefile(response, `Внутренние документы ${payload.last_name} ${payload.name} ${payload.middle_name}.docx`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export const get_all_post_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printAllPost(payload.id)
            .then(response => savefile(response, `Документы для почты С5 ${payload.last_name} ${payload.name} ${payload.middle_name}.docx`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export const get_notification_printed = (payload: TOrdersFields): ThunkAction<void, typeof initialState, unknown, any> => {
    return dispatch => {
        documentsApi.printNotification119(payload.id)
            .then(response => savefile(response, `Уведомление ${payload.last_name} ${payload.name} ${payload.middle_name}.docx`))
            .catch(err => dispatch(setHTTPError(getError(err))))
    }
}

export default ordersReducer