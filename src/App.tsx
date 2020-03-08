import React from 'react';
import { Route, Switch } from 'react-router';
import paths from 'paths';
import Home from './components/Home';
import Result from './components/Result';
import Mypage from './components/Mypage';
import Problem from './components/Problem';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={paths.home} component={Home} exact />
        <Route path={`${paths.problem}/:problemId`} component={Problem} />
        <Route path={paths.result} component={Result} />
        <Route path={paths.mypage} component={Mypage} />
        <Route path={paths.signin} component={Signin} />
        <Route path={paths.signup} component={Signup} />
      </Switch>
    </div>
  );
};

export default App;
