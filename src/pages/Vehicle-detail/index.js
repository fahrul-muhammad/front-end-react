import "./vehicle.scoped.css";
import Nav from "../../components/navLogin";
import Footer from "../../components/footerTemp";

import React, { Component } from "react";

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
    this.setState({ counter: number - 1 });
    this.setState({ price: price - 89 });
  };
  render() {
    return (
      <main>
        <div className="vehicle">
          <Nav />
          <h2>Detail</h2>
          <div class="left-arrow" />
          <div class="main-container">
            <div class="left" />
            <div class="right">
              <h1>
                <strong>Fixie - Gray Only </strong>Yogyakarta
              </h1>
              <h3>Available</h3>
              <h4>No Prepayment</h4>
              <ul>
                <li>Capacity: 1 Person</li>
                <li>Type: Bike</li>
                <li>Reservation before 2 PM</li>
              </ul>
              <h2>Rp. {this.state.price}.000/day</h2>
            </div>
          </div>
          <div class="s-container">
            <div class="second-container">
              <i class="bi bi-chevron-left" />
              <div class="s-right" />
              <div class="s-left" />
              <i class="bi bi-chevron-right" />
            </div>
            <div class="wraper">
              <button type="button" class="btn btn-light minus" onClick={this.onclickMinus}>
                <strong>-</strong>
              </button>
              <h2>{this.state.counter}</h2>
              <button type="button" class="btn btn-warning warning" onClick={this.onclickPlus}>
                <strong>+</strong>
              </button>
            </div>
          </div>
          <div class="wraping-vehicle">
            <button type="button" class="btn btn-secondary chat-admin">
              <strong>Chat Admin</strong>
            </button>
            <button type="button" class="btn btn-warning kuning">
              <strong>Reservation</strong>
            </button>
            <button type="button" class="btn btn-secondary like">
              <i class="bi bi-heart-fill" />
              <strong> Like</strong>
            </button>
          </div>
          <Footer />
        </div>
      </main>
    );
  }
}
