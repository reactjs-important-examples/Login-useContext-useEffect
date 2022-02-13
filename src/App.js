import React, {useEffect, useState} from 'react';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MainHeader from './Components/MainHeader/MainHeader';


function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const userLogedIn = localStorage.getItem('isLoggedInSave');
    if(userLogedIn === '1'){
      setIsLoggedIn(true);
    }
     
  } , []);

  const loginHandler = props => {
    localStorage.setItem('isLoggedInSave' , '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedInSave' , '0');
  };

  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />

      {/* { isLoggedIn ? <Home /> : <Login onLogin={loginHandler} /> } */}
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;

