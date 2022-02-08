import React, {useState} from 'react';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MainHeader from './Components/MainHeader/MainHeader';


function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false);

  const loginHandler = props => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
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

