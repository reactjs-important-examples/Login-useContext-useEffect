import React, {useEffect, useState} from "react";

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './Login.module.css';

const Login = props => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(()=>{
        const identifer =  setTimeout(()=>{
            setFormIsValid(enteredPassword.trim().length > 6 && enteredEmail.includes('@'));
        } , 500);

       return()=>{
           clearTimeout(identifer);
       };
    } , [enteredEmail, enteredPassword]);

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
    
    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
    };

    return(
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
            <div
                className={`${styles.control} ${
                emailIsValid === false ? styles.invalid : ''
                }`}
            >
                <label htmlFor="email">E-Mail</label>
                <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                />
            </div>
            <div
                className={`${styles.control} ${
                passwordIsValid === false ? styles.invalid : ''
                }`}
            >
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                />
            </div>
            <div className={styles.actions}>
                <Button type="submit" className={styles.btn} disabled={!formIsValid}>
                Login
                </Button>
            </div>
            </form>
        </Card>
    );
}

export default Login;