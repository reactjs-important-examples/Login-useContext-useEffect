import React, { useContext } from 'react';
import AuthContext from '../../Store/auth-context';

import Button from '../UI/Button/Button';
import styles from './Navigation.module.css';

const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )} 
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )} 
        {ctx.isLoggedIn && (
          <li>
              <Button className={styles.buttonColor} onClick={ctx.onLoggOut}>Logout</Button>
          </li>
        )} 
      </ul>
    </nav>
  );
};

export default Navigation;