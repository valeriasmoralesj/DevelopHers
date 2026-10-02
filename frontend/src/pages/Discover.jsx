import React from 'react';
import { useEffect, useState } from "react";


import DiscoverUser from '../components/DiscoverUser';
import SearchBar from '../components/SearchBar';

const Discover = () => {

    const [portfolios, setPortfolios] = useState([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState([]);

    
    

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5001/portfolio/discover")
                
                const response = await res.json();

                console.log("DISCOVER RESPONSE:", response);
            setPortfolios(response);
            setFilteredPortfolios(response)
    
            } catch (error) {
                console.log("Error fetching data :( ")
            }
        }

        fetchUsers();
    }, []);

    

  return (
    <div>
    
       <SearchBar 
       portfolios={portfolios}
       onFilter={setFilteredPortfolios}/>
       
       <div className="discover-users-list">
        {portfolios.length === 0 ? (
            <div>
            <h3>There are no portfolios at the moment. Check that you are connected to the internet</h3>
  

            </div>
            
        ) : (
            
            filteredPortfolios.map((portfolio, index) =>
            <div key={index}>
                <DiscoverUser portfolio={portfolio}/>
            </div>
            )
        )}
        </div>
        

        </div>

    
  )
}

export default Discover