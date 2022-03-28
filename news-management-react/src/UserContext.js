import React, {createContext, useState} from 'react'

export const UserContext = createContext();
export default ({children}) => {
    const [userValue, setUserValue] = useState(null);
    const [findByAuthor, setFindByAuthor] = useState('');

    return (
        <UserContext.Provider value={{
            data: userValue,
            setData: setUserValue,
            findByAuthor: findByAuthor,
            setFindByAuthor: setFindByAuthor
        }}>{children}</UserContext.Provider>
    )
}