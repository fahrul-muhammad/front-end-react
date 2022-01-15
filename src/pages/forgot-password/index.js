import React from "react";
import "./index.scoped.css";

// footer
import Footer from "../../components/footerTemp";

function index() {
  return (
    <main>
      <div className="jumbotron">
        <div className="back-button">
          <a href="/">
            <i className="bi bi-arrow-left-circle-fill" />
          </a>
        </div>
        <h1>Don't Worry We Got Your Back</h1>
        <div className="form-container">
          <input class="form-control" type="text" placeholder="Enter your email address" aria-label="default input example" />
          <button type="button" class="btn btn-warning">
            Warning
          </button>
          <p>
            You will receive a link to reset your password. If you haven't received any link, <a href="/#">click Resend Link</a>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default index;
