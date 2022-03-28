import React, {useContext, useState} from 'react'
import SearchByTag from '../MainPage/SearchByTagItem'
import {UserContext} from "../UserContext";
import {NavLink, Redirect} from "react-router-dom";
import {localizedStrings} from "../utils/Localization";

function AddNewsForm() {

    const [titleValue, setTitleValue] = useState('');
    const [shortTextValue, setShortTextValue] = useState('');
    const [fullTextValue, setFullTextValue] = useState('');


    const context = useContext(UserContext);


    let today = new Date().toISOString().slice(0, 10)
    let news = {
        title: titleValue,
        shortText: shortTextValue,
        fullText: fullTextValue,
        creationDate: today ,
        modificationDate: today
    };

    const changeTitleHandler = (e) => {
        setTitleValue(e.target.value)
    };

    const changeShortTextHandler = (e) => {
        setShortTextValue(e.target.value)
    };

    const changeFullTextHandler = (e) => {
        setFullTextValue(e.target.value)
    };


   


    const createNews = async () => {
        console.log(JSON.stringify(news));
        try {
            let tokenString = 'Bearer ' + localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/news', {
                method: 'POST',
                body: JSON.stringify(news),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : tokenString
                }
            });
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitCreateHandler = (e) => {
        e.preventDefault();
        createNews();
    };

    return (
        <form className='wrapper'>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">{localizedStrings.title}</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       placeholder={localizedStrings.title} onChange={changeTitleHandler}/>
            </div>
            <div>
                <label htmlFor="exampleFormControlInput2">{localizedStrings.shortText}</label>
                <input type="text" className="form-control" id="exampleFormControlInput2"
                       placeholder={localizedStrings.shortText} onChange={changeShortTextHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">{localizedStrings.fullText}</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                          onChange={changeFullTextHandler}></textarea>
            </div>
            <SearchByTag/>
            <NavLink to='/home'>
                <div className="form-group">
    <button type="submit" className="btn btn-primary mb-2" onClick={submitCreateHandler}>{localizedStrings.save}</button>
                </div>
            </NavLink>
        </form>
    )
}

export default AddNewsForm