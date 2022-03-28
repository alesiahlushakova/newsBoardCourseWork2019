import React,{useState} from 'react';
import './App.css';
import UserContext from './UserContext';
import Header from './Header';
import Footer from './Footer';
import Home from './MainPage/Home'
import {Route, Switch} from "react-router-dom";
import FullNewsItem from "./NewsPage/FullNewsItem";
import LoginForm from "./LoginPage/LoginForm";
import RegistrationForm from "./RegistrationPage/RegistrationForm";
import AddNewsForm from "./AddNewsPage/AddNewsForm";
import Logout from "./LoginPage/Logout";
import AddEditAuthorsForm from "./AddEditAuthorsPage/AddEditAuthorsForm";
import AddEditTagsForm from "./AddEditTagsPage/AddEditTagsForm";
import {localizedStrings} from "./utils/Localization";

function App() {

    localizedStrings.setLanguage(localStorage.getItem('language')=== null ? 'en':localStorage.getItem('language'));

    return (
        
        <UserContext>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                  crossOrigin="anonymous"/>
            <Header/>
            <Switch>
                <Route exact path='/' component={LoginForm}/>
                <Route exact path='/home' component={Home}/>
                <Route path='/news/:number' component={FullNewsItem}/>
                <Route path='/login' component={LoginForm}/>
                <Route path='/registration' component={RegistrationForm}/>
                <Route path='/addNews' component={AddNewsForm}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/addAuthor' component={AddEditAuthorsForm}/>
                <Route path='/addTag/' component={AddEditTagsForm}/>
            </Switch>
            <Footer/>
        </UserContext>
    )
}

export default App;
