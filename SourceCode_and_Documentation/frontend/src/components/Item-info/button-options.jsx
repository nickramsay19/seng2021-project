import React, { Component } from 'react';
import './item-info.css'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
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
        return ( 
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} className="btn btn-shortened btn-outline-primary">
                {this.props.name}
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>this.props.addIngredient(this.props.name)}>Add To Shopping List</Dropdown.Item>
                <Link to={`/ingredients/${this.props.name}`}>
                <Dropdown.Item>View More Info</Dropdown.Item>
                </Link>
                </Dropdown.Menu>
            </Dropdown>                    
            );
    }
}
 
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      ref={ref}
      className="btn btn-shortened btn-outline-primary"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </button>
  ));

export default ButtonOptions;