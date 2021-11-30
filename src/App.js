//import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from "./components/Auth/auth-reducer"
import Login from './components/Forms/Login/Login';
import { Route, Switch } from 'react-router';
import { useEffect } from 'react';
import OrdersContainer from './components/Orders/OrdersContainer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import OrderContainer from './components/Orders/Order/OrderContainer';
import Loader from './components/Loader/Loader';
import labels from './AppLabels';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { Layout, Menu } from 'antd';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import SideBarContainer from './components/SideBar/SideBarContainer';

function App() {
  let isAppInitialized = useSelector(state => state.app.initialized)
  const isAuth = useSelector(state => state.auth.isAuth)
  let dispatch = useDispatch()
  
  useEffect(() => {
    if (!isAppInitialized)
      dispatch(authMe())
  }, [isAppInitialized, dispatch])

  if (!isAppInitialized) 
    return <Loader description={ labels.appInitialization } />

  const { Header, Content, Footer } = Layout;

  return (
    <ConfigProvider locale={ruRU}>
      <Layout style={{ minHeight: '100vh' }}>
        { 
          isAuth && 
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">Заказы</Menu.Item>
            </Menu>
          </Header>
        }
        <Content style={{ padding: '0 5px' }}>   
          {
            isAuth &&
              <Breadcrumbs />
          }
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            {
              isAuth &&
                <SideBarContainer />
            }
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/orders">
                  <OrdersContainer />
                </Route>
                <Route exact path="/orders/:orderId">
                  <OrderContainer />
                </Route>
                <Route exact path="/404">
                  <PageNotFound />
                </Route>
                <Route>
                  <PageNotFound />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>antares-edu.com © { new Date().getFullYear() } Created via AntD</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App;