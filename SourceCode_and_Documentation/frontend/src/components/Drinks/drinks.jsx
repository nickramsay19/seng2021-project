import React, { Component } from 'react';
import Item from '../Item-card/item'
import ItemInfo from '../Item-info/item-info'
// import { Cocktails } from './Cocktails.js'
import { Route, Link, withRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

class Drinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: this.props.error,
          isLoaded: this.props.isLoaded,
          items: this.props.items,
        };
    }

    render() { 
      const { match } = this.props;
      const error = this.props.error
      const isLoaded = this.props.isLoaded
      const items = this.props.items
      console.log(isLoaded)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <Route exact path={match.path}>
                    <h2>Select a drink to see more info</h2>
                    {items.map(( cocktail ) => (
                        
                            <Link to={`${match.url}/${cocktail['name']}`}>
                            <Item key={cocktail['id']} image={cocktail['thumbnail']}>{cocktail['name']}</Item>
                            </Link>
                    ))}
                </Route>
                <Route path={`${match.path}/:cocktailId+`}>
                    <ItemInfo drinks={items}/>
                </Route>
      
            </div>
          );
    }
  }
      
    }

const DrinksRouter = withRouter(Drinks)
export default DrinksRouter
