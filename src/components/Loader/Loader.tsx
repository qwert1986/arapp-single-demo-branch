import { Alert, AlertProps, Spin } from "antd"
import React from "react"
import labels from "./labels"

type Description = {
    status: number,
    message: string,
} 

type LoaderProps = {
    message: string,
    description: Description,
    type: AlertProps["type"]
}

//const Loader: React.FC<LoaderProps> = ({ message = labels.message.default, description = labels.description, type = 'info' }): React.ReactElement => {
const Loader = ({ message = labels.message.default, description = labels.description, type = 'info' } : LoaderProps): JSX.Element => {
    return (
        <Spin tip={ labels.loadingTip }>      
            <Alert
                message={ type === 'error' ? labels.message.error : message }
                description={ type === 'error' ? `${description.status}. ${description.message}`: description }
                type={ type }
            />
        </Spin>
    )
}

export default Loader