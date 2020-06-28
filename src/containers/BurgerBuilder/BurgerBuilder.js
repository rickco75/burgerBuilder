import React, { Component } from "react";
import Aux from '../../hoc/AuxHoc/AuxHoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders'

import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'    // automatically uses index.js




export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        //console.log(this.props)
        this.props.onInitIngredients()
        
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    puchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    puchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    puchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')

    }

    render() {
        
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        
        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    disabled={disabledInfo}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.puchaseHandler}
                    isAuth={this.props.isAuthenticated} />
            </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.puchaseCancelHandler}
                purchaseContinued={this.puchaseContinueHandler}
                price={this.props.price}
            />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))