import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from 'paths';
import Home from './components/Home';
import Result from './components/Result';
import Mypage from './components/Mypage';
import MypageShow from './components/Mypage/MypageShow';
import Problem from './components/Problem/index';
import ProblemShow from './components/Problem/ProblemShow';
import ProblemCreate from './components/Problem/ProblemCreate';
import ProblemEdit from './components/Problem/ProblemEdit';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={paths.login} component={Login} />
          <Route path={paths.signup} component={Signup} />
          <Route path={paths.home} component={Home} exact />
          <Route path={paths.problem} component={Problem} exact />
          <Route path={paths.create} component={ProblemCreate} exact />
          <Route path={`${paths.edit}/:problemId`} component={ProblemEdit} exact />
          <Route path={`${paths.problem}/:problemId`} component={ProblemShow} exact />
          <Route path={paths.result} component={Result} exact />
          <Route path={paths.mypage} component={Mypage} exact />
          <Route path={`${paths.mypage}/:displayName`} component={MypageShow} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
