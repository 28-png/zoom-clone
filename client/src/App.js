import { useEffect } from "react"
import './App.css';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3002")

// something
function App() {

  const sendMessage = () => {
      socket.emit("send_message", {message: "Hello"})
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("here")
      alert(data.message);
    })
  }, [])

  return (
    <div className="App">
      <input placeholder='Message...' />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
