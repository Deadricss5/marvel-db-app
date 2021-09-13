import React from 'react';
import {
  BrowserRouter as Router, Route,
  Switch,
} from 'react-router-dom';
import Header from './components/header';
import MainPage from './containers/main-page';
import HeroDetails from './components/hero_details';

export default function App(): JSX.Element {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={MainPage}
          />
          <Route
            path="/heroes/:id"
            component={HeroDetails}
          />
          <Route path="*">
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
