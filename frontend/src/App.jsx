import React from 'react'
import { Route, Routes} from "react-router";

import Discover from "./pages/Discover"
import UserProfileTempTwo from './pages/UserProfileTempTwo'
import UserProjectTempTwo from './pages/UserProjectTempTwo';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import Help from "./pages/Help";
import UserPortfolio from './pages/UserPortfolio';


import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App = () => {
  return (

    <div>
    <Navigation/>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/user-profile-b" element={<UserProfileTempTwo />} />
        <Route path="/user-project-b" element={<UserProjectTempTwo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templates/:portfolioId" element={<Templates />} />
        <Route path="/help" element={<Help />} />
        <Route path="/user/:id" element={<UserPortfolio />} />
      </Routes>

    <Footer/>
    </div>
  )
}

export default App