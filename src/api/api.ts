import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { getAuthCookie } from "../components/Auth/AuthHelper"
import { IApiSettingsArrayData, IApiSettingsObjectData, IDocxApiResponse } from "../types/settings"
import { TUserInfo } from "../types/user"
import { TDocumentSide } from "../types/documents"
import { IOrderApiResponse, IOrdersApiResponse, TOrdersFetchParams, TOrdersFields } from "../types/orders"

const baseURL = "http://dmitryf5.beget.tech/apps/api/v1/"

const loginConnection = (): AxiosInstance => {
    return axios.create({
        baseURL
    })
}

const getTokenConnection = (): AxiosInstance => {
    return axios.create({
        baseURL,
        // validateStatus: function (status) {
        //     return status = 200
        // },
        headers: { Authorization: "Basic " + btoa(`${ getAuthCookie() }:`) } 
    })
}

const getDownloadConnection = (): AxiosInstance => {
    let instanse = axios.create({
        baseURL,
        headers: { Authorization: "Basic " + btoa(`${ getAuthCookie() }:`) },
        responseType: 'blob'
    })

    instanse.interceptors.response.use(
        response => { return response; },
        error => {
            if (
              error.request.responseType === 'blob' &&
              error.response.data instanceof Blob &&
              error.response.data.type &&
              error.response.data.type.toLowerCase().indexOf('json') !== -1
            )
            {
              return new Promise((resolve, reject) => {
                 let reader = new FileReader();
                 reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        error.response.data = JSON.parse(reader.result)
                        resolve(Promise.reject(error))
                    }
                 };
    
                 reader.onerror = () => {
                     reject(error);
                 };
    
                 reader.readAsText(error.response.data);
              });
            };
    
            return Promise.reject(error);
        }
    )

    return instanse
}

export const savefile = (response: AxiosResponse<any>, fileName: string): void => { 
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export type TApiError = {
    data: {
        status: number,
        message: string
    }
}

export const getError = (error: AxiosError<TApiError>) => {
    if (error.response) 
        return { status: error.response.data.data.status, message: error.response.data.data.message }
    else if (error.request) 
        return { status: error.request.status, message: error.request.statusText }
    else
        return { status: 'error', message: error.message }
} 

type TAuthResponse = {
    success: boolean,
    data: TUserInfo
}

type TLoginResponse = {
    success: boolean,
    data: TLoginResponseData
}

type TLoginResponseData = {
    status: number,
    access_token: string
}

export const authApi = {
    login(login: string, password: string): Promise<AxiosResponse<TLoginResponse>> {
        return loginConnection().get(`login`,  { headers: { Authorization: "Basic " + btoa(`${ login }:${ password }`) } })
    },

    auth(): Promise<AxiosResponse<TAuthResponse>> {
        return getTokenConnection().get(`auth`)
    }
}

export const ordersApi = {
    getOrders(params: TOrdersFetchParams | null = null): Promise<AxiosResponse<IOrdersApiResponse>> {
        return getTokenConnection().get(`order`, { params })
    },

    getOrder(orderId: number): Promise<AxiosResponse<IOrderApiResponse>> {
        return getTokenConnection().get(`order/${orderId}`)
    },

    setOrder(orderId: number, data: TOrdersFields): Promise<AxiosResponse<IOrderApiResponse>> {
        return getTokenConnection().put(`order/${orderId}`, { ...data })
    },

    async getOrdersWithNotSubstructedCommission() {
        const result = await this.getOrders({ 
            'Orders[pay_method]': 5, 
            'Orders[price_received]': 'null', 
            'Orders[group_id]': 'null' 
        })
        return result.data.data.count
    },  

    async getBalances() {
        const result = await getTokenConnection().get(`order/balances`)
        return result.data.data
    }
}

export const settingsApi = {
    getCoursesOficial(): Promise<IApiSettingsObjectData> {
        return getTokenConnection()
            .get(`orders-settings?setting=courses_official`)
            .then(result => result.data.data)
    },

    getPayMethod(): Promise<IApiSettingsArrayData> {
        return getTokenConnection()
            .get(`orders-settings?setting=pay_method`)
            .then(result => result.data.data)
    },

    getShareStatus(): Promise<IApiSettingsArrayData> {
        return getTokenConnection()
            .get(`orders-settings?setting=share_status`)
            .then(result => result.data.data)
    },

    getDiplomStatus(): Promise<IApiSettingsArrayData> {
        return getTokenConnection()
            .get(`orders-settings?setting=diplom_status`)
            .then(result => result.data.data)
    },

    getCourseStatus(): Promise<IApiSettingsArrayData> {
        return getTokenConnection()
            .get(`orders-settings?setting=course_status`)
            .then(result => result.data.data)
    },

    getRegions(): Promise<IApiSettingsObjectData> {
        return getTokenConnection()
            .get(`orders-settings?setting=regions`)
            .then(result => result.data.data)
    },

    getCourses(): Promise<IApiSettingsObjectData> {
        return getTokenConnection()
            .get(`orders-settings?setting=courses`)
            .then(result => result.data.data)
    },

    getInstalments(): Promise<IApiSettingsArrayData> {
        return getTokenConnection()
            .get(`orders-settings?setting=instalments`)
            .then(result => result.data.data)
    },

    getInstalmentsType(): Promise<IApiSettingsObjectData> {
        return getTokenConnection()
            .get(`orders-settings?setting=instalments_type`)
            .then(result => result.data.data)
    },

    getAppConfig(): Promise<IApiSettingsObjectData> {
        return getTokenConnection()
            .get(`orders-settings?setting=app_config`)
            .then(result => result.data.data)
    }
}

export const documentsApi = {
    printDiplom(orderId: number): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/diplom?id=${orderId}`)
    },

    printReference(orderId: number): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/reference?id=${orderId}`)
    },

    printInnerDocs(orderId: number): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/inner-docs?id=${orderId}`)
    },

    printInnerDocsAll(orderId: number): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/inner-docs-all?id=${orderId}`)
    },

    printAllPost(orderId: number): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/all-post?id=${orderId}`)
    }, 

    printNotification119(orderId: number, side: TDocumentSide = 'front'): Promise<AxiosResponse<IDocxApiResponse>> {
        return getDownloadConnection()
        .get(`documents/notification119?id=${orderId}&side=${side}`)
    }
}