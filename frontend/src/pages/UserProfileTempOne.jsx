import React, { useEffect, useState } from 'react';

import blankAvatar from "../images/blank_avatar.png";
import { useParams, useNavigate } from 'react-router';

function openProject(id){
  document.getElementById("overlay").style.display = "block";

  const modal = document.getElementById(id);
  modal.style.display = "block";

  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

function closeProject(){
  document.getElementById("overlay").style.display = "none";

  const modals = document.querySelectorAll(".folder-modal");
  modals.forEach(m => {
    m.style.display = "none";
    m.classList.remove("active");
  });
}

function switchTab(event, tabId){

  const popup = event.currentTarget.closest(".popup");

  const tabs = popup.querySelectorAll(".tab1");
  tabs.forEach(tab => tab.classList.remove("active"));

  const contents = popup.querySelectorAll(".tab-content1");
  contents.forEach(c => c.classList.remove("active"));

  event.currentTarget.classList.add("active");

  popup.querySelector("#" + tabId).classList.add("active");
}

const UserProfileTempOne = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [templateType, setTemplateType] = useState("");

     const [user, setUser] = useState(null);
  
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
    <div className="UserTemp1">


    <div id="banner">
        {owner && <button id="edit" onClick={() => navigate(`/templates/${user._id}`)}>Edit</button> }
          <img src={blankAvatar} id="t1-pfp-img"/>
    </div>
   
    <div id="overlay" onClick={closeProject}></div>

    
    <h3 className="sub-t">Welcome to My Portfolio!</h3>
    <div id="introduction">
        <p>I'm {user?.user_id?.firstname} {user?.user_id?.lastname},</p>
        <p>a developer and designer</p>
    </div>

        <div id="project-folders">
        <h5 className="smaller-sub-t">Projects</h5>
            <ul>
                <li id="project-1" className="folder"><a href="#" onClick={() => openProject('modal1')}>Project 1</a></li>
                <li id="project-2" className="folder"><a href="#" onClick={() => openProject('modal2')}>Project 2</a></li>
                <li id="project-3" className="folder"><a href="#" onClick={() => openProject('modal3')}>Project 3</a></li>
            </ul>
        </div>


    <h3 className="sub-t">About</h3>

    <div className="about-section">
    <p id="about-txt">  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel className aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

    </p>

    <div id="about-img">
    <img src="" width="300" height="300" />
    </div>
    </div>

        <h3 className="sub-t">Past Experience</h3>

        <div className="exp">
            <p className="exp-date">2024-Current</p>
                <div className="exp-right">
                    <p className="exp-name">UI/UX Developer</p>
                    <p className="exp-company">Apple</p>
                    <p className="exp-location">Orlando, FL</p>
                    <p className="exp-description"> Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
                </div>    
        </div>

        <div className="exp">
            <p className="exp-date">2022-2023</p>
                <div className="exp-right">
                    <p className="exp-name">UI/UX Designer</p>
                    <p className="exp-company">Duolingo</p>
                    <p className="exp-location">Miami, FL</p>
                    <p className="exp-description"> Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
                </div>
        </div>

        <div id="bottom-container">
        <div id="skills">
            <h3 className="sub-t">Skills</h3>
                <ul>
                    <li>HTML/CSS</li>
                    <li>Javascript</li>
                    <li>JQuery</li>
                    <li>C#</li>
                </ul>
        </div>

        <div id="programs">
            <h3 className="sub-t">Programs</h3>
                <ul>
                    <li>Figma</li>
                    <li>GitHub</li>
                    <li>Visual Studio</li>
                    <li>Unity</li>
                </ul>
        </div>
    </div>

    <h3  className="sub-t">Contact</h3>
    <div id="contact-card">
         <img src={blankAvatar} width="100px" height="100px" />
        <div id="contact-txt">     
        <p className="c-left-side">Email</p>
        <p className="c-right-side">thisisanemail@gmail.com </p>

        <p className="c-left-side">Linkden</p>
        <p className="c-right-side">@JaneDoe </p>

        <p className="c-left-side">Handshake</p>
        <p className="c-right-side">@JaneDoe </p>
        </div>
    </div>


<div id="modal1" className="folder-modal">
  <div className="popup">


    <div className="tabs1">
      <div className="tab1 active" onClick={(e) => switchTab(e, 'overview1')}>Overview</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'process1')}>Process</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'solution1')}>Solution</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'impact1')}>Impact</div>
    </div>

    <span className="close" onClick={closeProject}>✕</span>


    <div className="tab-content1 active" id="overview1">
      <h2>Overview</h2>
      <p>short summary, tools, role</p>
    </div>

    <div className="tab-content1" id="process1">
      <h2>Process</h2>
      <p>research, sketches, iterations</p>
    </div>

    <div className="tab-content1" id="solution1">
      <h2>Solution</h2>
      <p>final product, features</p>
    </div>

    <div className="tab-content1" id="impact1">
      <h2>Impact</h2>
      <p>results + what you learned</p>
    </div>

  </div>
</div>


<div id="modal2" className="folder-modal">
  <div className="popup">


    <div className="tabs1">
      <div className="tab1 active" onClick={(e) => switchTab(e, 'overview2')}>Overview</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'process2')}>Process</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'solution2')}>Solution</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'impact2')}>Impact</div>
    </div>

    <span className="close" onClick={closeProject}>✕</span>


    <div className="tab-content1 active" id="overview2">
      <h2>Overview</h2>
      <p>short summary, tools, role</p>
    </div>

    <div className="tab-content1" id="process2">
      <h2>Process</h2>
      <p>research, sketches, iterations</p>
    </div>

    <div className="tab-content1" id="solution2">
      <h2>Solution</h2>
      <p>final product, features</p>
    </div>

    <div className="tab-content1" id="impact2">
      <h2>Impact</h2>
      <p>results + what you learned</p>
    </div>

  </div>
</div>


<div id="modal3" className="folder-modal">
  <div className="popup">


    <div className="tabs1">
      <div className="tab1 active" onClick={(e) => switchTab(e, 'overview3')}>Overview</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'process3')}>Process</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'solution3')}>Solution</div>
      <div className="tab1" onClick={(e) => switchTab(e, 'impact3')}>Impact</div>
    </div>

    <span className="close" onClick={closeProject}>✕</span>


    <div className="tab-content1 active" id="overview3">
      <h2>Overview</h2>
      <p>short summary, tools, role</p>
    </div>

    <div className="tab-content1" id="process3">
      <h2>Process</h2>
      <p>research, sketches, iterations</p>
    </div>

    <div className="tab-content1" id="solution3">
      <h2>Solution</h2>
      <p>final product, features</p>
    </div>

    <div className="tab-content1" id="impact3">
      <h2>Impact</h2>
      <p>results + what you learned</p>
    </div>

  </div>
</div>

        
    </div>
    
  )
}

export default UserProfileTempOne;