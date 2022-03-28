import React from 'react'
import {NavLink} from "react-router-dom";
import {localizedStrings} from "../utils/Localization";
function LeftMenu() {
    return (
        <div className="col-md-3 dropdown-menu-left">
            <div className='wrapper'>
                <h6 className="dropdown-header">{localizedStrings.dashboard}</h6>
                <NavLink className="dropdown-item" to='/addAuthor'>{localizedStrings.editAuthor}</NavLink>
                <NavLink className="dropdown-item" to='/addNews'>{localizedStrings.editNews}</NavLink>
                <NavLink className="dropdown-item" to='/addTag'>{localizedStrings.editTags}</NavLink>
            </div>
        </div>
    )
}

export default LeftMenu