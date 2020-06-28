import React from 'react'
import classes from './User.module.css'

const user = (props) => {
    return (
        <div className={classes.User}>
            User ID: {props.userId} <br/>
            Username: {props.username} <br/>
            First Name: {props.firstName} <br/>
            Last Name: {props.lastName} <br/>
            Email: {props.email}
        </div>
    )
}

export default user