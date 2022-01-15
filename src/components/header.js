import React, { Component } from "react";
import "./header.scoped.css";
import logo from "../img/logo-min.png";

export default class header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid me-2">
          <img src={logo} className="navbar-brand nav-logo" href="/#" alt="logo ya" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/vehicle_type">
                  vehicle type
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  history
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  about
                </a>
              </li>
            </ul>
          </div>
          <a href="/login" className="login-btn">
            <button type="button" className="btn btn-light nav-btn">
              Login
            </button>
          </a>
          <a href="/signup" className="register-btn">
            <button type="button" className="btn btn-warning nav-btn">
              Register
            </button>
          </a>
        </div>
      </nav>
    );
  }
}
