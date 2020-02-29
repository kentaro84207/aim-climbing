import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Signin from './components/Signin';
import paths from './paths';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={paths.home} component={Home} exact />
        <Route path={paths.signin} component={Signin} />
      </Switch>
    </div>
  );
};

export default App;
