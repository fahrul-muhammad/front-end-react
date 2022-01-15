import "./Chat.scoped.css";

import React from "react";

function Chat(props) {
  return (
    <div className="main-container">
      <a href="/room">
        <div className="wrapper">
          <div className="avatar">
            <img src={props.avatar} alt="avatar" />
          </div>
          <h3 className="username">{props.username} </h3>
          <p className="message">{props.msg}</p>
          <div className="unread">
            <p className="message">{props.unread}</p>
            {/* <div className="count">{props.count}</div> */}
          </div>
          <h5>{props.status}</h5>
        </div>
      </a>
    </div>
  );
}

export default Chat;
