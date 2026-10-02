import React from 'react'
import { useState } from 'react';

const SearchBar = ({ portfolios = [], onFilter }) => {

    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = (value) => {
        setSearchTerm(value);

    if (!value.trim()) {
        onFilter(portfolios);
        return;
    }
    
    let regex = new RegExp(searchTerm, "i")
    const filtered = portfolios.filter((portfolio) =>
        regex.test(
            `${portfolio?.user_id?.firstname} ${portfolio?.user_id?.lastname}`
        ));
        onFilter(filtered);
    }
    

  return (
    <div>
        <form className='search-bar'>
        <input
        type='text'
        placeholder='Find A Programmer'
        className='search-input'
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        //value=import eaach item here
        //onChange={(e) => setSearchTerm(e.target.value)}
        />
       </form>
    </div>
  )
}

export default SearchBar