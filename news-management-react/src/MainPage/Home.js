import React from 'react';
import SearchByTagItem from "./SearchByTagItem";
import SearchByAuthorItem from "./SearchByAuthorItem";
import NewsList from "./NewsList";
import LeftMenu from "./LeftMenu";

function Home() {
    return (
        <div>
            <SearchByTagItem/>
            <SearchByAuthorItem/>
            <div className='row'>
                <LeftMenu/>
                <div className='col-md-5'>
                    <div className='wrapper'>
                        <NewsList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home