import React from "react";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const App =()=>(    //Instead of using Curly braces {} and using return() in that here we are directly using () because we only have return statements. So, no need to write {} and return() instead use () directly 
    <Router>
        <Routes>
        <Route exact path ="/" element ={<Join/>}/>
        <Route path ="/chat" element ={<Chat/>}/>
        </Routes>
    </Router>
);

export default App;