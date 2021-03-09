import React, { Component } from 'react';
import "./comment.css";

class Comment extends Component {
    render() {
        return(
            <div className="comm">
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Comment" id="floatingTextarea" style="height: 150px;"></textarea>
                    <label for="floatingTextarea">Add an anonymous comment...</label>
                    <button type="button" className="btn btn-outline-primary float-end">Post</button>
                </div>
            </div>
        )
    }
}

export default Comment