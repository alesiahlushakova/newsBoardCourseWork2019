import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
};

function NewsItem({news}) {

    return (
        <div style={styles.li} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <Link to={'/news/' + news.id}>
                    <h5 className="mb-1">{news.title}</h5>
                </Link>
                <small>{news.creationDate}</small>
            </div>
            <small>
                {news.hasOwnProperty('author') ? news.author.name : 'unknown'}
                &nbsp;
                {news.hasOwnProperty('author') ? news.author.surname : null}
            </small>
            <p className="mb-1">{news.shortText}</p>
            <small>
                {news.hasOwnProperty('tags') ? news.tags.map((tag, i) => <div key={i}>{tag.tagName}</div>) : null}
            </small>

        </div>
    )
}

NewsItem.propTypes = {
    news: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default NewsItem