import React from 'react';
import { Link } from 'react-router-dom';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isLoaded: false,
            error: null
        }
    }

    postComt = () => {
        const { cocktail } = this.props;
        const message = document.getElementById("floatingTextarea").value;
        document.getElementById("floatingTextarea").value = "";
        if (message === "" || message.length > 1000) {
            return alert("The message cannot be empty or longer than 1000 characters");
        }

        fetch("http://localhost:5050/comments/add", {
            method: "POST",
            body: JSON.stringify({
                'u_id': this.props.userSession.getUserId(),
                'cocktail': cocktail,
                'message': message,
                'time': new Date().toLocaleString()
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(response => {
            return response.json();
        }).then(() => {
            return this.getPost(cocktail);
        }).then((error) => {
            this.setState({
                isLoaded: true,
                error
            })
        })
    }

    delPost = del_id => {
        const { cocktail } = this.props;
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
        }).then(() => {
            return this.getPost(cocktail);
        }).then(error => {
            this.setState({
                isLoaded: true,
                error
            })
        })
    }

    getPost = cocktail => {
        fetch("http://localhost:5050/comments/get?cocktail=" + cocktail)
            .then(response => response.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    comments: json.messages
                })
            }).then((error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }
    
    componentDidMount() {
        const { cocktail } = this.props;
        this.getPost(cocktail);
    }

    commentPostBox = () => {
        if (this.props.userSession.getIsLoggedIn()) {
            return (
                <>
                    <textarea
                        class="form-control"
                        placeholder="Add a comment... (Max. 1000 characters)"
                        id="floatingTextarea"
                    >
                    </textarea>
                    <button
                        type="button"
                        class="btn btn-shortened btn-outline-primary"
                        onClick={this.postComt}
                    >
                        Post
                    </button>   
                </>    
            )
        } else {
            return <p>Please <Link to="/login">log in</Link> to post comments. Or your can register <Link to="/register">here.</Link></p>
        }
    }
    
    render() {
        const { comments, isLoaded, error } = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                        
                    <div className="item-comments">
                    <div className="form-floating">
                        <h3 className="item-header">
                            Comments
                        </h3>
                        <this.commentPostBox />    
                    </div>
                    </div>
                    <hr class="cmtSep"></hr>
                    <div class="message_area">
                        <div class="message_box" id="messageBox">
                            {comments.map((cmt) => 
                                <div className="cmt" id={cmt.cmt_id}>
                                    {cmt.ldTime}<br />
                                    {"User: "+cmt.username}<br />
                                    {cmt.message}
                                    <button
                                        type="button"
                                        class="btn btn-link"
                                        onClick={() => {if (window.confirm("Delete this comment?")) this.delPost(cmt.cmt_id)}}
                                    >
                                       Delete
                                    </button>
                                    <hr />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Comments;