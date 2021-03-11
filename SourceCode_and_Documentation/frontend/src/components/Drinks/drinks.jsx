import React, { Component } from 'react';
import Item from '../Item-card/item'
import ItemInfo from '../Item-info/item-info'
import { Cocktails } from './Cocktails.js'
import { Route, Link, withRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

class Drinks extends Component {
    render() { 
      const { match } = this.props;
      return (
        <div className="container">
            <Route exact path={match.path}>
                <h2>Select a drink to see more info</h2>
                {Cocktails.map(({ name, id }) => (
                    
                        <Link to={`${match.url}/${id}`}>
                        <Item key={id}>{name}</Item>
                        </Link>
                    
                ))}
            </Route>
            <Route path={`${match.path}/:cocktailId`}>
                <CookiesProvider>
                    <ItemInfo />
                </CookiesProvider>
            </Route>
  
        </div>
      );
    }
  }


// class Drinks extends Component {
//     render() {
//         const { match } = this.props;
//         console.log("match path", match.path)
//         console.log("match url", match.url)
//         return (
//             <div className="container">
//                 <h1>Drinks Page</h1>
//                 <Route exact path={match.path}>
//                         {Cocktails.map(({ name, id }) => (
//                             <Link to={`${match.url}/${id}`} key={id}>
//                                 <ItemInfo>{name}</ItemInfo>
//                             </Link>
//                         ))}
//                 </Route>
//                 <Route path={`${match.path}/:cocktailId`}>
//                     <ItemInfo/>
//                 </Route>
//             </div>          
//         )
//     }
// }
const DrinksRouter = withRouter(Drinks)
export default DrinksRouter
const HardCodedLinks = () => {
    return (
        <React.Fragment>
            <Route exact path="/drinks/0">
            <ItemInfo   name={Cocktails[0].name} 
                        ingredients={Cocktails[0].ingredients} 
                        instructions={Cocktails[0].instructions}
            />
            </Route>
            <Route exact path="/drinks/1">
                <ItemInfo   name={Cocktails[1].name} 
                            ingredients={Cocktails[1].ingredients} 
                            instructions={Cocktails[1].instructions}
                />
            </Route>
            <Route exact path="/drinks/2">
                <ItemInfo   name={Cocktails[2].name} 
                            ingredients={Cocktails[2].ingredients} 
                            instructions={Cocktails[2].instructions}
                />
            </Route>
            <Route exact path="/drinks/3">
                <ItemInfo   name={Cocktails[3].name} 
                            ingredients={Cocktails[3].ingredients} 
                            instructions={Cocktails[3].instructions}
                />
            </Route>
            <Route exact path="/drinks/4">
                <ItemInfo   name={Cocktails[4].name} 
                            ingredients={Cocktails[4].ingredients} 
                            instructions={Cocktails[4].instructions}
                />
            </Route>
            <Route exact path="/drinks/5">
                <ItemInfo   name={Cocktails[5].name} 
                            ingredients={Cocktails[5].ingredients} 
                            instructions={Cocktails[5].instructions}
                />
            </Route>
            <Route exact path="/drinks/6">
                <ItemInfo   name={Cocktails[6].name} 
                            ingredients={Cocktails[6].ingredients} 
                            instructions={Cocktails[6].instructions}
                />
            </Route>
            <Route exact path="/drinks/7">
                <ItemInfo   name={Cocktails[7].name} 
                            ingredients={Cocktails[7].ingredients} 
                            instructions={Cocktails[7].instructions}
                />
            </Route>
            <Route exact path="/drinks/8">
                <ItemInfo   name={Cocktails[8].name} 
                            ingredients={Cocktails[8].ingredients} 
                            instructions={Cocktails[8].instructions}
                />
            </Route>
        </React.Fragment>
    )
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