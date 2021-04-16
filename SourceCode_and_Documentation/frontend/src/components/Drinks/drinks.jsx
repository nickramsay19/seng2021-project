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
          error: null,
          isLoaded: false,
          items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:5050/api/cocktails_details")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.drinks
              });
            //   console.log(this.state.items);
            },
            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    render() { 
      const { match } = this.props;
      const { error, isLoaded, items } = this.state;
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
                <Route path={`${match.path}/:cocktailId`}>
                    <CookiesProvider>
                        <ItemInfo drinks={items}/>
                    </CookiesProvider>
                </Route>
      
            </div>
          );
    }
  }
      
    }

const DrinksRouter = withRouter(Drinks)
export default DrinksRouter
