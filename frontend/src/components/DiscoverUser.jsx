import React from 'react'

import blankAvatar from "../images/blank_avatar.png";
import { Link } from 'react-router';

const DiscoverUser = ({portfolio}) => {
  return (
    <Link to={`/user/${portfolio?.user_id?._id}`}>
        <div className="other-user">
                <div className="title">
                    <img src={blankAvatar} alt="avatar"/>
                    <div>
                        <h3>{portfolio?.user_id?.firstname} {portfolio?.user_id?.lastname}</h3>
                        <h4>
                            {portfolio?.portfolio_name}
                         </h4>
                    </div>
                </div>
            <p>{portfolio?.portfolio_summary}</p>
            </div>
    </Link>

  )
}

export default DiscoverUser
