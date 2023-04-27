import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultPicture from '../../img/images.jpeg';
const Conversation = ({ data, currentUser }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // console.log(data);
    const userId = data.members.find((id) => id !== currentUser);
    // console.log(userId)

    const getUserData = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/user/${userId}`);
        // console.log(data);
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);  
  // console.log(userData);
  return (
    <>
      <div className="follower conversation">
        <div>
           <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture? userData.profilePicture : defaultPicture
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span style={{  }}>
              Online
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
