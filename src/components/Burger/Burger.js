import React from 'react';
import { withRouter } from 'react-router-dom'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = (props) => {
    //console.log(props)
    // convert ingredients into an array
    let transformedIngredients = Object.keys(props.ingredients)
        // map ingredients
        .map(igKey => {
            // map again to get the index value to use for the key on burgerIngredient component vvvvv
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                //console.log(igKey)
                // igKey is an array of objects
                // return BurgerIngredient component with type i.e., salad ...
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        // reduce array to a total length of ingredients / number
        .reduce((arr,el)=> {
            // combine array of objects into one array
            //console.log(arr.concat(el))
            return arr.concat(el)
        },[])
        //console.log(transformedIngredients)
        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }

    //console.log(transformedIngredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger)