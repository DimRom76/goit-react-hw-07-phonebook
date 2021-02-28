import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';

import AuthNav from './AuthNav';
import Logout from './Logout';
import s from './Navigation.module.css';

function Navigation({ isAuthenticated }) {
  return (
    <AppBar position="sticky">
      <Toolbar className={s.mainNav}>
        <div>
          <NavLink
            to={routes.home}
            exact
            className={s.mainLink}
            activeClassName={s.mainLinkActive}
          >
            Home
          </NavLink>
          <NavLink
            to={routes.contacts}
            className={s.mainLink}
            activeClassName={s.mainLinkActive}
          >
            Contacts
          </NavLink>
        </div>
        {isAuthenticated ? <Logout /> : <AuthNav />}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
