import React from 'react'
import classes from './Order.module.css'

const order = (props) => {

    const ingredients = []
    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            })
    }

    let transformedCustomerData = Object.keys(props.customer).map(key =>{        
        return [...Array(props.customer[key])].map((o)=>{
            return <div 
                        style={{fontWeight:'bold',
                                padding:'2px',
                                textTransform:'capitalize'}} 
                        key={key}>
                <span>{key}: {o}</span>
            </div>
        })
    })

    const ingredientOutput = ingredients.map(ig => {
        return <span
                style={{textTransform: 'capitalize',
                        display: 'inline',
                        margin: '0 8px',
                        border: '1px solid grey',
                        padding: '5px'}} 
                key={ig.name}>{ig.name} ({ig.amount})</span>
    })


    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD ${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        <div style={{textTransform:'lowercase'}}>
            {transformedCustomerData}
        </div>
        <button onClick={props.click}>DELETE</button>
        
    </div>
)}

export default order