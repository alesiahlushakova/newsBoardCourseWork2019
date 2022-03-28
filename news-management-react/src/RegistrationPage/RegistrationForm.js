import React, {useState} from 'react'
import '../MainPage/RegistrationForm.css';
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext";
import {localizedStrings} from "../utils/Localization";

function RegistrationForm() {
    localStorage.clear();

    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmedPasswordValue, setConfirmedPasswordValue] = useState('');
  
    const doFetch = async () => {

        let users = {
            name: nameValue,
            surname: surnameValue,
            login: loginValue,
            password: passwordValue,
            confirmedPassword: confirmedPasswordValue
        };
    
        let response = await fetch('http://localhost:8080/users/signUp', {
            method: 'POST',
            body: JSON.stringify(users), 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            }
        });
        response = await response.json();
        console.log(response);
      
   
    
    };


    const changeNameHandler = (e) => {
        setNameValue(e.target.value)
    };

    const changeSurnameHandler = (e) => {
        setSurnameValue(e.target.value)
    };

    const changeLoginHandler = (e) => {
        setLoginValue(e.target.value)
    };

    const changePasswordHandler = (e) => {
        setPasswordValue(e.target.value)
    };

    const changeConfirmedPasswordHandler = (e) => {
        setConfirmedPasswordValue(e.target.value)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        doFetch().then(response => {
           
            window.location = "/login";
        });
    };

    return (
        <div className="card bg-light">
            <article className="card-body mx-auto" style={{maxWidth: '400px',height: '590px'}}>
    <h4 className="card-title mt-3 text-center">{localizedStrings.createAccount}}</h4>

                <p className="divider-text">
                    <span className="bg-light">{localizedStrings.fillInForm}</span>
                </p>
                <form>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input name="name" className="form-control" placeholder={localizedStrings.name} onChange={changeNameHandler} type="text"/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input name="surname" className="form-control" placeholder={localizedStrings.surname} onChange={changeSurnameHandler} type="text"/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input name="login" className="form-control" placeholder={localizedStrings.login} onChange={changeLoginHandler} type="text"/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input name="password" className="form-control" placeholder={localizedStrings.password} onChange={changePasswordHandler} type="password"/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input name="confirmedPassword" className="form-control" placeholder={localizedStrings.confirmedPassword} onChange={changeConfirmedPasswordHandler} type="password"/>
                    </div>
                    <div className="form-group">
                        <Link to='/login'>
                            <button type="submit" className="btn btn-primary btn-block" onClick={submitHandler}> {localizedStrings.createAccount}</button>
                        </Link>
                    </div>
    <p className="text-center">{localizedStrings.haveAccount} <a href="/login">{localizedStrings.logIn}</a></p>
                </form>
            </article>
        </div>
    )
}

export default RegistrationForm