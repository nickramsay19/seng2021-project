import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'


class Card extends Component {
    render() { 
        return ( 

          <div className="card1">
            <Link to="/drinks/Martini"> 
              <img className="card-image1" src="https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg"></img>
            </Link>
           
            <div className="card-body">
              <h5 className="card-title">Cocktail of the Day</h5>
              <p className="card-text">Martini</p>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">Dry Vermouth, Gin, Olive</li>
            </ul>
          </div>
         );
    }
}

export default Card;

