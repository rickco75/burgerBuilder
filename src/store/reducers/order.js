import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseBurgerStart = (state, action) => {
    console.log("purchaseBurgerStart State:",state)
    return updateObject(state, { loading: true })
}

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } )
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrdersFail = (state,action) => {
    return updateObject(state, { loading: false })
}

const deleteOrderStart = (state,action) => {
    return updateObject(state, { loading: true})
}
const deleteOrderSuccess = (state,action) => {
    return updateObject(state, {
            loading: false
        })
}
const deleteOrderFail = (state,action) => {
    return updateObject(state, {
        loading: false,
        error:action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state,action) 
        case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state,action)          
        case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state,action)
        case actionTypes.DELETE_ORDER_FAIL: return deleteOrderFail(state,action)
        default: return state
    }
}

export default reducer