import React from 'react';

import Button from '../UI/Button/Button';
import styles from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
         )} 
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
         )} 
        {props.isLoggedIn && (
          <li>
              <Button className={styles.buttonColor} onClick={props.onLogout}>Logout</Button>
          </li>
         )} 
      </ul>
    </nav>
  );
};

export default Navigation;