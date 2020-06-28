import React, { Component } from 'react'
import Aux from '../../../hoc/AuxHoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // could be converted back to functional component
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                //console.log(this.props.ingredients[igKey]) // get value for key (number of items)
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }

}

export default OrderSummary