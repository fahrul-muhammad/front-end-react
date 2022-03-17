import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";

// component
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import { connect } from "react-redux";
import Loading from "../../animation/Loading";
import { bindActionCreators } from "redux";
import { PaymentData } from "../../redux/actions/payment";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.payment.counter,
      result: [],
      price: this.props.payment.price,
    };
  }

  getVehicle = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/detail/${this.props.match.params.id}`;
    const token = this.props.token;
    console.log(token);
    axios({
      method: "GET",
      url: URL,
      headers: { token },
    })
      .then((res) => {
        console.log(res.data.result.result);
        const data = res.data.result.result[0];
        this.setState({ result: data });
        console.log("RESULT", this.state.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onclickPlus = () => {
    const number = this.state.counter;
    const price = this.state.result.price;
    this.setState({ counter: number + 1 });
    this.setState({ price: price + price });
    console.log("PRICE", this.state.price);
  };

  onclickMinus = () => {
    const number = this.state.counter;
    const price = this.state.result.price;
    if (number > 1) {
      this.setState({ counter: number - 1 });
      this.setState({ price: price - price });
      console.log("PRICE", this.state.price);
    } else {
      return;
    }
  };

  componentDidMount() {
    this.getVehicle();
    console.log("REDUX", this.props.payment.price);
  }

  render() {
    const formatRupiah = (money) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
    };
    return (
      <div>
        {this.state.result.name === undefined ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <div className="back-button">
              <a href={`/vehicle/detail/${this.state.result.id}`}>
                <i class="bi bi-arrow-left-circle" />
              </a>
              <h3>Reservation</h3>
            </div>
            <div className="main-container">
              <div className="left">
                <img src={`${process.env.REACT_APP_HOST}/${this.state.result.image}`} alt="" />
              </div>
              <div className="right">
                <h2>
                  <strong>{this.state.result.name}</strong>
                </h2>
                <h4>{this.state.result.location}</h4>
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
                  <input class="form-control" type="text" placeholder="Example : Des 10 to 18 12 2021" aria-label="default input example" />
                  <input
                    type="date"
                    class="form-control"
                    placeholder="23/06/2003"
                    onChange={(e) => {
                      this.props.setPaymentData({
                        ...this.props.payment,
                        date: e.target.value,
                      });
                    }}
                    aria-label="DD/MM/YYYY"
                  />
                </div>
              </div>
            </div>
            <div className="reservation-button">
              <a href={`/payment/${this.state.result.id}`}>
                <button type="button" class="btn btn-warning">
                  <p>Pay Now : {formatRupiah(this.props.payment.price)}</p>
                </button>
              </a>
            </div>
            <Footer />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("STATE REDUX", state);
  return {
    users: state.auth.userData,
    token: state.auth.token,
    payment: state.payment.data,
  };
};

const mapDispatchToPropps = (dispatch) => {
  return {
    setPaymentData: bindActionCreators(PaymentData, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPropps
)(index);
