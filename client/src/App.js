import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react"
import Webcam from "react-webcam"
import { v4 as uuid } from 'uuid';
const socket = io.connect("http://localhost:3001")




function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")

  
  const newUuid = uuid()
  

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
      socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Navigate to={ `/${newUuid}` } /> } />
      </Routes>
      </BrowserRouter>
      <Webcam className='video-grid'/>
      <input 
        placeholder='Room Number...'
        onChange={(event) => {
          setRoom(event.target.value)
        }}/>
        <button onClick={joinRoom}>Join Room</button>
      <input placeholder='Message...' 
        onChange={(event) => {
          setMessage(event.target.value)
        }}/>
      <button onClick={ sendMessage }>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
