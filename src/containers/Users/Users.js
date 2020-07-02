import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import User from '../../components/User/User'
import classes from './Users.module.css'

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

        let validation = newFormData.email && newFormData.firstName && newFormData.lastName && newFormData.userName

        if (validation){
            document.getElementById("submitButton").style.disabled = false;
            this.props.onAddUser(newFormData, this.props.token)
            this.setState({
                userName: '',
                firstName: '',
                lastName: '',
                email: ''
            })
        } else {
            document.getElementById("errorMessage").innerHTML = " ** All fields are required!"
            console.log("not validated")
        }

        
    }

    render() {
        let users = <Spinner />
        if (!this.props.loading) {
            users = this.props.users.map(user => (
                <User key={user.id}
                    username={user.userName}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    userId={user.id}
                />
            ))
        }

        return (
            <div>
                <h1 className={classes.UsersHeader}>User Management</h1>
                <div className={classes.UserForm}>
                    <h3 className={classes.UsersHeader}>Add a new User</h3>
                     <hr />
                    <p className={classes.UsersHeader} id="errorMessage" style={{color:"white"}}></p>
                    <form onSubmit={this.userHandler}>
                        <div className={classes.Input}>
                        <label className={classes.Label}>User Name</label>
                            <input className={classes.InputElement}
                                   onChange={this.inputChangeHandler} 
                                   name="userName" 
                                   value={this.state.userName} />
                        </div>

                        <div className={classes.Input}>
                        <label className={classes.Label}>First Name</label>
                            <input className={classes.InputElement}
                                   onChange={this.inputChangeHandler} 
                                   name="firstName" 
                                   value={this.state.firstName} />
                        </div>
                        <div className={classes.Input}>
                        <label className={classes.Label}>Last Name</label>
                            <input className={classes.InputElement}
                                   onChange={this.inputChangeHandler} 
                                   name="lastName" 
                                   value={this.state.lastName} />
                        </div>
                        <div className={classes.Input}>
                        <label className={classes.Label}>Email</label>
                            <input className={classes.InputElement}
                                onChange={this.inputChangeHandler} 
                                name="email" 
                                value={this.state.email} />
                        </div>                                               
                        <div className={classes.UsersHeader}>
                            <button 
                                    id="submitButton" 
                                    className={classes.Button}>
                                        Submit
                            </button>
                        </div>
                    </form>
                </div>
                {users}
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