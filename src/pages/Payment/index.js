import React, { Component } from "react";
import "./index.scoped.css";
import { connect } from "react-redux";
import axios from "axios";
import { Payment } from "../../utils/payment";
import { Toast } from "react-bootstrap";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import Loading from "../../animation/Loading";
import Default from "../../img/default-car.jpg";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      result: [],
      isLoading: false,
      showToast: false,
      error: false,
      loaded: false,
    };
  }

  getVehicle = () => {
    this.setState({ isLoading: true });
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
        console.log(this.state.result);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.getVehicle();
    this.setState({ users: this.props.users });
    console.log("PAYMENT STATE", this.props.payment);
  }

  finishPayment = async () => {
    try {
      this.setState({ isLoading: true });
      const body = {
        vehicle_id: this.props.match.params.id,
        date: this.props.payment.date,
        prepayment: this.props.payment.totalPrice,
        status_id: 2,
        user_id: this.props.users.id,
        rating: 8,
      };
      const result = await Payment(body, this.props.token);
      console.log("RESULT", result.data);
      this.setState({ isLoading: false });
      this.props.history.push("/history");
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      this.setState({ showToast: true });
      setTimeout(() => {
        this.onClose();
      }, 3500);
    }
  };

  onClose = () => {
    this.setState({ showToast: false });
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };

  onImageError = () => {
    this.setState({ error: true });
  };

  render() {
    const formatRupiah = (money) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
    };
    function RandomCode(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    let imgSrc = !this.state.error ? `${process.env.REACT_APP_HOST}/${this.state.result.image}` : Default;
    return (
      <main>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <Toast className="toast" onClose={() => this.onClose()} show={this.state.showToast}>
              <Toast.Header onClick={() => this.setState({ showToast: false })}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Vehicle Rental</strong>
              </Toast.Header>
              <Toast.Body>Payment Error,let's try again</Toast.Body>
            </Toast>

            <div className="back-button">
              <a href={`/reservation/${this.state.result.id}`}>
                <i class="bi bi-arrow-left-circle" />
              </a>
              <h3>Payment</h3>
            </div>
            <div className="jumbotron">
              <img src={imgSrc} onError={() => this.onImageError()} onLoad={() => this.onImageLoaded()} alt="vehicle" />
              <div className="jumbo-tittle">
                <p>
                  <strong>{this.state.result.name}</strong>
                  <br />
                  {this.state.result.location}
                </p>
                <h4> No Prepayment </h4>
              </div>
              <div className="button-container">
                <button type="button" class="btn btn-light">
                  Pay before : 59:30
                </button>
              </div>
            </div>
            <div className="payment">
              <div className="left">
                <h2>Payment Code :</h2>
                <div className="code">
                  <p>{RandomCode(10)}</p>
                  <button type="button" class="btn btn-secondary">
                    Copy
                  </button>
                </div>
              </div>
              <div className="right">
                <h2>Booking Code :</h2>
                <div className="code">
                  <p>{RandomCode(10)}</p>
                  <button type="button" class="btn btn-secondary">
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="detail-order">
              <p>DETAIL ORDER</p>
              <div className="f-left">
                <p>Quantity : {this.props.payment.quantity}</p>
              </div>
              <div className="f-right">
                <p>
                  {" "}
                  <strong>Reservation Date : </strong> {this.props.payment.date}
                </p>
              </div>
              <div className="s-left">
                <p>Price Details : </p>
                <ul>
                  <li>
                    {this.props.payment.counter} {this.state.result.category} : {formatRupiah(this.props.payment.totalPrice)}
                  </li>
                </ul>
              </div>
              <div className="s-right">
                <p>Identity : </p>
                <ul>
                  <li>
                    Identity : {this.state.users.name} (+{this.state.users.phone_number}){" "}
                  </li>
                  <li>Email : {this.state.users.email}</li>
                </ul>
              </div>
            </div>
            <div className="payment-method">
              <p>PAYMENT METHODS</p>
              <div className="second">
                <div className="btn-left">
                  <button type="button" class="btn btn-warning transfer">
                    TRANSFER
                  </button>
                </div>
                <div className="btn-right">
                  <button type="button" class="btn btn-light cash">
                    CASH
                  </button>
                </div>
              </div>
              <div className="third">
                <button onClick={() => this.finishPayment()} type="button" class="btn btn-secondary finish">
                  Finish Payment
                </button>
              </div>
            </div>
            <Footer />
          </>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
    payment: state.payment.data,
  };
};

export default connect(mapStateToProps)(index);
