import React, {useContext} from 'react'
import {UserContext} from "../UserContext";
import {Redirect} from "react-router-dom";


const Logout = props => {
    const context = useContext(UserContext);
    context.data = null;
localStorage.clear();
    return (
      
        <Redirect to='/login'></Redirect>
    )
};

export default Logout