import React, { Component } from 'react';
import Item from '../Item-card/item'
import IngredientInfo from '../Ingredient-info/ingredient-info'
import { Cocktails } from '../Drinks/Cocktails.js'
import { Route, Link, withRouter } from 'react-router-dom'



class Ingredients extends Component {

    render() { 
        let IngredientList = []; 

        for(let i = 0; i < Cocktails.length; i++){
            for(let j = 0; j < Cocktails[i].ingredients.length; j++){
                IngredientList.push(Cocktails[i].ingredients[j]);
            }
        }

        IngredientList = [...new Set(IngredientList)]
        const { match } = this.props;
        return (
            <div className="container">
                <Route exact path={match.path}>
                    <h2>Select an ingredient to see more info</h2>
                    {IngredientList.map(( ingredient, id ) => (
                        <Link to={`${match.url}/${ingredient}`}>
                        <Item key={id}>{ingredient}</Item>
                        </Link>
                        
                    ))}
                </Route>
                <Route path={`${match.path}/:ingredientID`}>
                    <IngredientInfo />
                </Route>
    
            </div>
        );
    }
  }

const IngredientRouter = withRouter(Ingredients)
export default IngredientRouter
