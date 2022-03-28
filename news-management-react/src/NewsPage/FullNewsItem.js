import React, {useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext";
import {localizedStrings} from "../utils/Localization";
const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    }
};

function FullNewsItem(props) {
    const context = useContext(UserContext);

    const [news, setNews] = useState([]);

    const doFetch = async () => {
        let response = await fetch('http://localhost:8080/news/' + parseInt(props.match.params.number, 10));
        response = await response.json();
        return response;
    };
    useEffect(() => {
        doFetch().then(response => {
            setNews(response);
        })
    }, []);

    return (
        <div className='wrapper'>
            <li style={styles.li} className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{news.title}</h5>
                    <Link to={'/'}>
                        <button type="button" className="btn btn-danger">Close</button>
                    </Link>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <small>
                        {news.hasOwnProperty('author') ? news.author.name : 'unknown'}
                        &nbsp;
                        {news.hasOwnProperty('author') ? news.author.surname : null}
                    </small>
                    <small>{news.creationDate}</small>
                </div>
                <p className="mb-1">{news.fullText}</p>
                <div className="d-flex w-100 justify-content-between">
                    <small>
                        {news.hasOwnProperty('tags') ? news.tags.map((tag, i) => <div key={i}
                                                                                      style={{color: 'gray'}}>{tag.tagName}</div>) : null}
                    </small>
                    {!!context.data ?
                        <div>
                            <button type="button" className="btn btn-primary btn-sm">{localizedStrings.edit}</button>
                            &nbsp;
                    <button type="button" className="btn btn-danger btn-sm">{localizedStrings.delete}</button>
                        </div> : null}
                </div>
            </li>
            <li style={styles.li} className="flex-column">
                <div className="d-flex w-100 justify-content-between">
                    <Link to={'/news/' + (news.id - 1)}>
                    <button type="button" className="btn btn-primary btn-sm">{localizedStrings.older}</button>
                    </Link>
                    <Link to={'/news/' + (news.id + 1)}>
                    <button type="button" className="btn btn-primary btn-sm">{localizedStrings.newer}</button>
                    </Link>
                </div>
            </li>
        </div>
    )
}

export default FullNewsItem