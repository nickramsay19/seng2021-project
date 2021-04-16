import React, { Component } from 'react';
import './item-info.css';
import { Link, withRouter } from 'react-router-dom';
import { Cocktails } from '../Drinks/Cocktails'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

function PostComt() {
    var username=document.getElementById('nameInput');
    var content=document.getElementById("floatingTextarea");
    var msgBox=document.getElementById("messageBox");
    if (username.value==="" || content.value==="") {
        username.value="";
        content.value="";
        return alert("The username or comment cannot be empty");
    }

    var commentName=document.createElement("div");
    commentName.className="cmt";
    commentName.innerHTML="User: "+username.value;
    var commentPost=document.createElement("div");
    commentPost.className="cmt";
    commentPost.innerHTML=content.value;
    username.value="";
    content.value="";

    var commentTime=document.createElement("div");
    var cmtDate=new Date();
    var arr=cmtDate.toLocaleDateString().split("/");
	commentTime.innerHTML=arr[1]+"/"+arr[0]+"/"+arr[2]+", "+cmtDate.toLocaleTimeString();

    var hr=document.createElement("div");
    hr.innerHTML="<hr />";
    commentTime.appendChild(commentName);
    commentTime.appendChild(commentPost);
    commentTime.appendChild(hr);
    msgBox.appendChild(commentTime);
}

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
        // const cocktail = Cocktails.find(({ id }) => id === cocktailId)

        const cocktail = this.props.drinks.find((c) => {
            if (c.name === cocktailId) {
                return true
            }
        })
        return ( 
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {cocktail.name}
                    </h1>
                    <a href="#" className="btn btn-shortened btn-outline-primary" onClick={() => this.addIngredients(cocktailId) }>Add to Shopping List</a>  
                    
                    <Link to="/drinks"><a href="#" className="btn btn-shortened btn-outline-primary">To Drinks Page</a></Link>
                </div>
                
                <div className="item-row">
                    <img className="item-image" src={cocktail.thumbnail}></img>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients 
                        </h2>
                        <small class="text-muted"> Click to add to shopping list</small>
                        <div className="item-ingredient-list">               
                            {Object.keys(cocktail.ingredients).map((item) => 
                                <a href="#" className="btn btn-shortened btn-outline-primary" onClick={() => this.addIngredient(item) }>{item}</a>    
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
                
                <div className="item-comments">
                    <div className="form-floating">
                        <h3 className="item-header">
                            Comments
                        </h3>
                        <input type="text" class="form-control" id="nameInput" placeholder="Username"></input>
                        <textarea class="form-control" placeholder="Add a comment..." id="floatingTextarea"></textarea>
                        <button type="button" class="btn btn-outline-primary custom-btn" onClick={PostComt}>Post</button>                
                    </div>
                </div>
                <hr class="cmtSep"></hr>
                <div class="message_area">
                    <div class="message_box" id="messageBox"></div>
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
