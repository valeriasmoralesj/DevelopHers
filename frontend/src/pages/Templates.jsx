import React from 'react'

import templateA from "../images/templateA.png"
import templateB from "../images/templateB.png";
import { useNavigate, useParams } from 'react-router';

const Templates = () => {

  const {portfolioId } = useParams();
  const navigate = useNavigate() ;

  async function selectTemplate(type) {
  try {
    console.log("portfolioId:", portfolioId);

    const res = await fetch(
      `http://localhost:5001/portfolio/${portfolioId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          template_type: type
        })
      }
    );

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    navigate(`/user/${data.user_id}`);
  } catch (error) {
    console.log("FULL ERROR:", error);
  }
}

  return (
    <div>
      <div className='template-page'>
        <h1>Welcome to DevelopHers!</h1>
      <p>To get started, choose a template</p>
      <div className='template-picker'>
        <img src={templateA}  alt='Preview of Template A' onClick={() => selectTemplate("A")}/>
        <img src={templateB}  alt='Preview of Template B' onClick={() => selectTemplate("B")}/>
      </div>
    </div>
    </div>
  )
}

export default Templates

