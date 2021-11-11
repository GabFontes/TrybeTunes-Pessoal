import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import NotFound from './pages/NotFound'


class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/album/:id" component={Album} />
            <Route path="/profile/edit" component={ProfileEdit} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/" exact component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
