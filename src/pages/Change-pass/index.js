import React, { Component } from "react";
import "./index.scoped.css";

import Nav from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  changePass = () => {
    const URL = "http://localhost:8000/users/changePass";
    axios({
      method: "PATCH",
      url: URL,
      data: this.state,
    })
      .then((res) => {
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  onClick = () => {
    this.changePass();
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="wrapper">
          <h1>CHANGE PASSWORD</h1>
          <div className="form-container">
            <p>INPUT YOUR EMAIL & PASSWORD</p>
            <input class="form-control" type="email" name="email" placeholder="Email" aria-label="default input example" onChange={this.formChange} />
            <input class="form-control" name="password" type="password" placeholder="New Password" aria-label="default input example" onChange={this.formChange} />
            <div className="col-md-12 text-center">
              <button type="button" class="btn btn-warning" onClick={this.onClick}>
                Change Password
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
