import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultPicture from "../../img/images.jpeg";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji, { async } from "react-input-emoji";

const ChatBox = ({ chat, currentUser,setSendMeesage, receivedMessage }) => {
  // console.log(chat);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(()=>{
    if(receivedMessage !== null && receivedMessage?.chatId === chat._id){
      setMessages([...messages,receivedMessage]);
    }
  },[receivedMessage])

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/user/${userId}`);
        // console.log(data.data);
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat != null) {
      getUserData();
    }
  }, [chat, currentUser]);

  //fetching Messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/message/${chat._id}`
        );
        // console.log(data.data);
        setMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat,messages]);
  console.log(messages);

  const handleChange = (newMessage) => {
    
    setNewMessage(newMessage);
  };

  const handleSend=async(e)=>{
    e.preventDefault();
    const message = {
      senderId:currentUser,
      text:newMessage,
      chatId:chat._id,
    }

    // send message to database
    try {
      const {data} = await axios.post(`http://localhost:5000/message`,message);
      setNewMessage("");
      setMessages([...message,data]);
    } catch (error) {
      console.log(error);
    }


    //send message to socket server
    const receiverId = chat.members.find((id)=>id!==currentUser);
    setSendMeesage([...message,receiverId]);

  }

  // console.log(newMessage)
  return (
    <div className="ChatBox-container">
      {chat?(
        <>
        <div className="chat-header">
          <div className="follower">
            <div>
              <img
                src={
                  userData?.profilePicture
                    ? userData.profilePicture
                    : defaultPicture
                }
                alt="Profile"
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="name" style={{ fontSize: "0.8rem" }}>
                <span>
                  {userData?.firstname} {userData?.lastname}
                </span>
              </div>
            </div>
          </div>
          <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </div>

        {/* chatBox Messages */}

        <div className="chat-body">
          {messages.map((message) => (
            <>
              <div
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{format(message.createdAt)}</span>
              </div>
            </>
          ))}
        </div>

        {/* chat-sender */}

        <div className="chat-sender">
          <div>+</div>
          <InputEmoji value={newMessage} onChange={handleChange} />
          <div className="send-button button" onClick={handleSend}>send</div>
        </div>
      </>
      ):
      (
        <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
      )
      }
      
    </div>
  );
};

export default ChatBox;
