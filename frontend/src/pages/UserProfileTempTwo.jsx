import React, { useEffect, useState } from 'react'

import ProjectPreviewTempTwo from '../components/ProjectPreviewTempTwo';

import blankAvatar from "../images/blank_avatar.png";
import { useNavigate, useParams } from 'react-router';

 

const UserProfileTempTwo = () => {
 const { id } = useParams();
  const [user, setUser] = useState(null);

const navigate = useNavigate();
  

  const [templateType, setTemplateType] = useState("");
  const loggedUser = localStorage.getItem("loggedUser");

    const owner = loggedUser === id;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch("http://localhost:5001/portfolio/discover");
        const data = await res.json();

        const foundPortfolio = data.find(
          (p) => p?.user_id?._id === id
        );

        if (foundPortfolio) {
          setUser(foundPortfolio);
          setTemplateType(foundPortfolio.template_type)
        }
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchPortfolios();
  }, [id]);

  return (
    
    <div>
        <div className='user-top'>
        <img src={blankAvatar} alt="profile picture" />
        <div className='user-title'>
            
            <h1><b>{user?.user_id?.firstname} {user?.user_id?.lastname}</b></h1>
            <h2>{user?.portfolio_name}</h2>
            <h3>{user?.portfolio_summary}</h3>
        </div>
         {owner && <button id="edit" onClick={() => navigate(`/templates/${user._id}`)}>Edit</button> }
        </div>
        <div className="about">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img src=",,," />
        </div>

        <h3 className='user-header-temp-2'>Past Experience</h3>
        <div className='past-experience'>
    
            <div className="info-block">
            <h1 className="info-title">Title</h1>
            <h2 className="info-company">Company Name</h2>
            <h3 className="info-date">Date</h3>
            <div className="info-des">
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
            </div>
            </div>
            <div className="info-block">
            <h1 className="info-title">Title</h1>
            <h2 className="info-company">Company Name</h2>
            <h3 className="info-date">Date</h3>
            <div className="info-des">
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
            </div>
            </div>
        </div>

        <h3 className='user-header-temp-2'>Technical Skills</h3>
        <div className='technical-skills'>
             <div className="info-block">
            <h1 className="info-title">Title</h1>
            <ul className="info-list">
                <li>List</li>
                <li>of</li>
                <li>items</li>
            </ul>
            </div>
          <div className="info-block">
            <h1 className="info-title">Title</h1>
            <ul className="info-list">
                <li>List</li>
                <li>of</li>
                <li>items</li>
            </ul>
        </div>
        </div>


        <h3 className='user-header-temp-2'>Projects</h3>
        <div className='project-list'>
            
            <ProjectPreviewTempTwo />
            <ProjectPreviewTempTwo />
            <ProjectPreviewTempTwo />
            <ProjectPreviewTempTwo />
        
        </div>

    
  </div>
  )
};

export default UserProfileTempTwo

