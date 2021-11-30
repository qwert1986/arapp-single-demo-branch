import { Tabs } from 'antd';
import styles from "./order.module.css"
import DeliveryTab from './Tabs/DeliveryTab/DeliveryTab';
import InfoTabContainer from './Tabs/InfoTab/InfoTabContainer';

const { TabPane } = Tabs;

const Order = ({ currentOrder }) => {
    return (
    <div className={ styles.orderWrapper }>
        <h1>Заказ № { currentOrder.id } / { currentOrder.inner_id } от { currentOrder.date_1 } </h1>
        <Tabs type="card">
            <TabPane tab="Заказ" key="1">
                <InfoTabContainer />
            </TabPane>
            <TabPane tab="Доставка" key="2">
                <DeliveryTab deliveryInfo={ currentOrder.track_data } />
            </TabPane>
        </Tabs>
    </div>
    )
}

export default Order