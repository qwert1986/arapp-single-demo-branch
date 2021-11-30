import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input, Select } from 'antd';
import { ordersApi } from "../../../../../api/api";
import InfoTab from "./InfoTab"; 
import Loader from "../../../../Loader/Loader";
import AppNotification from "../../../../../helpers/notifications";
import { setCurrentOrder } from "../../../../../store/orders-reducer"

const InfoTabContainer = () => {
    const settings = useSelector(state => state.settings)
    const orderData = useSelector(state => state.orders.currentOrder)
    const [dataSending, setDataSending] = useState(false)
    const dispatch = useDispatch()

    const initialValues = {
        id: orderData.id,
        name: orderData.name,
        last_name: orderData.last_name,
        middle_name: orderData.middle_name,
        zip_code: orderData.zip_code, 
        city: orderData.city, 
        address_1: orderData.address_1, 
        address_2: orderData.address_2, 
        education_level: orderData.education_level, 
        birth_date: orderData.birth_date, 
        phone: orderData.phone, 
        email: orderData.email, 
        date_1: orderData.date_1, 
        date_2: orderData.date_2, 
        term: orderData.term, 
        duration: orderData.duration, 
        duration_unit: orderData.duration_unit, 
        track: orderData.track,
        price: orderData.price,
        fee: orderData.fee,
        price_received: orderData.price_received,
        price_comments: orderData.price_comments,
        instalments_payed: orderData.instalments_payed,
        instalments_1st_pay: orderData.instalments_1st_pay,
    }

    const renderField = ({ input, meta, ...props }) => {
        return (  
            <>
                { props.editMode ? 
                <>      
                    <label>{ props.label }</label>
                    <Input
                        //addonBefore={ props.label }
                        name={ input.name } 
                        value={ input.value } 
                        type={ input.type } 
                        onChange={ input.onChange }
                        //disabled={ props.editMode === '0' && 'disabled' }
                    />

                    {(meta.error || meta.submitError) && meta.touched && (
                    <span>Error: {meta.error || meta.submitError}</span>
                    )}
                </> : 
                    <span>{ `${ props.label }: ${ input.value }` }</span>
                }
            </>
        )
    }
    
    const renderSelect = ({ input, ...props }) => {
        let options = settings[props.stateName]
        const selected = orderData[input.name]
        const { Option } = Select
    
        if (input.name === 'region') {
            const regionsNames = Object.values(options)
            options = {}
            regionsNames.forEach(regionName => options[regionName] = regionName)
        }

        let optionsHTML = Object.entries(options).map(item => <Option key={ item[0] } value={ item[0] }>{ item[1] }</Option>)
        
        return (
            <>
            { props.editMode ?
                <Select defaultValue={ selected } style={{ width:'100%' }}>
                    { optionsHTML }
                </Select>
                : <span>{ options[selected] }</span> 
            }
            </>
        )
    }

    const onSubmit = async (data) =>  {
        setDataSending(true)
        const response = await ordersApi.setOrder(data.id, data)
        let errors = {}
        if (!response.data.success) {
            response.data.data.forEach(error => {
                let field = error.field
                let message = error.message
    
                errors[field] = message
                AppNotification('error', 'Ошибка сохранения данных', message)
                return errors
            })
        } else {
            AppNotification('success', 'Сохранено', 'Данные успешно обновлены')
            dispatch(setCurrentOrder(response.data.data))
        }
        setDataSending(false)
    }

    return (
        <>
            { !dataSending 
            ? <InfoTab 
                renderField={ renderField } 
                renderSelect={ renderSelect } 
                onSubmit={ onSubmit }
                settings={ settings }
                orderData={ orderData }
                initialValues={ initialValues }
            /> 
            : <Loader /> }
        </>
    )
}

export default InfoTabContainer