import React from "react";
// css
import "./chat.scoped.css";

// COMPONENT
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

function index(props) {
  return (
    <main>
      <Header />
      <section className="content">
        <div className="head">
          <a href="/chat">
            <i class="bi bi-arrow-left-circle" />
          </a>
          <div className="userProfile" />
          <div className="userName">
            <h3>User 1</h3>
          </div>
        </div>
        <div className="box">
          <div className="vehicle-img" />
          <h1 className="vehicle-name">
            {" "}
            <strong>Fixie - Gray Only</strong>
            <br />
            Yogyakarta
          </h1>
          <h2 className="status">Available</h2>
          <h4 className="price">Rp. 78.000/day</h4>
        </div>
        <div className="right-cht">
          <div className="msg">
            <p className="text">How many bike left?</p>
          </div>
          <p className="msg-time">Read [12.30 PM]</p>
        </div>
        <div className="left-cht">
          <div className="msg">
            <p className="text">We only have 2 bikes left</p>
          </div>
          <p className="msg-time">12.30 PM</p>
        </div>
        <div className="chat-box">
          <input class="form-control" type="text" placeholder="Type a message" aria-label="default input example" />
          {/* <i class="bi bi-camera-fill" /> */}
          <div className="cam" />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default index;
