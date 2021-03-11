import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'


class Card extends Component {
    render() { 
        return ( 

            <div className="card1">
            <div className="card-image1"></div>
            <div className="card-body">
              <h5 className="card-title">Cocktail of the Day</h5>
              <p className="card-text">Margarita</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Tequilla, Triple sec, Lime juice</li>
            </ul>
            <div className="card-body">
              <Link to="/drinks/Margarita" className="card-link1">Info</Link>
            </div>
          </div>
                    /*<ul class="card">
                        <li class="list-group-item">
                            <div class="card-group">
                            <div className="item-card-image"></div>
                            <p class="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Aliquam imperdiet arcu at leo ornare, sed fermentum arcu 
                            scelerisque.
                            </p>
                            </div>
                        </li>
                        
                    </ul>*/
            
         );
    }
}

export default Card;

