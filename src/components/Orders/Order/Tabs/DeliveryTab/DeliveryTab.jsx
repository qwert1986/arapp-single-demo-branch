import React from 'react'
import { Steps } from 'antd';
import { Empty } from 'antd'
import { useSelector } from 'react-redux';

const { Step } = Steps;

const DeliveryTab = (props) => {
    const deliveryInfo = JSON.parse(props.deliveryInfo)
    const arrivedCode = useSelector(state => state.settings.appConfig.postApiConfig.arrivedAttributeId)

    const deliveryInfoHtml2 = () => {
        let result = []
        deliveryInfo.forEach((item, i, arr) => {
            let stepStatus

            if (i === arr.length - 1 && item.OperId === 2)
                stepStatus = 'finish'
            else if (i === 0 || (i === arr.length - 1 && item.OperId !== arrivedCode))
                stepStatus = 'process'
            else
                stepStatus = 'wait'

            result.push(<Step key={ i } status={ stepStatus } title={ `${item.Description}  ${item.Date}` } description={ `${item.OperName} (${item.AttrName})` } />)
        })
        return result
    }

    return (
        <div>
            { deliveryInfo !== null ?
                <div>
                    <p>Отправитель: { deliveryInfo[0].Sndr }</p>
                    <p>Получатель: { deliveryInfo[0].Rcpn }</p>
                    <Steps direction="vertical" current={1}>
                        { deliveryInfoHtml2() }
                    </Steps>
                </div>
            : <Empty />
            }
        </div>
    )
}

export default DeliveryTab