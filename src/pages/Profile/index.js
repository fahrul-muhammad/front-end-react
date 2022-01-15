import "./Profile.scoped.css";
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";

import React, { Component } from "react";

export default class index extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.userData();
    console.log(this.state);
  }

  userData = () => {
    const URL = "http://localhost:8000/users/1";
    axios
      .get(URL)
      .then((response) => {
        const { result } = response.data;
        this.setState(result[0]);
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateData = () => {
    const URL = "http://localhost:8000/users";
    axios({
      method: "PATCH",
      url: URL,
    });
  };

  render() {
    return (
      <main>
        <Navbar />
        <section class="container-profile profile">
          <h3>Profile</h3>
          <div class="card">
            <div class="profile-pic">
              <img src={"http://localhost:8000" + this.state.profilepic} alt="profilepic" />
              <div class="edit" />
            </div>
            <h1>{this.state.name}</h1>
            <div class="detail">
              <h4>{this.state.email}</h4>
              <h4>{this.state.phone_number}</h4>
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
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Adress:
            </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Jl. Garuda" />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile Number:
            </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="(+62)11122233344" />
          </div>
          <div class="row">
            <h2>Identity</h2>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Display name:
              </label>
              <input type="text" class="form-control" placeholder="Example Display name" aria-label="Display name" />
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                DD/MM/YYYY:
              </label>
              <input type="date" class="form-control" placeholder="23/06/2003" aria-label="DD/MM/YYYY" />
            </div>
          </div>
          <div class="wraping">
            <div class="row justify-content-between">
              <button type="button" class="btn btn-warning change">
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
