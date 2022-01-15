import React, { Component } from "react";
import "./index.scoped.css";

// component
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";

// image
import fixie from "../../img/sepeda-keren-min.jpg";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      price: 89,
    };
  }

  onclickPlus = () => {
    const number = this.state.counter;
    const price = this.state.price;
    this.setState({ counter: number + 1 });
    this.setState({ price: price + 89 });
  };

  onclickMinus = () => {
    const number = this.state.counter;
    const price = this.state.price;
    if (number > 1) {
      this.setState({ counter: number - 1 });
      this.setState({ price: price - 89 });
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="back-button">
          <a href="/#">
            <i class="bi bi-arrow-left-circle" />
          </a>
          <h3>Reservation</h3>
        </div>
        <div className="main-container">
          <div className="left">
            <img src={fixie} alt="" />
          </div>
          <div className="right">
            <h2>
              <strong>Fixie - Gray Only</strong>
            </h2>
            <h4>Yogyakarta</h4>
            <p>No prepayment</p>
            <div className="counter">
              <button type="button" class="btn btn-light minus" onClick={this.onclickMinus}>
                -
              </button>
              <h5>{this.state.counter}</h5>
              <button type="button" class="btn btn-warning plus" onClick={this.onclickPlus}>
                +
              </button>
            </div>
            <div className="forms">
              <p>Reservation Date :</p>
              <input class="form-control" type="text" placeholder="Select Date" aria-label="default input example" />
              <input type="date" class="form-control" placeholder="23/06/2003" aria-label="DD/MM/YYYY" />
            </div>
          </div>
        </div>
        <div className="reservation-button">
          <a href="/payment">
            <button type="button" class="btn btn-warning">
              <p>Pay Now : Rp {this.state.price}.000</p>
            </button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }
}
