import React, { Component } from 'react';
import './item-info.css';
import { Link } from 'react-router-dom';

function PostComt() {
    var content=document.getElementById("floatingTextarea");
    var msgBox=document.getElementById("messageBox");
    if (content.value==="") {
        return alert("the comment cannot be empty");
    }

    var commentPost=document.createElement("div");
    commentPost.className="cmtBlock";
    commentPost.innerHTML=content.value;
    msgBox.appendChild(commentPost);
}

class ItemInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {this.props.name}
                    </h1>
                    <Link to="/drinks"><p className="item-back">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients
                        </h2>
                        <p className="item-ingredient-list">
                            {this.props.ingredients.map(item => 
                                `${item}\n`    
                            )}
                        </p>
                    </div>
                </div>
                
                <div className="item-instructions">
                    <h2 className="item-header">
                        Instructions
                    </h2>
                    <p className="item-text">
                        {this.props.instructions}
                    </p>
                </div>
                
                <p>Add to Shopping List</p>
                
                <div className="comm">
                    <div className="form-floating">
                        <h3 className="item-header">
                            Comments
                        </h3>
                        <textarea class="form-control" placeholder="Add an anonymous comment..." id="floatingTextarea"></textarea>
                        <button type="button" class="btn btn-outline-primary float-end" onClick={PostComt}>Post</button>                
                    </div>
                </div>
                <div class="message_box" id="messageBox"></div>
                
            </div>
        );
    }
}
 
export default ItemInfo;
