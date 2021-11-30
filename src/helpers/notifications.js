import { notification } from "antd"

const AppNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
    })
}

export default AppNotification