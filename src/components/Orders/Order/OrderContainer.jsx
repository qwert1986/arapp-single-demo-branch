import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import withLoginRedirect from '../../../HOCs/withLoginRedirect';
import { getOrder, setCurrentOrder } from '../../../store/orders-reducer'
import { useEffect } from 'react';
import Order from './Order';
import { getSettings, getAppConfig } from '../../Settings/settings-reducer';
import Loader from '../../Loader/Loader';
import labels from '../labels';

const OrderContainer = (props) => {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const currentOrder = useSelector(state => state.orders.currentOrder)
    const httpError = useSelector(state => state.app.httpError)

    useEffect(() => {
        Promise.all([
            dispatch(getSettings()), 
            dispatch(getAppConfig())
        ])
        .then(() => dispatch(getOrder(orderId)))

        return () => dispatch(setCurrentOrder(null))
    }, [dispatch, orderId])

    if (currentOrder === null || httpError.status)
        return <Loader 
            type={ httpError.status ? 'error' : 'info' } 
            description={ httpError.status ? httpError : labels.loading.fetchingOrder } 
        />
  
    if (currentOrder.status === 404)
        return <Redirect to='/404' /> 

    return (
        <Order currentOrder={ currentOrder } />
    )
}

export default withLoginRedirect(OrderContainer)