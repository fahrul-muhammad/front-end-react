import React, { Component } from "react";
import "./index.scoped.css";
import { connect } from "react-redux";
import axios from "axios";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      result: [],
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
        console.log(this.state.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getVehicle();
    this.setState({ users: this.props.users });
  }

  render() {
    return (
      <main>
        <Header />
        <div className="back-button">
          <a href={`/reservation/${this.state.result.id}`}>
            <i class="bi bi-arrow-left-circle" />
          </a>
          <h3>Payment</h3>
        </div>
        <div className="jumbotron">
          <img src={`${process.env.REACT_APP_HOST}/${this.state.result.image}`} alt="vehicle" />
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
              <p>#FG1209878YZS</p>
              <button type="button" class="btn btn-secondary">
                Copy
              </button>
            </div>
          </div>
          <div className="right">
            <h2>Booking Code :</h2>
            <div className="code">
              <p>#FG1209878YZS</p>
              <button type="button" class="btn btn-secondary">
                Copy
              </button>
            </div>
          </div>
        </div>
        <div className="detail-order">
          <p>DETAIL ORDER</p>
          <div className="f-left">
            <p>Quantity : {this.state.result.stock}</p>
          </div>
          <div className="f-right">
            <p>
              {" "}
              <strong>Reservation Date : </strong> Jan 18 - 20 2021
            </p>
          </div>
          <div className="s-left">
            <p>Price Details : </p>
            <ul>
              <li>
                1 {this.state.result.category} : Rp. {this.state.result.price}{" "}
              </li>
              <li>
                1 {this.state.result.category} : Rp. {this.state.result.price}
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
            <button type="button" class="btn btn-secondary finish">
              Finish Payment
            </button>
          </div>
        </div>
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
