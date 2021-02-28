import React from 'react';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to={routes.login}
        className={s.mainLink}
        activeClassName={s.mainLinkActive}
      >
        Login
      </NavLink>
      <NavLink
        to={routes.register}
        className={s.mainLink}
        activeClassName={s.mainLinkActive}
      >
        Registration
      </NavLink>
    </div>
  );
}
