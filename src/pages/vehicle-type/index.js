import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";
import { connect } from "react-redux";

// component
import NavLogin from "../../components/navLogin";
import Navbar from "../../components/header";
import Popular from "../../components/popularVehc";
import Card from "../../components/Card";
import Footer from "../../components/footerTemp";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      car: [],
      motor: [],
      bike: [],
    };
  }

  getCar = () => {
    const URL = process.env.REACT_APP_HOST + "/vehicle/car?page=1&limit=4";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        console.log(result);
        this.setState({ car: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getMotor = () => {
    const URL = process.env.REACT_APP_HOST + "/vehicle/motorbike?page=1&limit=4";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        this.setState({ motor: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getBike = () => {
    const URL = process.env.REACT_APP_HOST + "/vehicle/bike?page=1&limit=4";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        console.log("THIS IS RESULT", result.result.data);
        this.setState({ bike: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    console.log(this.state.car);
    this.getCar();
    this.getMotor();
    this.getBike();
    if (this.props.token) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
  }

  render() {
    return (
      <main>
        {!this.state.isLogin ? <NavLogin /> : <Navbar />}
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-11">
            <div class="form">
              {" "}
              <i class="fa fa-search" /> <input type="text" class="form-control form-input" placeholder="Search anything..." />{" "}
              <span class="left-pan">
                <i class="fa fa-microphone" />
              </span>{" "}
            </div>
          </div>
        </div>
        <Popular />
        <div class="car">
          <h1>Cars</h1>
          <div class="cards-containers">
            {this.state.car.map((val) => {
              return <Card isShown={true} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <div class="motor">
          <h1>Motorbike</h1>
          <div class="cards-containers">
            {this.state.motor.map((val) => {
              return <Card isShown={true} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <div class="bike">
          <h1>Bike</h1>
          <div class="cards-containers">
            {this.state.bike.map((val) => {
              return <Card isShown={true} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(index);
