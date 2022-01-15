import "./Profile.scoped.css";
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";

// redux
import { connect } from "react-redux";

import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      update: {
        email: "",
        address: "",
        phone_number: "",
        name: "",
        DoB: "",
      },
    };
  }

  formChange = (e) => {
    const data = { ...this.state.update };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  componentDidMount() {
    this.setState({ users: this.props.users });
    console.log(this.props.token);
  }

  onClickSave = (e) => {
    const URL = process.env.REACT_APP_HOST + "/users";

    const token = this.props.token;
    console.log(this.state.data);
    axios({
      url: URL,
      method: "PATCH",
      data: this.state.update,
      headers: { token },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // const body = {
    //   email: e.target.email.value,
    //   address: e.target.address.value,
    //   phone_number: e.target.phone_number.value,
    //   name: e.target.name.value,
    //   DoB: e.target.DoB.valule,
    // };
  };

  // changeData = (e) => {
  //   this.onClickSave(e);
  // };

  render() {
    return (
      <main>
        <Navbar />
        <section class="container-profile profile">
          <h3>Profile</h3>
          <div class="card">
            <div class="profile-pic">
              <img src={process.env.REACT_APP_HOST + this.state.users.profilepic} alt="profilepic" />
              <div class="edit" />
            </div>
            <h1>{this.state.users.name}</h1>
            <div class="detail">
              <h4>{this.state.users.email}</h4>
              <h4>{this.state.users.phone_number}</h4>
              <h4>Has been active since 2013</h4>
            </div>
          </div>
          <div class="gender">
            <div class="form-check form-check-inline male">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label class="form-check-label" for="inlineRadio1">
                Male
              </label>
            </div>
            <div class="form-check form-check-inline female">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label class="form-check-label" for="inlineRadio2">
                Female
              </label>
            </div>
          </div>
        </section>
        <main class="contact">
          <h1>Contact</h1>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email Adress:
            </label>
            <input type="email" class="form-control" name="email" id="exampleFormControlInput1" placeholder={this.props.users.email} onChange={this.onClickSave} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Adress:
            </label>
            <input type="email" class="form-control" name="address" id="exampleFormControlInput1" placeholder={this.props.users.address} onChange={this.onClickSave} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile Number:
            </label>
            <input type="email" class="form-control" name="phone_number" id="exampleFormControlInput1" onChange={this.onClickSave} placeholder={this.props.users.phone_number} />
          </div>
          <div class="row">
            <h2>Identity</h2>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Display name:
              </label>
              <input type="text" class="form-control" name="name" placeholder={this.props.users.name} onChange={this.onClickSave} aria-label="Display name" />
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                DD/MM/YYYY:
              </label>
              <input type="date" class="form-control" name="DoB" placeholder={this.props.users.DoB} onChange={this.onClickSave} aria-label="DD/MM/YYYY" />
            </div>
          </div>

          <div class="wraping">
            <div class="row justify-content-between">
              <button type="button" class="btn btn-warning change" onClick={this.onClickSave}>
                Save Change
              </button>
              <button type="button" class="btn btn-secondary edit-btn">
                <a href="/change_password">Edit Password</a>
              </button>
              <button type="button" class="btn btn-light cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(index);
