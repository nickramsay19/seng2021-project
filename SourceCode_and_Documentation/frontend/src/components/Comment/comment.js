import React, { Component } from 'react';
import "./comment.css";

class Comment extends Component {
    render() {
        return(
            <div class="comm">
                <div class="form-floating">
                    <textarea id="comment" class="form-control" placeholder="Comment" id="floatingTextarea" style="height: 100px"></textarea>
                    <label for="floatingTextarea2">Add an anonymous comment...</label>
                    <button type="button" class="btn btn-outline-primary float-end">Post</button>
                </div>
            </div>
        )
    }
}

export default Comment