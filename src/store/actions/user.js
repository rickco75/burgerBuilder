import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const fetchUsers  = (token, userId) => {
    return dispatch => {
        dispatch(fetchUsersStart())
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        // axios.get('/users.json' + queryParams)
        axios.get('https://burgerbuilder-8a36d.firebaseio.com/users.json')
        .then(res => {
            console.log(res.data)
            const fetchedUsers = []
            for (let key in res.data){
                fetchedUsers.push({
                    ...res.data[key],
                    id: key
                })
            }     
            console.log("fetchedUsers",fetchedUsers)       
            dispatch(fetchUsersSuccess(fetchedUsers))
        })
        .catch(error=> {            
            dispatch(fetchUsersFail(error))
        })       
    }
}

export const addUser = (userData) => {
    console.log("userData",userData)
    return dispatch => {
        axios.post('https://burgerbuilder-8a36d.firebaseio.com/users.json',userData)
        .then(res => {
            console.log("added user successfully: ",res)
            dispatch(addUserSuccess(userData,res.data.name))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}

export const addUserSuccess = (userData,userId) => {
    return {
        type: actionTypes.ADD_USER_SUCCESS,
        userData:userData,
        userId:userId    
    }
}

export const fetchUsersStart = () =>{
    return {
        type: actionTypes.FETCH_USERS_START
    }
}

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users:users
    }
}

export const fetchUsersFail = () => {
    return {
        type: actionTypes.FETCH_USERS_FAIL
    }
}