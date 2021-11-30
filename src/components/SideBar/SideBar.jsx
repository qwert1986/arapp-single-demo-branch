import React from 'react';
import { Badge, Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'

import { FileWordTwoTone, PieChartTwoTone, DollarCircleTwoTone } from '@ant-design/icons';

const SideBar = ({ orderMenuProps, ordersWarningsProps, ...props }) => {
    const { Sider } = Layout

    return ( 
      <Sider 
        theme="light" 
        className="site-layout-background" 
        width={ 300 }
        breakpoint="lg"
        collapsedWidth="0"
      > 
        <Menu
          mode="inline"
          //defaultOpenKeys={['documents']}
          style={{ height: '100%' }}
        >
          {
            orderMenuProps.avaible ? 
            <SubMenu key="documents" icon={ <FileWordTwoTone /> } title="Документы">
                <Menu.Item key="11">
                    <span onClick={ props.get_diplom_printed }>Скачать диплом</span>
                </Menu.Item>
                <Menu.Item key="12">
                    <span onClick={ props.get_reference_printed }>Скачать справку</span>
                </Menu.Item>
                <Menu.Item key="13">
                    <span onClick={ props.get_inner_docs_printed }>Внутренние документы (zip)</span>
                </Menu.Item>
                <Menu.Item key="14">
                    <span onClick={ props.get_inner_docs_all_printed }>Внутренние документы</span>
                </Menu.Item>
                <Menu.Item key="15">
                    <span onClick={ props.get_all_post_printed }>Почта</span>
                </Menu.Item>
                <Menu.Item key="16">
                    <span onClick={ props.get_notification_printed }>Уведомление</span>
                </Menu.Item>
            </SubMenu> 
            : ''
          }
          {
            ordersWarningsProps.avaible ?
            <>
            <Menu.Item key="21" icon={ <PieChartTwoTone /> }>
              { 'Не учтены комиссии' }  
              <Badge 
                count={ ordersWarningsProps.ordersWithNotSubstructedCommissionCount } 
                style={ ordersWarningsProps.ordersWithNotSubstructedCommissionCount === 0 ? { 
                  backgroundColor: '#52c41a',
                  marginLeft: '10px'
                } : { marginLeft: '10px' } }
                showZero 
              />
            </Menu.Item>
            <SubMenu key="balances" icon={ <DollarCircleTwoTone /> } title={ <Badge offset={[5, 0]} dot>Балансы</Badge> }>
              { 
                Object.entries(ordersWarningsProps.balances)
                  .map(balance =>
                    <Menu.Item key={ balance[0] }>
                      <span>{ `${balance[0]}: ${ balance[1]} р.` }</span>
                    </Menu.Item>
                  ) 
              }
            </SubMenu>
            </>
            : ''
          }
        </Menu> 
      </Sider>
    )
}

export default SideBar