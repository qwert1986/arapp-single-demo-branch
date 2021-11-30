import React from "react"
import OrderForm from "./OrderForm/OrderForm"

const InfoTab = ({ orderData, settings, ...props }) => {
    return (
        <div>
            <OrderForm { ...props } />
        </div>
    )
}

export default InfoTab