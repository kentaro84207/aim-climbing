import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from 'paths';
import Home from './components/Home';
import Result from './components/Result';
import Mypage from './components/Mypage';
import Problem from './components/Problem/index';
import ProblemShow from './components/Problem/show';
import ProblemCreate from './components/Problem/create';
import ProblemEdit from './components/Problem/edit';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AuthRedirect from './containers/Auth/AuthRedirect';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={paths.signin} component={Signin} />
          <Route path={paths.signup} component={Signup} />
          <Route path={paths.home} component={Home} exact />
          <AuthRedirect>
            <Switch>
              <Route path={paths.problem} component={Problem} exact />
              <Route path={paths.create} component={ProblemCreate} exact />
              <Route path={`${paths.edit}/:problemId`} component={ProblemEdit} exact />
              <Route path={`${paths.problem}/:problemId`} component={ProblemShow} exact />
              <Route path={paths.result} component={Result} />
              <Route path={paths.mypage} component={Mypage} />
            </Switch>
          </AuthRedirect>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
