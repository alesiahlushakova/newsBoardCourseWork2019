import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();


ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
