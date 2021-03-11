import React, { Component } from 'react';
import './card.css'
import './item.css'

class Card extends Component {
    render() { 
        return ( 

                    <ul class="card">
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
                        <li class="list-group-item">
                            <div class="inner-card">
                                Sed erat lacus, gravida feugiat tellus vel, accumsan fermentum elit. 
                                Nam maximus in leo fringilla auctor. Morbi fringilla dolor eros, in pulvinar lacus.
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="inner-card">
                                Ut semper eget dui at imperdiet. Curabitur id elit nisi.
                                Vestibulum tincidunt fringilla diam at vulputate.
                            </div>
                        </li>
                    </ul>
            
                /*}
            <div class="card">
            <div class="card-body"></div>
            <p className="item-name">
                {this.props.name}
            </p>
            </div>*/
            
         );
    }
}

export default Card;

