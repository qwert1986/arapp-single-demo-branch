import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { matchPath, withRouter } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { 
    get_diplom_printed, 
    get_reference_printed, 
    get_inner_docs_printed, 
    get_inner_docs_all_printed, 
    get_all_post_printed, 
    get_notification_printed 
  } from '../../store/orders-reducer'
import { ordersApi } from '../../api/api'

const SideBarContainer = ({ location }) => {
    const order = useSelector(state => state.orders.currentOrder)
    const orderRoute = matchPath(location.pathname, {
      path: "/orders/:orderId",
      exact: true,
      strict: false
    })
  
    const [ordersWithNotSubstructedCommissionCount, setOrdersWithNotSubstructedCommissionCount] = useState(0)
    const [balances, setBalances] = useState({})
    const dispatch = useDispatch()
  
    useEffect(
      () => {
        ordersApi.getOrdersWithNotSubstructedCommission()
          .then(count => setOrdersWithNotSubstructedCommissionCount(count))
        ordersApi.getBalances()
          .then(result => setBalances(result)) 
      },
      []
    )
    
    return <SideBar 
      orderMenuProps={{ 
        avaible: orderRoute instanceof Object,
        order: order  
      }}
      ordersWarningsProps={{
        avaible: true,
        ordersWithNotSubstructedCommissionCount,
        balances
      }}
      get_diplom_printed={() => dispatch(get_diplom_printed(order))}
      get_reference_printed={() => dispatch(get_reference_printed(order))}
      get_inner_docs_printed={() => dispatch(get_inner_docs_printed(order))}
      get_inner_docs_all_printed={() => dispatch(get_inner_docs_all_printed(order))}
      get_all_post_printed={() => dispatch(get_all_post_printed(order))}
      get_notification_printed={() => dispatch(get_notification_printed(order))} 
    />
  }
  
  export default withRouter(SideBarContainer)