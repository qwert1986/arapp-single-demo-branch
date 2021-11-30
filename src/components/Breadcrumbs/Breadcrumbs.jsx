import { Breadcrumb, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

const Breadcrumbs = withRouter((props) => {
    const { location } = props
    const order = useSelector(state => state.orders.currentOrder)
    let breadcrumbsNames = {
        '/': 'Главная',
        '/orders': 'Заказы',
    }

    if (order !== null)
        breadcrumbsNames['/order'] = [order.last_name, order.name, order.middle_name].join(' ')
    else 
        breadcrumbsNames['/order'] = <Skeleton.Input style={{ width: 200 }} active size="small" />

    let locationParts = location.pathname.split('/')
    locationParts.shift()

    const renderBreadcrumbItem = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1
        
        return (
            <> 
                { 
                    last 
                        ? <span>{ route.breadcrumbName }</span>
                        : <Link to={ '/' + paths.join('/') }>{ route.breadcrumbName }</Link>
                }
            </>
        )
    }

    const routes = []
    locationParts.forEach((part, partIndex, locationParts) => {
        if (locationParts[partIndex - 1] === 'orders' && part.match(/\d{1}/) !== null) 
            part = 'order' 
        routes.push({ 
            path: `/${part}`, 
            breadcrumbName: breadcrumbsNames[`/${part}`] })
    })
    
    return <Breadcrumb itemRender={ renderBreadcrumbItem } routes={ routes } style={{ margin: '16px 0' }} />
})

export default Breadcrumbs