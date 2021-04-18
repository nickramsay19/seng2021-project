import React, { Component } from 'react';
import './item-info.css'
import { Link } from 'react-router-dom';

class ButtonOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
        this.toggleHover=this.toggleHover.bind(this)
        this.HoverOn = this.HoverOn.bind(this)
        this.HoverOff = this.HoverOff.bind(this)
    }

    toggleHover() {
        this.setState(prevState => ({isHovered: !prevState.isHovered}));
    }

    HoverOn() {
        this.setState({
            isHovered: true,
        })
    }
    HoverOff() {
        this.setState({
            isHovered: false,
        })
    }

    render() { 
        console.log(this.props)
        return ( 
            
                
                this.state.isHovered ? 
                <div className="btn-shortened btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary" onClick={this.toggleHover}>{this.props.name}</button>
                    <button type="button" class="btn btn-outline-primary" onClick={()=>this.props.addIngredient(this.props.name)}>Add</button>
                    <Link type="button" className="btn btn-outline-primary" to={`/ingredients/${this.props.name}`}>More Info</Link>
                </div>  : 
                
                <button className="btn btn-shortened btn-outline-primary" onClick={this.toggleHover}>{this.props.name}</button>
                
                
            
            );
    }
}
 
export default ButtonOptions;