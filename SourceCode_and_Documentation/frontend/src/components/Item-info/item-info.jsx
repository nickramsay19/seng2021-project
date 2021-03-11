import React, { Component } from 'react';
import './item-info.css';
import { Link } from 'react-router-dom';

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
 
export default ItemInfo;
