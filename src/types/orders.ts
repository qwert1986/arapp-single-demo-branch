import { ICommonApiResponse } from "./api"

type TPagination = {
    current: number,
    pageSize: number
}

export type TOrdersFetchParams = {
    [key: string]: Array<string> | null | string | TPagination | number
}

export type TOrdersFields = {
    id: number,
    protocol_num: number,
    last_name: string,
    name: string,
    middle_name: string,
    zip_code: string,
    region: string,
    city: string,
    address_1: string,
    address_2: string,
    birth_date: string,
    education_level: number,
    phone: string, 
    email: string,
    course: number,
    date_1: string,
    date_2: string,
    term: number,
    duration: number, 
    duration_unit: string,
    course_status: string,
    diplom_status: string,
    track: string,
    pay_method: number,
    price: string,
    fee: string,
    price_received: string,
    price_comments: string,
    instalments: number,
    instalments_payed: string,
    instalments_1st_pay: string,
    instalments_type: string,
    add_info: string
}

export interface IOrdersApiResponse extends ICommonApiResponse {
    data: {
        results: TOrdersFields,
        count: number
    } 
}

export interface IOrderApiResponse extends ICommonApiResponse {
    data: TOrdersFields
}