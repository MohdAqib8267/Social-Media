import React from 'react'
import './FollowersCard.css'

import { Followers } from '../../Data/FollowersData'
import User from '../User/User'
const FollowersCard = () => {
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {Followers. map((person, id)=>{
            return(
               <User person={person} id={id}/>
            )
        })}
    </div>
  )
}

export default FollowersCard