import React from 'react'
import blankAvatar from "../images/blank_avatar.png";
import { Link, useLocation } from 'react-router';

const Navigation = () => {
  useLocation(); // re-check who is logged in every time the page changes
  const userLog = localStorage.getItem("loggedUser");
  const portfolioLog = localStorage.getItem("loggedPortfolio")
  return (
    <div>
        <nav className="top-nav">
            <ul className="nav">
                <div className="nav-left">
                <li><img id="nav-profile" src={blankAvatar} alt='Profile Picture' /></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/discover">Discover</Link></li>
                <li><Link to={userLog ? `/user/${userLog}` : "/login"}>Portfolio</Link></li>
                </div>
                <div className="nav-right">
                <li><Link to={portfolioLog ? `/templates/${portfolioLog}` : "/login"}>Templates</Link></li>
                <li>Settings</li>
                </div>
            </ul>
        </nav>
    </div>
  )
}

export default Navigation