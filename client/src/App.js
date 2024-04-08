import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import io from 'socket.io-client';
import { useState } from "react"
import Webcam from "react-webcam"
const socket = io.connect("http://localhost:3001")




function App() {
  const [room, setRoom] = useState("");
  
  
  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room)
  //   }
  // }

  socket.on("join-room", (roomId) => {
    console.log("Room ID: " + roomId)
    setRoom(roomId)
  })

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Navigate to={ `/${room}` } /> } />
      </Routes>
      </BrowserRouter>
      <Webcam className='video-grid'/>
      
    </div>
  );
}

export default App;
