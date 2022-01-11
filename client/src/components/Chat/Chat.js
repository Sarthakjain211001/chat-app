import React, {useState, useEffect} from 'react'
import queryString from 'query-string' ;  //This module will help us to extract data from the url. i.e to extract the queries which will be passed in the join component
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router';

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket=null;

const ENDPOINT = process.env.NODE_ENV ? "https://chat-app-sarthakjain.herokuapp.com/" : "localhost:5000";                     
//"localhost:5000";  

const Chat = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('')
    

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);  //queryString will extract the uqery from the url and then we are destructutring it to obtain name and room
        
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room); 
        socket.emit('join', {name, room} , (error)=>{  //emmiting an event join and passing name and room as data and also passing a callback function which will recieve a parameter from the server
         if(error === "Username is taken"){             //join and {name, room} will be emitted from the frontend to server but the callback fun (i.e here, (error)=>{}) will recieve it's parameter from the server then it will get executed on frontend.
             socket.off();                             //So callback fns are a good way to handle errors in socket io.
             navigate("/");                             //First join and {name,room} will get emitteed to server then server will perform it's action then it will pass parameter in the callback fn then the callback fn will run on the frontend.
             alert(error); 
        }
        }
        )  
        

        // return()=>{          //cleanup fn . This function runs on unmounting of the component. i.e removing the component from the DOM
        //     socket.emit('disconnect');      // Actually,browser closes the connection when u leave the page or direct to another page with the link, and it is because the worker to support the page has been abort.
        //     socket.off();                      //So if we close the tab (leave the page) or click on close button in our chat box(it will redirect us to another link) then the disconnect will get fired automatically
        // }
    //So no need of emitting the disconnect event manually/programatically

    }, [ENDPOINT, location.search])   //The connection was being made twice. So we have to pass array in useEffect to tell when to run useEffect. useEffect will run only when the values of the parameters mentioned in the this array changes. 
                                      //This useEffext() was running twice. Now after writing array of dependencies this useEffect() will run once.

    useEffect(() => {
        
        socket.on('message', (message)=>{
          setMessages(messages => [...messages, message])  // Add the message to the messages array
        })
        socket.on("roomData", ({users})=>{            //If room data comes from server then update the users array state
            setUsers(users);
        })
    }, []);    //*****
     
    
    const sendMessage = (event)=>{
        event.preventDefault();   //To prevent the page from refereshing on keypress, click
        
        if(message){
            socket.emit('sendMessage', message ,()=>setMessage(''));
        }                                         //callback fn
    } 
    
    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} users={users}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            
        </div>
    )
}

export default Chat
