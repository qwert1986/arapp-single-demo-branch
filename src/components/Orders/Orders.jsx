import { Table } from 'antd';
import React from 'react'
import 'antd/dist/antd.css'
import styles from './orders.module.css'
import ExpandedRaw from './ExpandedRow';
import { withRouter } from 'react-router';
import { getError } from '../../api/api';

class Orders extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  async componentDidMount() {
    const { pagination } = this.state;
    this.setState({ loading: true })
    this.props.fetch({ pagination })
      .then(data => this.updateTableState(data, pagination))
      .catch(error => this.props.setHTTPError(getError(error)))   
  }

  updateTableState(data, pagination) {
    this.setState({
      loading: false,
      data: data.data.data.results,
      pagination: {
        ...pagination,
        total: data.data.data.count,
      },
    })
  }

  handleTableChange = (pagination, filters, sorter) => {  
    this.setState({ loading: true }) 
    this.props.fetch({
      sort: sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`,
      //sortOrder: sorter.order,
      pagination,
      ...filters,
    })
      .then(data => this.updateTableState(data, pagination))
      .catch(error => this.props.setHTTPError(getError(error)))  
  }
 
  render() {
    const { data, pagination, loading } = this.state
    
    return (
      <Table
        sticky={ true }
        tableLayout="auto"
        className={ styles.ordersTable }
        scroll={{ x: 'max-content' }}
        columns={ this.props.columns }
        rowKey={ record => record.id }
        dataSource={ data }
        pagination={ pagination }
        loading={ loading }
        onChange={ this.handleTableChange }
        onRow={ (record, rowIndex) => {
          return {
            onClick: event => { this.props.history.push(`/orders/${record.id}`); },    
          }
        } }
        expandable={{
          expandedRowRender: record => <ExpandedRaw record={ record } />,
          rowExpandable: record => record.add_info,
        }}
      />
    );
  }
}

export default withRouter(Orders)