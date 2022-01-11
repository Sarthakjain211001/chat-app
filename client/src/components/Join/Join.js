import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './Join.css'

const Join = () => {
   const [name, setName] = useState("");
   const [room, setRoom] = useState("");

   const fun =(e)=>{
  alert("both name and room are required");  
    e.preventDefault(); {/*If the user hasn't entered name and room then prevent the default behaviour of the button. He shouldn't be able to click the button without filling the data*/}

 }
    return (
        <div className='joinOuterContainer'>
          <div className='joinInnerContainer'>
              <h1 className='heading'>Join</h1>
              <div><input className='joinInput' type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Name'/></div>
              <div><input className='joinInput mt-20' type="text" onChange={(e)=>{setRoom(e.target.value)}} placeholder='Room'/></div>
              <Link onClick={(e)=> (!name || !room) ? fun(e) : null} to={`/chat?name=${name}&room=${room}`}>  {/*We are using query string instead of redux, props, just to maintain simplicity. We are passing the data as query in the url */}
              <button className='button mt-20' type="submit">Sign In</button>  
              </Link>
          </div>
        </div>
    )
}

export default Join
