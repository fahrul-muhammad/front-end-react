import React, { Component } from "react";
import "./second.scoped.css";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

// image
import sepeda from "../../img/sepeda-keren-min.jpg";

export default class secondRev extends Component {
  render() {
    return (
      <>
        <Header />
        <a href="/vehicle_type" className="back-button">
          <i class="bi bi-arrow-left-circle" />
          <h3>Add New Item</h3>
        </a>
        <div className="main-container">
          <div className="left-container">
            <img src={sepeda} alt="" />
          </div>
          <div className="right-container">
            <h1>vehicle - name</h1>
            <p>vehicle - city</p>
            <div className="quantity">quantity</div>
            <div className="details">details</div>
          </div>
        </div>
        <div className="reservation-container">
          <p>reservaiton</p>
          <div className="button-container">
            <div className="col">
              <label for="exampleFormControlInput1" class="form-label">
                Start Date :
              </label>
              <input type="date" class="form-control left-input" placeholder="23/06/2003" aria-label="Start Date" />
            </div>

            <div className="col">
              <label for="exampleFormControlInput1" class="form-label">
                End Date :
              </label>
              <input type="date" class="form-control left-input" placeholder="23/06/2003" aria-label="Start Date" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
