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

    postComt = () => {
        fetch("http://localhost:5050/comments/add", {
            method: "POST",
            body: JSON.stringify({
                'u_id': 0,
                'cocktail': document.getElementsByClassName("item-title").value,
                'message': document.getElementById("floatingTextarea").value,
                'time': new Date().toLocaleString()
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        }).then(error => {

        })
    }

    delPost = del_id => {
        fetch("http://localhost:5050/comments/remove", {
            method: "POST",
            body: JSON.stringify({
                'u_id': 0,
                'comment_id': parseInt(del_id.charAt(del_id.length - 1))
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        }).then(error => {

        })
    }

    getPost = cocktail => {
        console.log("inside getPost");
        /*
        fetch("http://localhost:5050/comments/get?cocktail=" + cocktail)
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (text) {
            console.log('GET response:');
            console.log(text);
        });
        */
        fetch("http://localhost:5050/comments/get?cocktail=" + cocktail, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        }).then(error => {

        })
    }

    render() { 
        const { match } = this.props;
        const { cocktailId } = match.params;
        const cocktail = Cocktails.find(({ id }) => id === cocktailId)
        var loadCmt = this.getPost(cocktail.name);

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
                        <textarea class="form-control" placeholder="Add a comment... (Max. 1000 characters)" id="floatingTextarea"></textarea>
                        <button type="button" class="btn btn-shortened btn-outline-primary" onClick={this.postComt}>Post</button>                
                    </div>
                </div>
                <hr class="cmtSep"></hr>
                <div class="message_area">
                    <div class="message_box" id="messageBox">
                        {loadCmt.map((cmt) => 
                            <div className="cmt" id={cmt.id}>
                                <div>
                                    {cmt.ldTime}<br />
                                    {"User: "+cmt.username}<br />
                                    {cmt.message}
                                    <button
                                        type="button"
                                        class="btn btn-link"
                                        onClick={() => {if (window.confirm("Delete this comment?")) this.delPost(cmt.id)}}
                                    >
                                        Delete
                                    </button>
                                    <hr />
                                </div>
                            </div> 
                        )}
                    </div>
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

/*
postComt = () => {
        var username = document.getElementById("nameInput");
        var content = document.getElementById("floatingTextarea");
        var msgBox = document.getElementById("messageBox");
        if (username.value === "" || content.value === "") {
            username.value = "";
            content.value = "";
            return alert("The username or comment cannot be empty.");
        } else if (content.value.length > 1000) {
            username.value = "";
            return alert("The length of comment should not exceed 1000 characters.");
        }

        var commentOut = document.createElement("div");
        commentOut.className = "cmt";
        var commentTime = document.createElement("div");
        var cmtDate = new Date();
        commentTime.innerHTML = cmtDate.toLocaleString()+"<br />";
        commentTime.innerHTML += "User: "+username.value+"<br />"+content.value;
        commentTime.innerHTML += document.getElementsByClassName("btn btn-link")

        username.value = "";
        content.value = "";
        commentOut.appendChild(commentTime);
        
        msgBox.insertBefore(commentOut, msgBox.childNodes[0]);
    }
*/