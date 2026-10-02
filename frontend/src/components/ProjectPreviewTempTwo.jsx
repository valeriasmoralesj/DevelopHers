import React from 'react'
import placeholder from "../images/placeholder.png"

const ProjectPreviewTempTwo = () => {
  return (
    <div>
        <a href="/user-project">
    <div className="preview-project"> 
            <img src={placeholder} />
            <div className="project-info">
                <h3>Title</h3>
                <p className="project-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="materials">
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
            </div>
            
        </div>
        </a>
        </div>
  )
}

export default ProjectPreviewTempTwo