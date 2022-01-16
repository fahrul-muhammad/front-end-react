import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";

// component
import NavLogin from "../../components/navLogin";
import Navbar from "../../components/header";
import Popular from "../../components/popularVehc";
import Card from "../../components/Card";
import Footer from "../../components/footerTemp";

// CAR
import van from "../../img/Log-in-img-van-min.jpg";
import Lambo from "../../img/lamborgini-min.jpg";
import Jeep from "../../img/jeep-in-bromo-min.jpg";
import WhiteJeep from "../../img/white-JEEP-min.jpg";

// MOTORBIKE
import vespa from "../../img/vesmet-min.jpg";
import klx from "../../img/motor-cross-min.jpg";
import honda from "../../img/motor-cool-min.jpg";
import matic from "../../img/motorbike-in-city-min.jpg";

// BIKE
import vixie from "../../img/speda-gunung-min.jpg";
import sportBike from "../../img/sepeda-putih-min.jpg";
import onthel from "../../img/sepeda-bonceng-min.jpg";
import whiteFixie from "../../img/sepeda-keren-min.jpg";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      car: [],
      motor: [],
      bike: [],
    };
  }

  getCar = () => {
    const URL = "http://localhost:8000/vehicle/car";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        /* console.log(result); */
        this.setState({ car: result });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getMotor = () => {
    const URL = "http://localhost:8000/vehicle/motorbike";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        /* console.log(result); */
        this.setState({ motor: result });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getBike = () => {
    const URL = "http://localhost:8000/vehicle/bike";
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        /* console.log(result); */
        this.setState({ bike: result });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
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
    const { car, motor, bike } = this.state;
    // const { Vehicle_Name } = car[0];
    if (car.length || motor.length || bike.length > 0) {
      // console.log(motor[0]);
      // console.log(bike[0]);
      console.log(car[0].photos);
    }
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
        <Card
          content="Car"
          isShown={true}
          firstImg={van}
          firstPlace="Van"
          firstCity="Yogyakarta"
          secondImg={Lambo}
          secondPlace="Lamborgini"
          secondCity="Jakarta"
          thirdImg={Jeep}
          thirdPlace="Jeep"
          thirdCity="Malang"
          fourthImg={WhiteJeep}
          fourthPlace="White Jeep"
          fourthCity="Kalimantan"
        />
        <Card
          content="Motorbike"
          isShown={true}
          firstImg={vespa}
          firstPlace="vespa"
          firstCity="Yogyakarta"
          secondImg={klx}
          secondPlace="Honda KLX"
          secondCity="Kalimantan"
          thirdImg={honda}
          thirdPlace="Honda KLX"
          thirdCity="Kalimantan"
          fourthImg={matic}
          fourthPlace="Matic Bike"
          fourthCity="Yogyakarta"
        />
        <Card
          content="Bike"
          isShown={true}
          firstImg={vixie}
          firstPlace="Fixie"
          firstCity="Yogyakarta"
          secondImg={sportBike}
          secondPlace="Sport Bike"
          secondCity="Kalimantan"
          thirdImg={onthel}
          thirdPlace="Onthel"
          thirdCity="Malang"
          fourthImg={whiteFixie}
          fourthPlace="White Fixie"
          fourthCity="Yogyakarta"
        />
        <Footer />
      </main>
    );
  }
}
