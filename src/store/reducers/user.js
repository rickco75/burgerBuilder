import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    users: [],
    loading: false,
    purchased: false,
    error: null
}


const fetchUsersStart = (state,action) => {
    return updateObject(state, {loading: true})
}

const fetchUsersFail = (state,action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchUsersSuccess = (state,action) => {
    return updateObject(state, {
        loading: false,
        users: action.users
    })
}

const addUserSuccess = (state,action) => {
    return updateObject(state, {
        loading: false,
        users: state.users.concat(action.userData)
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state,action)
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state,action)
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state,action)
        case actionTypes.ADD_USER_SUCCESS: return addUserSuccess(state,action)
        default: return state
    }
}

export default reducer