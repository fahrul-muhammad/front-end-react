import "./signUp.scoped.css";
import googleLogo from "../../img/google-logo-min.png";
import axios from "axios";
import React, { Component } from "react";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  signup = () => {
    console.log(this.state);
    const URL = "http://localhost:8000/auth/signup";
    axios({
      method: "POST",
      url: URL,
      headers: { "Content-Type": "application/json" },
      data: this.state,
    })
      .then((res) => {
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() {
          // this.props.history.push("/");
          x.className = x.className.replace("show", "");
          this.props.history.push("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        let x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
      });
  };

  // onClick = () => {
  //   console.log("berhasil");
  //   // Get the snackbar DIV
  //   let x = document.getElementById("snackbar");
  //   x.className = "show";
  //   // After 3 seconds, remove the show class from DIV
  //   setTimeout(function() {
  //     x.className = x.className.replace("show", "");
  //   }, 3000);
  // };

  render() {
    return (
      <div>
        <section class="main-container">
          <div class="left-container" />
          <div class="right-container">
            <h1>Sign Up.</h1>
            <div class="form-container">
              <div class="form-group row">
                <div class="col-sm-8 offset-2 input">
                  <label for="ex1" />
                  <input class="form-control name email" name="name" id="ex1" type="name" placeholder="name" onChange={this.formChange} />
                </div>
                <div class="col-sm-8 offset-2 input">
                  <label for="ex1" />
                  <input class="form-control email" name="email" id="ex2" type="email" placeholder="email" onChange={this.formChange} />
                </div>
                <div class="col-sm-8 offset-2 input">
                  <label for="ex1" />
                  <input class="form-control password" id="ex1" name="password" type="password" placeholder="password " onChange={this.formChange} />
                  <button
                    type="button"
                    class="btn btn-warning col-sm-12 fw-bold signup"
                    onClick={() => {
                      this.signup();
                    }}
                  >
                    SignUp
                  </button>
                  <h4>
                    <u> forgot password? </u>
                  </h4>
                  <div class="text-center mid-text">
                    <hr class="first" />
                    <hr class="second" />
                    <h3>to try another way</h3>
                  </div>
                  <a href="/#">
                    <button type="button" class="btn btn-light col-sm-12 fw-bold">
                      <img src={googleLogo} alt="google logo" /> Login With Google
                    </button>
                  </a>
                  <a href="/login" class="login-link">
                    <button type="button" class="btn btn-dark text-warning col-sm-12 fw-bold login">
                      Login
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <footer class="footer-container-signup">
              <div class="logo" />
              <h3>Plan and book your perfect trip with expert advice, travel tips for vehicle information from us</h3>
              <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta tenetur accusamus delectus magnam, sapiente hic?</h4>
              <hr />
              <div class="icon">
                <i class="fa fa-twitter" aria-hidden="true" />
                <i class="fa fa-facebook" aria-hidden="true" />
                <i class="fa fa-instagram" aria-hidden="true" />
                <i class="fa fa-linkedin" aria-hidden="true" />
                <i class="fa fa-youtube-play" aria-hidden="true" />
              </div>
            </footer>
          </div>
        </section>
        <div id="snackbar">SignUp berhasil, Silahkan Login</div>
        <div id="toast">SignUp gagal,silahkan coba Kembali</div>
      </div>
    );
  }
}
