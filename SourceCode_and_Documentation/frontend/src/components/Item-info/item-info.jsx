import React, { Component } from 'react';
import './item-info.css';
import { Link, withRouter } from 'react-router-dom';
import { Cocktails } from '../Searchbar/Cocktails'

class Cocktail extends Component {
    state = {  }
    render() { 
        const { match } = this.props;
        const { cocktailId } = match.params;
        console.log("match",match)
        const cocktail = Cocktails.find(({ id }) => id === cocktailId)
        return ( 
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {cocktail.name}
                    </h1>
                    <p className="item-button">Add to Shopping List</p>  
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
                                <p className="item-ingredient-highlight">{item}</p>    
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
export default ItemInfoRouter
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
