import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [allUsers, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const getAllUsers = async () => {
    const res = await axios.get("/users/fetch_users");
    setUsers(res.data);
  };

  useEffect(() => {
    getAllUsers();
  }, [onlineUsers]);

  useEffect(() => {
    const newUsers = allUsers.filter((f) => onlineUsers.find(elem => elem._id === f._id));
    setDisplayedUsers(newUsers);
  }, [allUsers, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      if (res.data === null){
        res = await axios.post(
          "/conversations/",{
            senderId: currentId,
            receiverId: user._id
          })
      }
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {displayedUsers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}