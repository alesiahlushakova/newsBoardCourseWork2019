import React, {useEffect, useState} from 'react';
import {localizedStrings} from "../utils/Localization";
import LocalizedStrings from 'react-localization';

function AddEditAuthorsForm() {
    const [items, setItems] = useState([]);
    let tokenString = 'Bearer ' + localStorage.getItem('token');
    const doFetch = async () => {

        let response = await fetch('http://localhost:8080/authors',{
            headers: { 'Authorization' : tokenString}
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

    const [nameValue, setNameValue] = useState('');

    const [surnameValue, setSurnameValue] = useState('');

    const [updatedNameValue, setUpdatedNameValue] = useState('');

    const [updatedSurnameValue, setUpdatedSurnameValue] = useState('');

    const changeNameHandler = (e) => {
        setNameValue(e.target.value)
    };

    const changeSurnameHandler = (e) => {
        setSurnameValue(e.target.value)
    };

    const changeUpdatedNameHandler = (e) => {
        setUpdatedNameValue(e.target.value)
    };

    const changeUpdatedSurnameHandler = (e) => {
        setUpdatedSurnameValue(e.target.value)
    };

    let author = {
        name: nameValue,
        surname: surnameValue
    };

    let updatedAuthor = {
        name: updatedNameValue,
        surname: updatedSurnameValue
    };
    const createAuthor = async () => {
        try {
            const response = await fetch('http://localhost:8080/authors', {
                method: 'POST',
                body: JSON.stringify(author),
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

    const deleteAuthor = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/authors/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization' : tokenString
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateAuthor = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/authors/' + id, {
                method: 'PUT',
                body: JSON.stringify(updatedAuthor),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization' : tokenString
                }
            });
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
        setUpdatedNameValue(null);
        setUpdatedSurnameValue(null);
    };

    const submitCreateHandler = (e) => {
        e.preventDefault();
        createAuthor()
    };

    const submitUpdateHandler = (e, id, name, surname) => {
        e.preventDefault();
        setUpdatedNameValue(!!updatedNameValue ? updatedNameValue : name);
        setUpdatedSurnameValue(!!updatedSurnameValue ? updatedSurnameValue : surname);
        console.log(updatedNameValue);
        console.log(updatedSurnameValue);
        updateAuthor(id)
    };

    const submitDeleteHandler = (e, id) => {
        e.preventDefault();
        deleteAuthor(id.toString())
    };

    return (
        <div className='wrapper'>
            <h2>{localizedStrings.AddEditAuthorsForm}</h2>
            {items.map((item, i) =>
                <form className="form-inline" key={i}>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder={LocalizedStrings.name} defaultValue={item.name}
                               onChange={changeUpdatedNameHandler}/>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control" placeholder={LocalizedStrings.surname} defaultValue={item.surname}
                               onChange={changeUpdatedSurnameHandler}/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" onClick={(e) => {
                        submitUpdateHandler(e, item.id, item.name, item.surname)
                    }}>{localizedStrings.edit}
                    </button>
                    &nbsp;
                    <button type="submit" className="btn btn-danger mb-2" onClick={(e) => {
                        submitDeleteHandler(e, item.id)
                    }}>{localizedStrings.delete}
                    </button>
                </form>)}
            <form className="form-inline">
                <div className="form-group mb-2">
                    <input type="text" className="form-control" placeholder={LocalizedStrings.name} value={nameValue}
                           onChange={changeNameHandler}/>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder={LocalizedStrings.surname} value={surnameValue}
                           onChange={changeSurnameHandler}/>
                </div>
                <button type="submit" className="btn btn-success mb-2" onClick={submitCreateHandler}>{localizedStrings.add}</button>
            </form>
        </div>
    )
}

export default AddEditAuthorsForm