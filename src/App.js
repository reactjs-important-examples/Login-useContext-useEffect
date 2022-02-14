import React, {useContext, useEffect, useState} from 'react';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MainHeader from './Components/MainHeader/MainHeader';
import AuthContext from './Store/auth-context';

function App() {

  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;

