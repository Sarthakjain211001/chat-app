import React from 'react'
import closeIcon from "../../Icons/closeIcon.png"
import onlineIcon from "../../Icons/onlineIcon.png"

import "./InfoBar.css"

const InfoBar = ({room, users}) => {
  room = room.trim().toLowerCase()
    return (
        <div className='infoBar'>
          <div className='top'>
            <div className='leftInnerContainer'>
              <img className='onlineIcon' src={onlineIcon} alt="online"/>
              <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
              <a href="/"><img style={{"width":"15px", "margin-top":"5px"}}src={closeIcon} alt="close"/></a>
            </div>
            </div>
            <div className='bottom'>
              { users && users.map((user)=> <span key={user.id}>{user.name}, </span>)}
            </div>
        </div>
    )
}

export default InfoBar
