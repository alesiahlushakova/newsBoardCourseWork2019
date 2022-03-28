import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../UserContext";
import {localizedStrings} from "../utils/Localization";

function SearchByAuthorItem() {
    const context = useContext(UserContext);
    const [items, setItems] = useState([]);
    let tokenString = 'Bearer ' + localStorage.getItem('token');
    const doFetch = async () => {
        let response = await fetch('http://localhost:8080/authors',{
            headers: {
                'Authorization' : tokenString
              }
        }
        );
        response = await response.json();
        return response;
    };
    useEffect(() => {
        doFetch().then(response => {
            setItems(response);
        })
    }, []);

    const [author, setAuthor] = useState('');

    const changeAuthorHandler = (e) => {
       
        setAuthor(e.target.value);
 if(localStorage.getItem('connectionString')===null) {
    localStorage.setItem('connectionString', 'http://localhost:8080/news?authorName='+ e.target.value);
 } else {
     localStorage.setItem('connectionString', localStorage.getItem('connectionString')+'&authorName='+ e.target.value);
 }
        
        console.log(localStorage.getItem('connectionString'));
        localStorage.setItem('authorName', e.target.value);
      
    };
  function searchHandler() {
    window.location.reload(false);
  }
    return (
        <div className="input-group">
            <select className="custom-select" id="inputGroupSelect04" onChange={changeAuthorHandler} >
    <option>{localizedStrings.setFindByAuthor}</option>
                {items.map((item, i) => <option key={i} value={item.name}>{item.surname}&nbsp;{item.name}</option>)}
            </select>
            <div className="input-group-append">
    <button className="btn btn-outline-secondary" type="button" onClick={searchHandler}>{localizedStrings.search}</button>
    <button className="btn btn-outline-danger" type="button">{localizedStrings.reset}</button>
            </div>
        </div>
    )
}

export default SearchByAuthorItem