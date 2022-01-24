import "./Profile.scoped.css";
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";
import FormData from "form-data";
import defaultImg from "../../img/dummy-profile.png";

// bootstrap
import { Modal } from "react-bootstrap";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, saveAction } from "../../redux/actions/test";

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
      show: false,
      newPassword: "",
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
    if (this.state.name !== "") {
      forms.append("name", this.state.name);
    }
    if (this.state.email !== "") {
      forms.append("email", this.state.email);
    }
    if (this.state.gender !== "") {
      forms.append("gender", this.state.gender);
    }
    if (this.state.phone_number !== 0) {
      forms.append("phone_number", this.state.phone_number);
    }
    if (this.state.DoB !== 0) {
      forms.append("DoB", this.state.DoB);
    }
    if (this.state.address !== "") {
      forms.append("address", this.state.address);
    }
    if (this.state.profilepic !== "") {
      forms.append("profilepic", this.state.profilepic);
    }
    return forms;
  };

  onClickSave = (e) => {
    const URL = process.env.REACT_APP_HOST + "/users";
    const forms = this._setData();
    const token = this.props.token;
    console.log(this.state);
    axios({
      url: URL,
      method: "PATCH",
      data: forms,
      headers: { token, "content-type": "multipart/form-data" },
    })
      .then((res) => {
        const token = this.props.token;
        this.getUsers(token);
        console.log(res);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
      });
  };

  cancel = () => {
    this.setState({ name: "", email: "", gender: "", phone_number: 0, DoB: 0, address: "", profilepic: "" });
  };

  getUsers = (token) => {
    axios({
      url: process.env.REACT_APP_HOST + "/users/profile",
      method: "GET",
      headers: { token },
    })
      .then((res) => {
        const { result } = res.data.result;
        console.log(result);
        this.props.setUsers(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  ModalTriger = () => {
    this.setState({ show: !this.state.show });
  };

  changePass = () => {
    const URL = `${process.env.REACT_APP_HOST}/users/changePass`;
    const email = this.state.email;
    const newPassword = this.state.newPassword;
    console.log("NEW PASSWORD STATE", newPassword);
    console.log("NEW EMAIL STATE", email);
    axios({
      method: "PATCH",
      url: URL,
      data: { email, newPassword },
    })
      .then((res) => {
        this.setState({ show: !this.state.show });
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
      })
      .catch((err) => {
        this.setState({ show: !this.state.show });
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
      });
  };

  doEditPassword = () => {
    this.changePass();
  };

  render() {
    const profilepic = this.props.users.profilepic;
    return (
      <main>
        <Navbar />
        <section class="container-profile profile">
          <h3>Profile</h3>
          <div class="card">
            <div class="profile-pic">
              <img src={profilepic ? process.env.REACT_APP_HOST + profilepic : defaultImg} alt="profilepic" />
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
              <button type="button" class="btn btn-secondary edit-btn" onClick={this.ModalTriger} data-bs-toggle="password" data-bs-target="#exampleModal">
                Edit Password
              </button>
              <button type="button" class="btn btn-light cancel-btn">
                Cancel
              </button>
            </div>
          </div>
          {/* CHANGE PASS MODAL */}
          <div className="modal-container">
            <Modal show={this.state.show} className="modal">
              <Modal.Body className="modal-body" />
              <p className="tittle">EDIT PASSWORD</p>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input type="email" class="form-control" aria-describedby="emailHelp" name="email" onChange={this.formChange} />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    New Password
                  </label>
                  <input type="password" name="newPassword" class="form-control" onChange={this.formChange} />
                </div>
              </form>
              <Modal.Footer className="footer">
                <button type="button" class="btn btn-secondary left-btn" onClick={this.ModalTriger}>
                  Cancel
                </button>
                <div className="kosong">1</div>
                <button type="button" class="btn btn-warning right-btn" onClick={this.doEditPassword}>
                  Submit
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
        <Footer />
        {/* toast / snackbar */}
        <div id="snackbar">berhasil mengubah data</div>
        <div id="toast">gagal mengubah data</div>
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

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
    setAuth: bindActionCreators(loginAction, dispacth),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPropps
)(index);
