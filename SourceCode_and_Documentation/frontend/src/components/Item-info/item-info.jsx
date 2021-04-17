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
    
    listComt() {
        var msgBox = document.getElementById("messageBox");
        const cmtList = ["hello", "world", "!"]; // for testing
        const hr = document.createElement("div");
        hr.innerHTML = "<hr />";

        for (const cmt of cmtList) {
            var cmtOut = document.createElement("div");
            cmtOut.className = "cmt";
            var cmtContent = document.createElement("div");
            cmtContent.innerHTML = cmt;

            cmtOut.appendChild(cmtContent);
            cmtOut.appendChild(hr);
            msgBox.appendChild(cmtOut);
        }
    }

    PostComt() {
        var username=document.getElementById('nameInput');
        var content=document.getElementById("floatingTextarea");
        var msgBox=document.getElementById("messageBox");
        if (username.value==="" || content.value==="") {
            username.value="";
            content.value="";
            return alert("The username or comment cannot be empty");
        }
    
        var commentOut=document.createElement("div");
        commentOut.className="cmt";
        //var commentName=document.createElement("div");
        //commentName.innerHTML=" User: "+username.value;
        //var commentPost=document.createElement("div");
        //commentPost.innerHTML=content.value;
        
    
        var commentTime=document.createElement("div");
        var cmtDate=new Date();
        commentTime.innerHTML=cmtDate.toLocaleString()+"<br />"+"User: "+username.value+"<br />"+content.value;
        var hr=document.createElement("div");
        hr.innerHTML="<hr />";

        commentOut.appendChild(commentTime);
        //commentOut.appendChild(commentName);
        //commentOut.appendChild(commentPost);
        commentOut.appendChild(hr);

        username.value="";
        content.value="";
        msgBox.appendChild(commentOut);
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
                    <a href="#" className="btn btn-shortened btn-outline-primary" onClick={() => this.addIngredients(cocktailId) }>Add to Shopping List</a>  
                    
                    <Link to="/drinks"><a href="#" className="btn btn-shortened btn-outline-primary">Back</a></Link>
                </div>
                
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients 
                            
                        </h2>
                        <small class="text-muted"> Click to add to shopping list</small>
                        <div className="item-ingredient-list">
                            {cocktail.ingredients.map((item) => 
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
                        <button type="button" class="btn btn-shortened btn-outline-primary" onClick={this.PostComt}>Post</button>                
                    </div>
                </div>
                <hr class="cmtSep"></hr>
                <div class="message_area">
                    <div class="message_box" id="messageBox"><style onLoad={this.listComt}></style></div>
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
