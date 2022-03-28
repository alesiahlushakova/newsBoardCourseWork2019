import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import {List} from "antd";
import 'antd/dist/antd.css';


const NewsList = () => {
    const [items, setItems] = useState([]);
    let connectionString = 'http://localhost:8080/news';
    
  
    const doFetch = async () => {
     
        console.log(localStorage.getItem('connectionString'));
        let response = await fetch(localStorage.getItem('connectionString')===null? connectionString:localStorage.getItem('connectionString'));
        response = await response.json();
        return response;
    };
    useEffect(() => {
        doFetch().then(response => {
            setItems(response);
        })
    }, []);

    const listData = [];
    {
        items.map((news, i) => {
            listData.push(<NewsItem news={news} key={news.id}/>);
        })
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ['3', '5', '10'],
                position: 'bottom'
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item>
                    {item}
                </List.Item>
            )}
        />
    )
};


NewsList.propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.object)
};

export default NewsList

