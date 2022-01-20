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
      page: 1,
    };
  }

  getCar = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/car?page=${this.state.page}&limit=4`;
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        console.log("THIS IS CAR RESULT", result.result.meta);
        this.setState({ car: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getMotor = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/motorbike?page=${this.state.page}&limit=4`;
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
    const URL = `${process.env.REACT_APP_HOST}/vehicle/bike?page=${this.state.page}&limit=4`;
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        this.setState({ bike: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  nextPage = () => {
    const number = this.state.page;
    this.setState({ page: number + 1 }, () => {
      this.getCar();
      this.getMotor();
      this.getBike();
    });
  };

  prevPage = () => {
    const number = this.state.page;
    if (number >= 1) {
      this.setState({ page: number - 1 }, () => {
        this.getCar();
        this.getMotor();
        this.getBike();
      });
    } else {
      return;
    }
  };

  componentDidMount() {
    console.log(this.state.page);
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
        <div className="paginasi-container">
          <button type="button" class="btn btn-warning" onClick={this.prevPage}>
            Previous
          </button>
          <h1>{this.state.page}</h1>
          <button type="button" class="btn btn-warning" onClick={this.nextPage}>
            Next
          </button>
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
