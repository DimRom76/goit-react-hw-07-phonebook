import { Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';

import './App.css';

import { authOperations } from './redux/auth/';

import Navigation from './Components/Navigation';
import routes from './routes';

import HomeView from './views/HomeView';
import ContactsView from './views/ContactsView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onGetCurretnUser();
  }

  render() {
    return (
      <Container maxWidth="md">
        <Navigation />
        <Switch>
          <Route path={routes.home} component={HomeView} exact />
          <Route path={routes.register} component={RegistrationView} />
          <Route path={routes.login} component={LoginView} />
          <Route path={routes.contacts} component={ContactsView} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  onGetCurretnUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
