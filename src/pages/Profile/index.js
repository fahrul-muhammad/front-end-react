import "./Profile.scoped.css";
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";
import FormData from "form-data";
import defaultImg from "../../img/dummy-profile.png";

// redux
import { connect } from "react-redux";

import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "",
      phone_number: 0,
      DoB: 0,
      address: "",
      profilepic: "",
    };
    this.inputFile = React.createRef();
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(data);
  };

  fileChange = (event) => {
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.profilepic = file;
      this.setState(data);
    }
    event.preventDefault();
  };

  _setData = () => {
    const forms = new FormData();
    forms.append("name", this.state.name);
    forms.append("email", this.state.email);
    forms.append("gender", this.state.gender);
    forms.append("phone_number", this.state.phone_number);
    forms.append("DoB", this.state.DoB);
    forms.append("address", this.state.address);
    forms.append("profilepic", this.state.profilepic);
    return forms;
  };

  onClickSave = (e) => {
    const URL = process.env.REACT_APP_HOST + "/users";
    const forms = this._setData();
    const token = this.props.token;
    // console.log(body);
    axios({
      url: URL,
      method: "PATCH",
      data: forms,
      headers: { token, "content-type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  LogoutModal = () => {
    let myModal = document.getElementById("myModal");
    let myInput = document.getElementById("myInput");

    myModal.addEventListener("shown.bs.modal", function() {
      myInput.focus();
    });
  };

  render() {
    const profilepic = this.props.users.profilepic || defaultImg;
    return (
      <main>
        <Navbar />
        <section class="container-profile profile">
          <h3>Profile</h3>
          <div class="card">
            <div class="profile-pic">
              <img src={process.env.REACT_APP_HOST + profilepic || defaultImg} alt="profilepic" />
              <div class="edit">
                <input type="file" name="profilepic" hidden onChange={this.fileChange} ref={this.inputFile} />
                <button className="edit-profile" onClick={this.handleFile} />
              </div>
            </div>
            <h1>{this.props.users.name}</h1>
            <div class="detail">
              <h4>{this.props.users.email}</h4>
              <h4>{this.props.users.phone_number}</h4>
              <h4>Has been active since 2013</h4>
            </div>
          </div>
          <div class="gender">
            <div class="form-check form-check-inline male">
              <input class="form-check-input" type="radio" name="gender" value="male" onChange={this.formChange} />
              <label class="form-check-label" for="inlineRadio1">
                Male
              </label>
            </div>
            <div class="form-check form-check-inline female">
              <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" onChange={this.formChange} />
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
            <input type="email" class="form-control" name="email" id="exampleFormControlInput1" placeholder={this.props.users.email} onChange={this.formChange} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Adress:
            </label>
            <input type="email" class="form-control" name="address" id="exampleFormControlInput1" placeholder={this.props.users.address} onChange={this.formChange} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile Number:
            </label>
            <input type="email" class="form-control" name="phone_number" id="exampleFormControlInput1" placeholder={this.props.users.phone_number} onChange={this.formChange} />
          </div>
          <div class="row">
            <h2>Identity</h2>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Display name:
              </label>
              <input type="text" class="form-control" name="name" placeholder={this.props.users.name} aria-label="Display name" onChange={this.formChange} />
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                DD/MM/YYYY:
              </label>
              <input type="date" class="form-control" name="DoB" placeholder={this.props.users.DoB} date aria-label="YYYY/MM/DD" onChange={this.formChange} />
            </div>
          </div>

          <div class="wraping">
            <div class="row justify-content-between">
              <button type="button" class="btn btn-warning change" onClick={this.onClickSave}>
                Save Change
              </button>
              <button type="button" class="btn btn-secondary edit-btn" onClick={this.LogoutModal} data-bs-toggle="password" data-bs-target="#exampleModal">
                Edit Password
              </button>
              <button type="button" class="btn btn-light cancel-btn">
                Cancel
              </button>
            </div>
          </div>

          {/* CHANGE PASS MODAL */}
          <div className="modal password fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">Input your Password</div>
                <div className="modal-footer">
                  <h1>cancel</h1>
                </div>
              </div>
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
