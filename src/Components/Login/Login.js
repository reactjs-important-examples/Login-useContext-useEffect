import React, {useContext, useEffect, useReducer, useRef, useState} from "react";

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from "../../Store/auth-context";
import styles from './Login.module.css';
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if(action.type === 'INPUT_BLUR') {
        return { value: state.value , isValid: state.value.includes('@') }
    }
    return(
        {
            value:'',
            isValid: null
        }
        );
};

const passwordReducer = (state, action) => {
    if(action.type === "INPUT_PASSWORD"){
        return({
            value: action.val,
            isValid: action.val.trim().length > 6
        });
    }
    if(action.type === 'INPUT_BLUR'){
        return({
            value:state.value,
            isValid:state.value.trim().length > 6
        });
    }
    return({
        value:'',
        isValid: null
    });
}

const Login = () => {

    const AuthCtx = useContext(AuthContext);

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const[emailState , dispachEmail] = useReducer(emailReducer, {value: '', isValid: null})
    const[passwordState, dispachPassword] = useReducer(passwordReducer, {value:'' , isValid:null});

    const{isValid: isValidEmail} = emailState;
    const{isValid: isValidPassWord} = passwordState;

    const emailInputRef = useRef();
    const passworInputRef = useRef();

    useEffect(()=>{
        const identifer =  setTimeout(()=>{
            setFormIsValid(isValidEmail && isValidPassWord);
        } , 500);

       return()=>{
           clearTimeout(identifer);
       };
    } , [isValidEmail, isValidPassWord]);

    const emailChangeHandler = event => {
        dispachEmail({type:'USER_INPUT', val:event.target.value})
        // setFormIsValid(passwordState.value.trim().length > 6 && event.target.value.includes('@'));
    };

    const passwordChangeHandler = (event) => {
        dispachPassword({type:'INPUT_PASSWORD', val:event.target.value});
        // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
    };
    
    const validateEmailHandler = () => {
        dispachEmail({ type: 'INPUT_BLUR' })
    };

    const validatePasswordHandler = () => {
        dispachPassword({type:"INPUT_BLUR"});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(formIsValid){
            AuthCtx.onLogin(emailState.value, passwordState.value);
        }else if(!emailState.isValid){
            emailInputRef.current.active();
        }else{
            passworInputRef.current.active();
        }
    };

    return(
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input 
                    ref={emailInputRef}
                    value={emailState.value} 
                    isValid={emailState.isValid}
                    onChange={emailChangeHandler} 
                    onBlur={validateEmailHandler}
                    label='Email'
                    inputType='email'
                    id='email'
                    />

                <Input 
                    ref={passworInputRef}
                    value={passwordState.value} 
                    isValid={passwordState.isValid}
                    onChange={passwordChangeHandler} 
                    onBlur={validatePasswordHandler}
                    label='Password'
                    inputType='password'
                    id='password'
                    />
                
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn}>
                    Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default Login;