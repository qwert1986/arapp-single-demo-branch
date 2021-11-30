import React from 'react'
import { connect } from 'react-redux';
import { ordersApi } from '../../api/api';
import Orders from './Orders';
import { getSettings, getAppConfig } from '../Settings/settings-reducer';
import { getColumnFilter } from './OrdersHelper';
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CheckCircleTwoTone, CloseCircleTwoTone, StopTwoTone, ContainerTwoTone } from '@ant-design/icons';
import { compose } from 'redux';
import withLoginRedirect from '../../HOCs/withLoginRedirect';
import Loader from '../Loader/Loader';
import labels from './labels';
import { setHTTPError } from '../../store/app-reducer';
import Text from 'antd/lib/typography/Text';

const getOrdersParams = params => ({
  'per-page': params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class OrdersContainer extends React.Component {
  state = {
    initialized: false,
    searchText: '',
    searchedColumn: '',
  }

  componentDidMount() {
    Promise.all([
      this.props.getSettings(), 
      this.props.getAppConfig()
    ])
    .then(() => this.setState({ initialized: true }))
  }

  fetch = (params = {}) => {
    this.setState({ loading: true })
    return ordersApi.getOrders(getOrdersParams(params))
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={'Искать'}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Применить
          </Button>
        </Space>
      </div>
    ),

    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

    onFilter: (value, record) => {
      let result = ''
      switch (dataIndex) {
        case 'name':
          if (record[dataIndex]) {
            const fullName = record['name'] + ' ' + record['middle_name'] + ' ' + record['last_name']
            result = fullName.toString().toLowerCase().includes(value.toLowerCase())
          }
          return result
      
        default:
          if (record[dataIndex])
            result = record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          return result
      }
      
    },

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },

    render: (text, row) => {
      if (dataIndex === 'name' && window.innerWidth > 420)
        text = `${row.last_name} ${text} ${row.middle_name}`
      else if(window.innerWidth <= 420)
        text = `${row.last_name} ${text.substring(0,1) + '.'} ${row.middle_name.substring(0,1) + '.'}`

      if (this.state.searchedColumn === dataIndex)
        return <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      else
        return text
    }
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    if (!this.state.initialized || this.props.httpError.message)
      return <Loader 
        type={ this.props.httpError.message ? 'error' : 'info' } 
        description={ this.props.httpError.message ? this.props.httpError : labels.loading.fetchingOrders } 
      />

    const columns =  [
      {
        title: 'ID',
        dataIndex: 'id',
        responsive: ['sm'],
        render: id => <b>{id}</b>,
        sorter: true,
        //fixed: 'left'
      },
    
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'Orders[full_name]',
        //render: (name, row) => `${name} ${row.middle_name} ${row.last_name}`,
        ...this.getColumnSearchProps('name'),
        sorter: true,
        //fixed: 'left'
      },
    
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'Orders[email]',
        responsive: ['xxl'],
        ...this.getColumnSearchProps('email'),
        sorter: true
      },
    
      {
        title: 'Курс',
        dataIndex: 'course',
        responsive: ['sm'],
        render: (course) => (`${this.props.courseOficial[course]}`.length > `${this.props.courseOficial[course]}`.substring(0, 25).length 
          ? `${this.props.courseOficial[course]}`.substring(0, 25) + '...'
          : `${this.props.courseOficial[course]}`),
        filters: getColumnFilter(this.props.courseOficial),  
        key: 'Orders[course]',
        sorter: true
      },

      {
        title: 'Разделено',
        dataIndex: 'share_status',
        responsive: ['sm'],
        filters: getColumnFilter(this.props.shareStatus),  
        key: 'Orders[share_status]',
        sorter: true,
        width: 130,
        align: 'center',
        render: (share_status, row) => {
          let price
          row.price_received === null ? price = row.price : price = row.price_received;  

          if (share_status === '1')
            return <Text>{ price } <CheckCircleTwoTone twoToneColor="#52c41a" /></Text>
          else
            return <Text>{ price } <CloseCircleTwoTone twoToneColor="#e05757" /></Text>
        },   
      },

      {
        title: 'Дата начала',
        dataIndex: 'date_1',
        key: 'Orders[date_1]',
        responsive: ['sm'],
        ...this.getColumnSearchProps('date_1'),
        sorter: true,
        width: 130
      },

      {
        title: 'Дата окончания',
        dataIndex: 'date_2',
        key: 'Orders[date_2]',
        responsive: ['sm'],
        ...this.getColumnSearchProps('date_2'),
        sorter: true,
        width: 130
      },

      {
        title: 'Способ оплаты',
        dataIndex: 'pay_method',
        key: 'Orders[pay_method]',
        responsive: ['sm'],
        filters: getColumnFilter(this.props.payMethod),  
        render: (pay_method) => `${this.props.payMethod[pay_method]}`,
        sorter: true,
        width: 130
      },

      {
        title: 'Статус курса',
        dataIndex: 'course_status',
        responsive: ['sm'],
        key: 'Orders[course_status]',
        filters: getColumnFilter(this.props.courseStatus),  
        width: 140,
        align: 'center',
        render: (course_status) => {
          if (course_status === '1') 
            return <CheckCircleTwoTone twoToneColor="#52c41a" />
          else if (course_status === '0')
            return <CloseCircleTwoTone twoToneColor="#e05757" />
          else 
            return <StopTwoTone twoToneColor="#e05757"/>
        },
        sorter: true
      },

      {
        title: 'Статус диплома',
        dataIndex: 'diplom_status',
        responsive: ['sm'],
        key: 'Orders[diplom_status]',
        width: 130,
        align: 'center',
        filters: getColumnFilter(this.props.diplomStatus),  
        render: (diplom_status) => {
          if (diplom_status === '1')
            return <ContainerTwoTone twoToneColor="#0000ff" />
          else if (diplom_status === '0')
            return <CloseCircleTwoTone twoToneColor="#e05757" />
          else
            return <CheckCircleTwoTone twoToneColor="#52c41a" />
        },
        sorter: true
      },
    ]  

    return (
      <Orders fetch = { this.fetch } columns = { columns } setHTTPError = { this.props.setHTTPError }/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courseOficial: state.settings.coursesOficial,
    payMethod:  state.settings.payMethod,
    shareStatus: state.settings.shareStatus,
    diplomStatus: state.settings.diplomStatus,
    courseStatus: state.settings.courseStatus,
    isAuth: state.auth.isAuth,
    httpError: state.app.httpError,
  }
}

export default compose(
  connect(mapStateToProps, { getSettings, getAppConfig, setHTTPError }),
  withLoginRedirect
  )(OrdersContainer)