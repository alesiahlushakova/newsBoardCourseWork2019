import React, {useContext, useState} from 'react';
import {localizedStrings} from "./utils/Localization";
import {UserContext} from './UserContext';
import {NavLink} from 'react-router-dom';

function Header() {
     

const [langValue, setLangValue] = useState('en');
 

 const changeLanguageHandler  = (e) =>{
     localStorage.removeItem('language');
    localStorage.setItem("language", e.target.value);
    setLangValue(e.target.value);
    console.log(e.target.value);
    localizedStrings.setLanguage(e.target.value);
};

    const context = useContext(UserContext);
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                  crossOrigin="anonymous"/>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                    crossOrigin="anonymous"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossOrigin="anonymous"/>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossOrigin="anonymous"/>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#b9f0fd'}}>
                <NavLink className="navbar-brand" to="/">{localizedStrings.newsPortal}</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {
                                !!context.data ? <NavLink className="nav-link" to='/'>{localizedStrings.logout}</NavLink> :
                                    <NavLink className="nav-link" to="/login">{localizedStrings.login}</NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/registration">{localizedStrings.signUp}</NavLink>
                        </li>
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-secondary btn-outline-dark">
                                <input type="radio" name="options" id="option1" autoComplete="off" value='ru' onClick={changeLanguageHandler} /> RU
                            </label>
                            <label className="btn btn-secondary btn-outline-dark">
                                <input type="radio" name="options" id="option2" autoComplete="off" value='en' onClick={changeLanguageHandler} /> EN
                            </label>
                           
                        </div>
                        <li>
                            {
                             <span className="nav-link">{localizedStrings.hello} {localStorage.getItem('login')}!</span> 
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}


export default Header