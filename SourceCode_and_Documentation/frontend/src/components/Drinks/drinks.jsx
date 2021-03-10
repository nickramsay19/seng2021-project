import React, { Component } from 'react';
import Item from '../Item-card/item'
import ItemInfo from '../Item-info/item-info'
import { Cocktails } from '../Searchbar/Cocktails.js'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const DrinksList = () => {
    return (
        Cocktails.map((item, index) =>
            <Link to={`drinks/${item.name}`} key={item.name+index+'card'}>
                <Item name={item.name}/>
            </Link> 
        ) 
    )
}

const Routes = () => {
    return (
        Cocktails.map((item,index) =>
            <Route path={`drinks/${item.name}`}>
                <ItemInfo />
            </Route>
        )
    )
}

export default class Drinks extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <header>
                        <h1>Drinks Page</h1>
                    </header>
                    <Switch>
                        <Route path='/drinks' component={DrinksList} />
                        <Routes />
                    </Switch>
                    
                </div>
            </Router>
           
        )
    }
}



// function X() {
//     return (
//         <React.Fragment>          
//             <Switch>
//                 <Route exact path={path}>
//                     {Cocktails.map((item, index) =>
//                         <Link to={`${url}/${item.name}`} key={item.name+index+'card'}>
//                             <Item  name={item.name}/>
//                         </Link> 
//                     )} 
//                 </Route>

//                 {Cocktails.map((item,index) =>
//                     <Route path={match.url+ `/${item.name}`}>
//                         <ItemInfo   key={item.name+index+'info'} 
//                                     name={item.name} 
//                                     ingredients={item.ingredients} 
//                                     instruction={item.instructions}
//                         />
//                     </Route>
//                 )}
//             </Switch>
//         </React.Fragment>
//     )
// }