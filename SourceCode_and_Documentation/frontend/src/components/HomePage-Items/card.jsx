import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'


class Card extends Component {
    render() { 
        return ( 

            <div class="card1">
            <div class="card-image1"></div>
            <div class="card-body">
              <h5 class="card-title">Cocktail of the Day</h5>
              <p class="card-text">Margarita</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Tequilla</li>
              <li class="list-group-item">Triple sec</li>
              <li class="list-group-item">Lime juice</li>
            </ul>
            <div class="card-body">
              <Link to="/drinks/Margarita" class="card-link">Info</Link>
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

