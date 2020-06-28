import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import User from '../../components/User/User'

class Users extends Component {

    state = {
        email: '',
        firstName: '',
        lastName: '',
        userName: ''
    }
    componentDidMount() {
        this.props.onFetchUsers(this.props.token, this.props.userId)
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }

    userHandler = (event) => {
        event.preventDefault()
        const formData = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName
        }
        const newFormData = {
            email: formData.email[0],
            firstName: formData.firstName[0],
            lastName: formData.lastName[0],
            userName: formData.userName[0]
        }
        console.log(newFormData);

        this.props.onAddUser(newFormData, this.props.token)
    }

    render() {
        let users = <Spinner />
        if (!this.props.loading) {
            users = this.props.users.map(user => (
                <User key={user.id}
                    username={user.userName}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email = {user.email}
                    userId = {user.id}
                />
            ))
        }
        return (
            <div>
                Welcome to Users
                {users}
                <form onSubmit={this.userHandler}>
                    <span>Username</span>
                    <input
                        onChange={this.inputChangeHandler} name="userName" value={this.state.userName} /> <br />
                    <span>First Name</span>
                    <input
                        onChange={this.inputChangeHandler} name="firstName" value={this.state.firstName} /><br />
                    <span>Last Name</span>
                    <input
                        onChange={this.inputChangeHandler} name="lastName" value={this.state.lastName} /><br />
                    <span>Email</span>
                    <input
                        onChange={this.inputChangeHandler} name="email" value={this.state.email} />

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUsers: (token, userId) => dispatch(actions.fetchUsers(token, userId)),
        onAddUser: (formData, token) => dispatch(actions.addUser(formData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, axios))