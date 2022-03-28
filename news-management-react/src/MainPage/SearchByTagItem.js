import React, {useEffect, useState} from 'react'
import {Multiselect} from 'multiselect-react-dropdown';
import {localizedStrings} from "../utils/Localization";

function SearchByTagItem() {
    const [items, setItems] = useState([]);
    const [tagName,setTagName] = useState(null);
    const doFetch = async () => {
        let tokenString = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/tags',{
            headers: {
                'Authorization' : tokenString
              }
        }
        );
        response = await response.json();
        return response;
    };
   

    const selectHandler = (e) => {
         setTagName(e[0].tagName);
         localStorage.setItem('tagName', e[0].tagName);
            localStorage.setItem('connectionString','http://localhost:8080/news?tagName='+ e[0].tagName);
      
    };



    useEffect(() => {
        doFetch().then(response => {
            setItems(response);
        })
    }, []);

    return (
        <div className="input-group">
            <Multiselect
                placeholder={localizedStrings.searchByTag}
                options={items} // Options to display in the dropdown
                selectedValues={items.selectedValues} // Preselected value to persist in dropdown
                onSelect={selectHandler} // Function will trigger on select event
                onRemove={null} // Function will trigger on remove event
                displayValue="tagName" // Property name to display in the dropdown options
                onSelect={selectHandler}
            />
        </div>
    )
}

export default SearchByTagItem