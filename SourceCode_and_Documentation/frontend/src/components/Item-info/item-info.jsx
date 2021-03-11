import React, { Component } from 'react';
import './item-info.css';
import { Link, withRouter } from 'react-router-dom';
import { Cocktails } from '../Drinks/Cocktails'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Cocktail extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
    
        // get cookies
        const { cookies } = props;

        // set state
        this.state = {
            ingredients: cookies.get('ingredients') || []
        };
    }

    addIngredients = cocktailId => {
        // get cookies
        const { cookies } = this.props;
        
        const cocktail = Cocktails.find(({ id }) => id === cocktailId);

        let new_ingredients = this.state.ingredients;
        for (let i = 0; i < cocktail.ingredients.length; i++ ){
            new_ingredients.push(cocktail.ingredients[i]);
        }
        //new_ingredients.push(cocktailId); // TODO: add each coktail ingredient not cokctail id

        this.setState({ ingredients: new_ingredients });
        cookies.set('ingredients', this.state.ingredients, { path: '/' });
        
    }

    addIngredient = ingredient => {
        // get cookies
        const { cookies } = this.props;
        
        let new_ingredients = this.state.ingredients;
        new_ingredients.push(ingredient);

        this.setState({ ingredients: new_ingredients });
        cookies.set('ingredients', this.state.ingredients, { path: '/' });
        
    }

    render() { 
        const { match } = this.props;
        const { cocktailId } = match.params;
        const cocktail = Cocktails.find(({ id }) => id === cocktailId)
        return ( 
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {cocktail.name}
                    </h1>
                    <p className="item-button" onClick={() => this.addIngredients(cocktailId) }>Add to Shopping List</p>  
                    <Link to="/drinks"><p className="item-button">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients
                        </h2>
                        <div className="item-ingredient-list">
                            {cocktail.ingredients.map((item) => 
                                <p className="item-ingredient-highlight" onClick={() => this.addIngredient(item) }>{item}</p>    
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="item-instructions">
                    <h2 className="item-header">
                        Instructions
                    </h2>
                    <p className="item-text">
                        {cocktail.instructions}
                    </p>
                </div>                
            </div>
         );
    }
}
const ItemInfoRouter = withRouter(Cocktail)
export default withCookies(ItemInfoRouter);
// class ItemInfo extends Component {
//     state = {  }
//     render() { 
//         const { match } = this.props;
//         const { cocktailId } = match.params;
//         console.log("match",match)
//         const cocktail = Cocktails.find(({ id }) => id === cocktailId)
//         return ( 
//             <div className="item-info-card">
//                 <div className="item-top-bar">
//                     <h1 className="item-title">
//                         {cocktail.name}
//                     </h1>
//                     <p className="item-button">Add to Shopping List</p>  
//                     <Link to="/drinks"><p className="item-button">Back</p></Link>
//                 </div>
                
//                 <div className="item-row">
//                     <div className="item-image"></div>
//                     <div className="item-ingredients">
//                         <h2 className="item-header">
//                             Ingredients
//                         </h2>
//                         <div className="item-ingredient-list">
//                             {cocktail.ingredients.map((item) => 
//                                 <p className="item-ingredient-highlight">{item}</p>    
//                             )}
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="item-instructions">
//                     <h2 className="item-header">
//                         Instructions
//                     </h2>
//                     <p className="item-text">
//                         {cocktail.instructions}
//                     </p>
//                 </div>                
//             </div>
//          );
//     }
// }
