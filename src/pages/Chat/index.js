import React from "react";
import "./index.scoped.css";
// COMPONENT
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import Chat from "../../components/Chat";

// avatar
import avatar from "../../img/profilepic-min.png";

function index() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="search-container">
          <div className="search-bar">
            <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-12">
                <div class="form">
                  {" "}
                  <i class="fa fa-search" /> <input type="text" class="form-control form-input" placeholder="Search Chat" />{" "}
                  <span class="left-pan">
                    <i class="fa fa-microphone" />
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-sort">
            <select class="form-select" aria-label="Default select example">
              <option selected>sort by</option>
              <option value="1">Read Date</option>
              <option value="2">Date Added</option>
              <option value="3">Name</option>
            </select>{" "}
          </div>
        </div>
      </div>
      <Chat avatar={avatar} username="Fazztrack" msg="hello,welcome to fullstack web development batch 4" status="Yesterday" />
      <Chat avatar={avatar} username="Fazztrack" msg="apakah ada kehidupan selain manusia?" status="Today" />
      <Chat avatar={avatar} username="Fazztrack" unread="ciee lagi overthinking" status="Just now" count={true} />
      <Chat avatar={avatar} username="Fazztrack" msg="Bismillah presentasi dapat 100" status="Yesterday" />
      <Footer />
    </div>
  );
}

export default index;
