import React, { useEffect, useState } from 'react'

import UserProfileTempOne from './UserProfileTempOne';
import UserProfileTempTwo from './UserProfileTempTwo';
import { useParams } from 'react-router';


const UserPortfolio = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);
        
    
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const res = await fetch("http://localhost:5001/portfolio/discover")
                    
                    const response = await res.json();
                    const singleUser = response.find(
                        (item) => item?.user_id?._id === id
                    );
                    console.log("DISCOVER RESPONSE:", response);
              
                setUser(singleUser);
                } catch (error) {
                    console.log("Error fetching data :( ")
                }
            }
    
            fetchUsers();
        }, [id]);

        if (!user) return <div>Loading... Wait...</div>
  return (
    <div>
        {user.template_type === "A" && <UserProfileTempOne user={user} />}
        {user.template_type === "B" && <UserProfileTempTwo user={user}  />}
    </div>
  )
}

export default UserPortfolio