import { ICommonApiResponse } from "./api"

export interface IApiSettingsObjectData { 
    [key: string]: string 
}

export interface IApiSettingsArrayData {
    [index: number]: string
}

export interface IApiDocxData {
    data: string
}

export interface IDocxApiResponse extends ICommonApiResponse {
    data: IApiDocxData
}


// export interface IApiSettingsObjectResponse {
//     success: boolean,
//     data: IApiSettingsObjectData
// }

// export interface IApiSettingsArrayResponse {
//     success: boolean,
//     data: IApiSettingsArrayData
// }