import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const withLoginRedirect = (Component) => {
    class ReactComponent extends React.Component {
        render() {
            if (!this.props.isAuth)
                return <Redirect to='/' />
            return <Component {...this.props } />
        }
    }

    return connect(state => ({ isAuth: state.auth.isAuth }))(ReactComponent)
}

export default withLoginRedirect