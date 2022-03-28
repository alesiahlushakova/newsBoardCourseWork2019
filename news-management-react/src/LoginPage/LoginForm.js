import React, {useContext, useState} from 'react'
import {NavLink, Redirect, Route} from "react-router-dom";
import '../MainPage/RegistrationForm.css';
import {localizedStrings} from "../utils/Localization";
import {UserContext} from "../UserContext";

function LoginForm() {

    const context = useContext(UserContext);
    const [user, setUser] = useState([]);

    
    const doFetch = async () => {

        let users = {
            login: loginValue,
            password: passwordValue
        };
    
        let response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(users), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response.accessToken);
        localStorage.clear('token');
        localStorage.clear('login');
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('login', loginValue);
    
    };

    const [loginValue, setLoginValue] = useState('');

    const [passwordValue, setPasswordValue] = useState('');

    const changeLoginHandler = (e) => {
        setLoginValue(e.target.value)
    };

    const changePasswordHandler = (e) => {
        setPasswordValue(e.target.value)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        doFetch().then(response => {
            context.setData(response);
            window.location = "/home";
        });
    };


    return (
        <div className="card bg-light">
            <article className="card-body mx-auto" style={{maxWidth: '400px', height: '590px'}}>
                <h4 className="card-title mt-3 text-center">{localizedStrings.signIn}</h4>

                <p className="divider-text">
                    <span className="bg-light">{localizedStrings.fillInForm}</span>
                </p>
                <form>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input className="form-control" placeholder={localizedStrings.login} type="text" value={loginValue}
                               onChange={changeLoginHandler}/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input className="form-control" placeholder={localizedStrings.password} type="password" value={passwordValue}
                               onChange={changePasswordHandler}/>
                    </div>
                    <div className="form-group">
                      
                            <button type="submit" className="btn btn-primary btn-block" onClick={submitHandler}>{localizedStrings.logIn}
                            </button>
                     
                    </div>
                </form>
            </article>
        </div>
    )
}

export default LoginForm