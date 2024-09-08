import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Home/Dashboard';
import Toast from './components/common/Toast';
import Home from './components/Login/Home';
import Chatbot from 'react-chatbot-kit';
import Config from "./components/Chatbot/Config"
import MessageParser from "./components/Chatbot/MessageParser"
import ActionProvider from "./components/Chatbot/ActionProvider"
import 'react-chatbot-kit/build/main.css'
import { HiChatAlt2,HiOutlineX } from "react-icons/hi"
import { useState } from 'react';
import { Avatar } from 'flowbite-react';
const App = () => {
  const [chatbotBtn,setChatbotBtn] = useState(false)
  return (
    <>
    <Toast />
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<Login/>} />
          <Route path="/register/customer" element={<Login/>} />
          <Route path="/register/employee" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/tickets" element={<Dashboard/>} />
          <Route path="/tickets/:id" element={<Dashboard/>} />
          <Route path="/faqs" element={<Dashboard/>} />
          <Route path="/update-profile" element={<Dashboard/>} />
          <Route path="/level" element={<Dashboard/>} />
      </Routes>
    </Router>
    <div>
      {!chatbotBtn && <button className="fixed bottom-10 right-10  animate-bounce font-light text-black" onClick={()=>{setChatbotBtn(!chatbotBtn)}}>
        Ask AHA!
        <div className="bg-maroon rounded-xl p-2">
          <Avatar img={HiChatAlt2}/>
        </div>
      </button>}
      {chatbotBtn && <div className="fixed bottom-0 right-0 ">
        <button onClick={()=>{setChatbotBtn(!chatbotBtn)}} className=" bg-gray-500 p-0.5 rounded-lg"><HiOutlineX /></button>
        <Chatbot 
            config={Config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
      </div>}
    </div>
    </>
  );
};

export default App;
