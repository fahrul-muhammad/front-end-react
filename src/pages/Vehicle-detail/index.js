import "./vehicle.scoped.css";
import Nav from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import axios from "axios";
import Loading from "../../animation/Loading";
import { connect } from "react-redux";
import { PaymentData } from "../../redux/actions/payment";

import React, { Component } from "react";
import { bindActionCreators } from "redux";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      vehicle: [],
      price: 0,
    };
  }

  onclickPlus = () => {
    const number = this.state.counter;
    const price = this.state.price;
    if (number < this.state.vehicle.stock) {
      this.setState({ counter: number + 1 });
      this.setState({ price: price + price });
      this.props.setPaymentData(this.state);
    } else {
      return;
    }
  };

  onclickMinus = () => {
    const number = this.state.counter;
    const price = this.state.vehicle.price;
    if (number >= 1 && number > this.state.vehicle.stock) {
      this.setState({ counter: number - 1 });
      this.setState({ price: price - price });
      this.props.setPaymentData(this.state);
    } else {
      return;
    }
  };

  getVehicle = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/detail/${this.props.match.params.id}`;
    console.log(URL);
    axios({
      url: URL,
    })
      .then((res) => {
        const vehicle = res.data.result.result[0];
        this.setState({ vehicle: vehicle });
        this.setState({ price: vehicle.price });
        console.log("THIS IS VEHICLE STATE", vehicle);
      })
      .then((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getVehicle();
  }

  render() {
    const formatRupiah = (money) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
    };
    this.props.setPaymentData(this.state);
    return (
      <main>
        {this.state.vehicle.name === undefined ? (
          <Loading />
        ) : (
          <div className="vehicle">
            <Nav />
            <div className="back-button">
              <a href="/vehicle">
                <i class="bi bi-arrow-left-circle" />
              </a>
              <h3>Back</h3>
            </div>
            <div class="main-container">
              <div class="left">
                <img src={`${process.env.REACT_APP_HOST}/${this.state.vehicle.image}`} alt="" />
              </div>
              <div class="right">
                <h1>
                  <strong>{this.state.vehicle.name}</strong>
                  <br />
                  {this.state.vehicle.location}
                </h1>
                <h3>Available</h3>
                <h4>No Prepayment</h4>
                <ul>
                  <li>Stock : {this.state.vehicle.stock}</li>
                  <li>Type: {this.state.vehicle.category}</li>
                  <li>Description: {this.state.vehicle.description}</li>
                </ul>
                <h2>{formatRupiah(this.state.price)}/day</h2>
              </div>
            </div>
            <div class="s-container">
              <div class="second-container">
                <i class="bi bi-chevron-left" />
                <div class="s-right">
                  <img src={`${process.env.REACT_APP_HOST}/${this.state.vehicle.image}`} alt="" />
                </div>
                <div class="s-left">
                  <img src={`${process.env.REACT_APP_HOST}/${this.state.vehicle.image}`} alt="" />
                </div>
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
              <a href={`/reservation/${this.state.vehicle.id}`} className="kuning">
                <button type="button" class="btn btn-warning kuning">
                  <strong>Reservation</strong>
                </button>
              </a>
              <a href={`/vehicle/edit/${this.state.vehicle.id}`} className="like">
                <button type="button" class="btn btn-secondary">
                  <strong> Edit</strong>
                </button>
              </a>
            </div>
            <Footer />
          </div>
        )}
      </main>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setPaymentData: bindActionCreators(PaymentData, dispacth),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToPropps
)(index);
