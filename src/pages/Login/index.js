import React, { Component } from "react";
import "./login.scoped.css";
import googleIcon from "../../img/google-logo-min.png";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, saveAction } from "../../redux/actions/test";
import axios from "axios";
// import { login } from "../../utils/http/auth";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  getUsers = (token) => {
    axios({
      url: "http://localhost:8000/users/profile",
      method: "GET",
      headers: { token },
    })
      .then((res) => {
        const { result } = res.data.result;
        this.props.setUsers(result[0]);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmitHandler = () => {
    axios({
      url: "http://localhost:8000/auth",
      method: "POST",
      data: this.state,
    })
      .then((res) => {
        const { token } = res.data.result;
        this.props.setAuth(token);
        this.getUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (this.props.auth.isFulfilled) {
  // <Redirect to="/" />;
  //   console.log(this.props.auth.isFulfilled);
  // } else {
  //   console.log("Gagal");
  //   let x = document.getElementById("snackbar");
  //   x.className = "show";
  //   setTimeout(function() {
  //     x.className = x.className.replace("show", "");
  //   }, 3000);
  // }

  // componentDidUpdate(prevProps) {
  //   console.log(this.props.auth.isFulfilled, prevProps.auth.isFulfilled);
  // }

  render() {
    return (
      <section className="main-container">
        <div className="left-container" />
        <div className="right-container">
          <h1>Login.</h1>
          <div className="form-container">
            <div className="form-group row">
              <div className="col-sm-8 offset-2 input">
                <div className="col-sm-12  input">
                  <input className="form-control email" name="email" id="ex1" type="email" placeholder="email" onChange={this.formChange} />
                  <input className="form-control password" name="password" id="ex1" type="password" placeholder="password" onChange={this.formChange} />
                </div>
                <button type="button" className="btn btn-warning col-sm-12 fw-bold login" onClick={this.onSubmitHandler}>
                  Login
                </button>
                <h4>
                  <a href="/forgot_password">
                    <u> forgot password? </u>
                  </a>
                </h4>
                <div className="text-center mid-text">
                  <hr className="first" />
                  <hr className="second" />
                  <h3>to try another way</h3>
                </div>
                <a href="../Home/homeAfter.js">
                  <button type="button" className="btn btn-light col-sm-12 fw-bold">
                    <img src={googleIcon} alt="google icon" /> Login With Google
                  </button>
                </a>
                <a href="/sign-up.html">
                  <button type="button" className="btn btn-dark text-warning col-sm-12 fw-bold signup">
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>
          <footer className="login-footer-container">
            <div className="logo-footer" />
            <h3>Plan and book your perfect trip with expert advice, travel tips for vehicle information from us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur facere amet distinctio in dignissimos libero!</p>
            <hr />
            <div className="icon">
              <i className="fa fa-twitter" aria-hidden="true" />
              <i className="fa fa-facebook" aria-hidden="true" />
              <i className="fa fa-instagram" aria-hidden="true" />
              <i className="fa fa-linkedin" aria-hidden="true" />
              <i className="fa fa-youtube-play" aria-hidden="true" />
            </div>
          </footer>
        </div>
        <div id="snackbar">Password atau email salah</div>
      </section>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
    setAuth: bindActionCreators(loginAction, dispacth),
  };
};

export default connect(
  null,
  mapDispatchToPropps
)(index);
