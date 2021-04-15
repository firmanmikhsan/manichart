import React from 'react';
import './../App.css';
import SearchAppBar from './elements/searchAppBar';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import 'fontsource-roboto';

import Home from './pages/home/Home';
import DetailItem from './pages/home/DetailItem';
export const winterSeason = [1,2,3];
export const springSeason = [4,5,6];
export const summerSeason = [6,7,8];
export const fallSeason = [9,10,11];

function App() {
  return (
    <Router>
      <SearchAppBar/>
      <Switch>
        <Route exact path="/">
          {winterSeason.includes(new Date().getMonth() + 1) && 
            <Redirect to="/winter" />
          }
          {springSeason.includes(new Date().getMonth() + 1) && 
            <Redirect to="/spring" />
          }
          {summerSeason.includes(new Date().getMonth() + 1) && 
            <Redirect to="/summer" />
          }
          {fallSeason.includes(new Date().getMonth() + 1) && 
            <Redirect to="/fall" />
          }
        </Route>
        <Route exact path="/detail/:id" children={<DetailItem/>} />
        <Route exact path="/:id" children={<Home/>} />
      </Switch>
    </Router>
  );
}

export default App;
