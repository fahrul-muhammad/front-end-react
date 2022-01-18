import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

// img
import Sepeda from "../../img/sepeda-keren-min.jpg";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };
  }

  onClickPlus = () => {
    const number = this.state.value;
    this.setState({ value: number + 1 });
  };

  getVehicle = () => {
    const URL = process.env.REACT_APP_HOST + "/vehicle/search?name=brio";
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getVehicle();
  }

  onClickMinus = () => {
    const number = this.state.value;
    if (number > 1) {
      this.setState({ value: number - 1 });
    } else {
      return;
    }
  };
  render() {
    return (
      <>
        <Header />
        <a href="/vehicle_type" className="back-button">
          <i class="bi bi-arrow-left-circle" />
          <h3>Edit Item</h3>
        </a>
        <div className="main-container">
          <div className="left-container">
            <div className="img-container">
              <div className="first">
                <img src={Sepeda} alt="" />
              </div>
              <div className="left-img">
                <img src={Sepeda} alt="" />
              </div>
              <div className="right-img">
                <img src={Sepeda} alt="" />
              </div>
            </div>
          </div>
          <div className="right-container">
            <input class="form-control" type="text" placeholder="Name (Max up to 50 word)" aria-label="default input example" />
            <input class="form-control" type="text" placeholder="Location" aria-label="default input example" />
            <input class="form-control" type="text" placeholder="Description (max up to 150 words)" aria-label="default input example" />
            <div className="input-price">
              <p>Price :</p>
              <input class="form-control" type="text" placeholder="Description (max up to 150 words)" aria-label="default input example" />
            </div>
            <div className="status">
              <p>Status :</p>
              <div className="dropdown-sort">
                <select class="form-select" aria-label="Default select example">
                  <option value="">Select Status</option>
                  <option value="1">Available</option>
                  <option value="2">Full Boocked</option>
                </select>{" "}
              </div>
            </div>
            <div className="stock">
              <p>Stock : </p>
              <div className="counter">
                <button type="button" class="btn btn-light" onClick={this.onClickMinus}>
                  -
                </button>
                <p>{this.state.value}</p>
                <button type="button" class="btn btn-warning" onClick={this.onClickPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="left-button">
            <div className="dropdown-sort">
              <select class="form-select" aria-label="Default select example">
                <option selected>Add Item To</option>
                <option value="1">Car</option>
                <option value="2">Motorbike</option>
                <option value="2">Bike</option>
              </select>{" "}
            </div>
            <i class="bi bi-caret-down-fill" />
          </div>
          <div className="btn-mid">
            <button type="button" class="btn btn-warning ">
              Save item
            </button>
          </div>
          <div className="right-button">
            <button type="button" class="btn btn-secondary" onClick={this.getVehicle}>
              Save item
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
