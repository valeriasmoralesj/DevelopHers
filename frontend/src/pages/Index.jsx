import React, { useEffect, useState } from 'react';
import DiscoverUser from '../components/DiscoverUser';

const Index = () => {

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
    <div id="index-pg">
        <header>
            <h1 id="index-title">DevelopHers</h1>
            <p id="index-description">DevelopHers is space for women in tech to share their work, connect with others, and grow together. Create your portfolio, discover new opportunities, and be part of a supportive community.</p>
        </header>



        

        
    <div className="discover-users-list" id="index-discover">
            {portfolios.length === 0 ? (
            <div>
            <h3>There are no portfolios at the moment. Check that you are connected to the internet</h3>
  

            </div>
            
        ) : (
            
            filteredPortfolios.slice(0, 3).map((portfolio, index) =>
            <div key={index}>
                <DiscoverUser portfolio={portfolio}/>
            </div>
            )
        )}

        </div>

        {localStorage.getItem("loggedUser") ? (
        <ul id="index-ul">
            <li className="index-li"><a href="/" className="index-a" onClick={() => { localStorage.removeItem("loggedUser"); localStorage.removeItem("loggedPortfolio"); }}>Log Out</a></li>
        </ul>
        ) : (
        <ul id="index-ul">
            <li className="index-li"><a href="/login" className="index-a">Log In</a></li>
            <li className="index-li"><a href="/signup" className="index-a">Sign Up</a></li>
        </ul>
        )}
        
    </div>
  )
}

export default Index


