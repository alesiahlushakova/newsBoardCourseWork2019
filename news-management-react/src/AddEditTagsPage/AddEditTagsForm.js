import React, {useEffect, useState} from 'react'
import {localizedStrings} from "../utils/Localization";

function AddEditTagsForm() {
    const [items, setItems] = useState([]);
    let tokenString = 'Bearer ' + localStorage.getItem('token');
    const doFetch = async () => {
        let response = await fetch('http://localhost:8080/tags',
        {
            headers: {
                'Authorization': tokenString
            }
        });
        response = await response.json();
        return response;
    };
    useEffect(() => {
        doFetch().then(response => {
            setItems(response);
        })
    }, []);

    const [nameValue, setNameValue] = useState('');

    const [updatedTagValue, setUpdatedTagValue] = useState('');

    const changeUpdatedNameHandler = (e) => {
        setUpdatedTagValue(e.target.value)
    };

    const changeNameHandler = (e) => {
        setNameValue(e.target.value)
    };

    let tag = {
        tagName: nameValue
    };

    let updatedTag = {
        tagName: updatedTagValue
    };


 
    const createTag = async () => {
        try {
    
            const response = await fetch('http://localhost:8080/tags', {
                method: 'POST',
                body: JSON.stringify(tag),
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
    const deleteTag = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/tags/' + id, {
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

    const updateTag = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/tags/' + id, {
                method: 'PUT',
                body: JSON.stringify(updatedTag),
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
        setUpdatedTagValue(null);
    };

    const submitCreateHandler = (e) => {
        e.preventDefault();
        createTag()
    };

    const submitUpdateHandler = (e, id, name) => {
        e.preventDefault();
        setUpdatedTagValue(!!updatedTagValue ? updatedTagValue : name);
        console.log(updatedTagValue);
        updateTag(id)
    };

    const submitDeleteHandler = (e, id) => {
        e.preventDefault();
        deleteTag(id)
    };


    return (
        <div className='wrapper'>
            <h2>{localizedStrings.AddEditTagsForm}</h2>
            {items.map((item, i) =>
                <form className="form-inline" key={i}>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder={localizedStrings.name} defaultValue={item.tagName}
                               onChange={changeUpdatedNameHandler}/>
                    </div>
                    &nbsp;
                    <button type="submit" className="btn btn-primary mb-2" onClick={(e) => {
                        submitUpdateHandler(e, item.id, item.name)
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
                    <input type="text" className="form-control" placeholder={localizedStrings.name} value={nameValue}
                           onChange={changeNameHandler}/>
                </div>
                &nbsp;
                <button type="submit" className="btn btn-success mb-2" onClick={submitCreateHandler}>{localizedStrings.add}</button>
            </form>
        </div>
    )
}

export default AddEditTagsForm