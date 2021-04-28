import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import SearchComponent from './components/layouts/Search';
import Signin from './components/signins/Signin';
import Signup from './components/signups/Signup';
import Searcher from './components/searcherAccount/Searcher';
import SignupAgent from './components/signups/SignupAgent';
import SignupProprietor from './components/signups/SignupProprietor';
import SigninAgent from './components/signins/SigninAgent';
import SigninProprietor from './components/signins/SigninProprietor';
import Agent from './components/agentAccount/Agent';
import Proprietor from './components/proprietorAccount/Proprietor';
import {AuthProvider} from './components/config/Auth';
import PrivateRoute from './components/config/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import AgentProfile from './components/agentAccount/AgentProfile';

function App() {

  return (
    <AuthProvider>
      <Router>
        <>
          <Switch>
            <PrivateRoute exact path="/searcher" component={Searcher} />
            <PrivateRoute exact path="/agent-account" component={Agent} />
            <PrivateRoute exact path="/agent-account/profile" component={AgentProfile} />
            <PrivateRoute exact path="/proprietor" component={Proprietor} />
          </Switch>
          <Switch>
            <Route exact path="/">
              <Navbar />
              <SearchComponent />
            </Route>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/agent-signup" component={SignupAgent} />
            <Route path="/proprietor-signup" component={SignupProprietor} />
            <Route path="/agent-signin" component={SigninAgent} />
            <Route path="/proprietor-signin" component={SigninProprietor} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
