import React, { Component } from 'react';
import "./comment.css";

class Comment extends Component {
    render() {
        return(
            <div class="form-floating">
                <textarea id="comment" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 50px"></textarea>
                <label for="floatingTextarea2">Comments</label>
                <button>Submit</button>
            </div>
        )
    }
}

export default Comment