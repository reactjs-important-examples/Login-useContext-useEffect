import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLoggOut: () => {},
    onLogin: ({email , password}) => {}
});

export const AuthContextProvider = (props) =>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    useEffect(()=>{
      const userLogedIn = localStorage.getItem('isLoggedInSave');
      if(userLogedIn === '1'){
        setIsLoggedIn(true);
      }
       
    } , []);
    
    const loginHandler = () => {
      localStorage.setItem('isLoggedInSave' , '1');
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedInSave' , '0');
    };

    return(
        <AuthContext.Provider value={{ 
            isLoggedIn: isLoggedIn,
            onLoggOut: logoutHandler,
            onLogin: loginHandler
         }}>
             {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;