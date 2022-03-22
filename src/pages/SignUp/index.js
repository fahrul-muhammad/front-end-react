import "./signUp.scoped.css";
import googleLogo from "../../img/google-logo-min.png";
import axios from "axios";
import React, { Component } from "react";
import Loading from "../../animation/Loading/index";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      checkName: false,
      checkEmail: false,
      checkPassword: false,
      isLoading: false,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  signup = () => {
    this.setState({ checkEmail: false, checkName: false, checkPassword: false });
    if (this.state.name === "") {
      this.setState({ checkName: true });
      return;
    }
    if (this.state.email === "") {
      this.setState({ checkEmail: true });
      return;
    }
    if (this.state.password === "") {
      this.setState({ checkPassword: true });
      return;
    }
    if (this.state.password.length < 8) {
      this.setState({ checkPassword: true });
      return;
    }
    this.setState({ isLoading: true });
    const URL = process.env.REACT_APP_HOST + "/auth/signup";

    const body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    axios({
      method: "POST",
      url: URL,
      headers: { "Content-Type": "application/json" },
      data: body,
    })
      .then((res) => {
        this.setState({ isLoading: false });
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
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div>
            <section class="main-container">
              <div class="left-container" />
              <div class="right-container">
                <h1>Sign Up.</h1>
                <div class="form-container">
                  <div class="form-group row">
                    <div class="col-sm-8  offset-2 input">
                      <label for="ex1" />
                      <input class="form-control name " name="name" id="ex1" type="name" placeholder="name" onChange={this.formChange} />
                      <p hidden={!this.state.checkName} className="check-name">
                        Name is Empty
                      </p>
                    </div>
                    <div class="col-sm-8 offset-2 input">
                      <label for="ex1" />
                      <input class="form-control email" name="email" id="ex2" type="email" placeholder="email" onChange={this.formChange} />
                      <p hidden={!this.state.checkEmail} className="check-email">
                        Email is Empty
                      </p>
                    </div>
                    <div class="col-sm-8 offset-2 input">
                      <label for="ex1" />
                      <input class="form-control password" id="ex1" name="password" type="password" placeholder="password " onChange={this.formChange} />
                      <p className="check-pass" hidden={!this.state.checkPassword}>
                        {this.state.password === "" ? "Password is Empty" : this.state.password.length < 8 ? "Passowrd must be at least 8 character" : null}
                      </p>
                      <button
                        type="button"
                        class="btn btn-warning col-sm-12 fw-bold signup"
                        onClick={() => {
                          this.signup();
                        }}
                      >
                        SignUp
                      </button>
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
        )}
      </>
    );
  }
}
